import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useProStatus = () => {
  const [isPro, setIsPro] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkProStatus = async () => {
      try {
        setIsLoading(true);
        setError(null);
        console.log('Starting pro status check...');

        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        console.log('Session check result:', { 
          hasSession: !!session, 
          sessionError: sessionError?.message 
        });

        if (sessionError) {
          console.error('Session error:', sessionError);
          setError('Failed to verify authentication status');
          setIsPro(false);
          return;
        }

        if (!session) {
          console.log('No active session found - user not logged in');
          setIsPro(false);
          return;
        }

        console.log('Session found, checking profile for user ID:', session.user.id);

        // Use maybeSingle() instead of single() to handle cases where profile doesn't exist
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('is_pro')
          .eq('id', session.user.id)
          .maybeSingle();

        console.log('Profile query result:', { 
          profile, 
          error: profileError?.message 
        });

        if (profileError) {
          console.error('Error fetching pro status:', profileError);
          setError('Failed to verify Pro status');
          toast.error('Failed to verify Pro status. Please try again later.');
          return;
        }

        // Handle case where profile doesn't exist
        if (!profile) {
          console.log('No profile found, creating one...');
          const { error: insertError } = await supabase
            .from('profiles')
            .insert([{ id: session.user.id, is_pro: false }]);

          if (insertError) {
            console.error('Error creating profile:', insertError);
            setError('Failed to create user profile');
            toast.error('Failed to create user profile. Please try again later.');
            return;
          }

          setIsPro(false);
        } else {
          console.log('Pro status found:', profile.is_pro);
          setIsPro(profile.is_pro || false);
        }

      } catch (error) {
        console.error('Unexpected error checking pro status:', error);
        setError('An unexpected error occurred');
        toast.error('Failed to verify Pro status. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    // Initial check
    checkProStatus();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, 'Session:', !!session);
      
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        checkProStatus();
      } else if (event === 'SIGNED_OUT') {
        console.log('User signed out, resetting pro status');
        setIsPro(false);
        setIsLoading(false);
      }
    });

    // Cleanup subscription
    return () => {
      console.log('Cleaning up pro status subscription');
      subscription.unsubscribe();
    };
  }, []);

  return { isPro, isLoading, error };
};