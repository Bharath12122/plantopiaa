import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/integrations/supabase/client";

export const useAnonymousInteractions = () => {
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const [interactionCount, setInteractionCount] = useState<number>(0);

  useEffect(() => {
    const storedSessionId = localStorage.getItem("anonymous_session_id");
    if (storedSessionId) {
      setSessionId(storedSessionId);
    } else {
      const newSessionId = uuidv4();
      localStorage.setItem("anonymous_session_id", newSessionId);
      setSessionId(newSessionId);
    }

    const fetchInteractions = async () => {
      if (!sessionId) return;
      
      const { data, error } = await supabase
        .from("anonymous_interactions")
        .select("session_id, interaction_type")
        .eq("session_id", sessionId);

      if (error) {
        console.error("Error fetching interactions:", error);
      } else {
        setInteractionCount(data?.length || 0);
      }
    };

    fetchInteractions();
  }, [sessionId]);

  const trackInteraction = async (interactionType: string) => {
    if (!sessionId) return;

    try {
      const { error } = await supabase
        .from("anonymous_interactions")
        .insert([
          {
            session_id: sessionId,
            interaction_type: interactionType,
          },
        ]);

      if (error) {
        console.error("Error tracking interaction:", error);
      } else {
        setInteractionCount(prev => prev + 1);
      }
    } catch (error) {
      console.error("Error tracking interaction:", error);
    }
  };

  return {
    showLoginPrompt,
    setShowLoginPrompt,
    trackInteraction,
    interactionCount,
  };
};