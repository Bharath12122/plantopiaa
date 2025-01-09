import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useProStatus = () => {
  const [isPro, setIsPro] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkProStatus = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          setIsPro(false);
          return;
        }

        const { data: profile, error } = await supabase
          .from('profiles')
          .select('is_pro')
          .eq('id', session.user.id)
          .single();

        if (error) {
          console.error('Error fetching pro status:', error);
          toast.error('Failed to verify Pro status');
          return;
        }

        setIsPro(profile?.is_pro || false);
      } catch (error) {
        console.error('Error checking pro status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkProStatus();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkProStatus();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { isPro, isLoading };
};