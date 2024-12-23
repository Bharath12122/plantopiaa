import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { getOrCreateSessionId } from '@/utils/sessionManager';
import { useToast } from '@/hooks/use-toast';

export const useAnonymousInteractions = () => {
  const [interactionCount, setInteractionCount] = useState(0);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const { toast } = useToast();
  const FREE_LIMIT = 10;

  useEffect(() => {
    const fetchInteractions = async () => {
      const sessionId = getOrCreateSessionId();
      
      // Set global headers for this request
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        supabase.auth.setSession({
          access_token: '',
          refresh_token: '',
        });
      }
      
      const { data, error } = await supabase
        .from('anonymous_interactions')
        .select('*')
        .eq('session_id', sessionId);

      if (!error && data) {
        setInteractionCount(data.length);
        if (data.length >= FREE_LIMIT) {
          setShowLoginPrompt(true);
        }
      }
    };

    fetchInteractions();
  }, []);

  const trackInteraction = async (type: string) => {
    const sessionId = getOrCreateSessionId();
    
    if (interactionCount >= FREE_LIMIT) {
      setShowLoginPrompt(true);
      return false;
    }

    // Set global headers for this request
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      supabase.auth.setSession({
        access_token: '',
        refresh_token: '',
      });
    }

    const { error } = await supabase
      .from('anonymous_interactions')
      .insert([{ 
        session_id: sessionId, 
        interaction_type: type 
      }]);

    if (!error) {
      const newCount = interactionCount + 1;
      setInteractionCount(newCount);
      
      if (newCount >= FREE_LIMIT) {
        setShowLoginPrompt(true);
        toast({
          title: "Free limit reached",
          description: "You've reached the limit for free usage. Please sign up or log in to continue exploring more plant insights!",
        });
      }
      return true;
    }
    return false;
  };

  return { interactionCount, showLoginPrompt, trackInteraction, setShowLoginPrompt };
};