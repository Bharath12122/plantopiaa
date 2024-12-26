import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const StreakTracker = () => {
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStreak = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data, error } = await supabase
        .from('user_achievements')
        .select('streak_count')
        .eq('user_id', session.user.id)
        .single();

      if (error) {
        console.error('Error fetching streak:', error);
        return;
      }

      setStreak(data?.streak_count || 0);
      setLoading(false);
    };

    fetchStreak();
  }, []);

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
        <div className="text-center">
          <span className="text-3xl font-bold text-yellow-500">{streak}</span>
          <span className="text-gray-600 ml-2">days</span>
        </div>
      </CardContent>
    </Card>
  );
};