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

        // First check if we have a session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Session error:', sessionError);
          setError('Failed to verify authentication status');
          setIsPro(false);
          return;
        }

        if (!session) {
          console.log('No active session');
          setIsPro(false);
          return;
        }

        // Fetch the profile with pro status
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('is_pro')
          .eq('id', session.user.id)
          .single();

        if (profileError) {
          console.error('Error fetching pro status:', profileError);
          setError('Failed to verify Pro status');
          toast.error('Failed to verify Pro status. Please try again later.');
          return;
        }

        if (!profile) {
          console.error('No profile found');
          setError('Profile not found');
          toast.error('User profile not found. Please contact support.');
          return;
        }

        setIsPro(profile.is_pro || false);
        console.log('Pro status:', profile.is_pro);

      } catch (error) {
        console.error('Error checking pro status:', error);
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
      console.log('Auth state changed:', event);
      
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        checkProStatus();
      } else if (event === 'SIGNED_OUT') {
        setIsPro(false);
        setIsLoading(false);
      }
    });

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { isPro, isLoading, error };
};