import { useEffect, useState } from "react";
import { Star, Trophy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export const StreakTracker = () => {
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [previousStreak, setPreviousStreak] = useState(0);

  useEffect(() => {
    const fetchStreak = async () => {
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        if (!sessionData.session) return;

        const { data, error } = await supabase
          .from('user_achievements')
          .select('streak_count')
          .eq('user_id', sessionData.session.user.id)
          .maybeSingle();

        if (error) {
          console.error('Error fetching streak:', error);
          return;
        }

        const currentStreak = data?.streak_count || 0;
        
        // Check if streak milestone reached
        if (currentStreak > previousStreak && currentStreak > 0) {
          if (currentStreak % 5 === 0) { // Milestone every 5 days
            toast({
              title: `${currentStreak}-Day Streak! 🎉`,
              description: "Keep going to earn more rewards!",
            });
          }
        }

        setPreviousStreak(streak);
        setStreak(currentStreak);
        setLoading(false);
      } catch (error) {
        console.error('Error in fetchStreak:', error);
        setLoading(false);
      }
    };

    fetchStreak();

    // Set up realtime subscription
    const setupSubscription = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) return;

      const channel = supabase
        .channel('streak-updates')
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'user_achievements',
            filter: `user_id=eq.${sessionData.session.user.id}`
          },
          (payload) => {
            const newStreak = payload.new.streak_count;
            setStreak(newStreak);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    };

    setupSubscription();
  }, [toast, streak, previousStreak]);

  if (loading) return null;

  return (
    <Card className="bg-white/80 backdrop-blur mb-4">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Star className="h-5 w-5 text-yellow-500" />
          Daily Streak
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <span className="text-3xl font-bold text-yellow-500">{streak}</span>
            <span className="text-gray-600">days</span>
          </div>
          {streak > 0 && (
            <p className="text-sm text-gray-500">
              {streak === 1 ? "First day! Keep it up!" : `You're on fire! 🔥`}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};