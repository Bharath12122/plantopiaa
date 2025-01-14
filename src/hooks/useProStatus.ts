import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useProStatus = () => {
  const [isPro, setIsPro] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkProStatus = async () => {
      try {
        // First check if we have a session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Session error:', sessionError);
          setIsPro(false);
          setIsLoading(false);
          return;
        }

        if (!session) {
          console.log('No active session');
          setIsPro(false);
          setIsLoading(false);
          return;
        }

        // Now fetch the profile
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('is_pro')
          .eq('id', session.user.id)
          .single();

        if (profileError) {
          console.error('Error fetching pro status:', profileError);
          toast.error('Failed to verify Pro status');
          setIsPro(false);
          return;
        }

        setIsPro(profile?.is_pro || false);
      } catch (error) {
        console.error('Error checking pro status:', error);
        toast.error('Failed to verify Pro status');
        setIsPro(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkProStatus();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        checkProStatus();
      } else if (event === 'SIGNED_OUT') {
        setIsPro(false);
        setIsLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { isPro, isLoading };
};