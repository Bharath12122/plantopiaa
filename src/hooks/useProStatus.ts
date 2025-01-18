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

        // First check if we have a session
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

        // Fetch the profile with pro status
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('is_pro')
          .eq('id', session.user.id)
          .single();

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

        if (!profile) {
          console.error('No profile found for user:', session.user.id);
          setError('Profile not found');
          toast.error('User profile not found. Please try signing in again.');
          return;
        }

        console.log('Pro status found:', profile.is_pro);
        setIsPro(profile.is_pro || false);

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