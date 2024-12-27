import { useEffect, useState } from "react";
import { Flame } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface UserAchievement {
  streak_count: number;
  total_points: number;
}

export const StreakTracker = () => {
  const [userAchievement, setUserAchievement] = useState<UserAchievement | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAchievement = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      // First, ensure user has an achievement record
      const { error: insertError } = await supabase
        .from('user_achievements')
        .upsert({
          user_id: session.user.id,
          streak_count: 0,
          total_points: 0,
          total_scans: 0
        }, {
          onConflict: 'user_id'
        });

      if (insertError) {
        console.error('Error ensuring user achievement:', insertError);
        return;
      }

      // Then fetch the user achievement data
      const { data, error } = await supabase
        .from('user_achievements')
        .select('streak_count, total_points')
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching user achievement:', error);
        return;
      }

      setUserAchievement(data || { streak_count: 0, total_points: 0 });
      setLoading(false);
    };

    fetchUserAchievement();
  }, []);

  if (loading) return null;

  return (
    <Card className="bg-white/80 backdrop-blur mb-4 animate-fade-in">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Flame className="h-5 w-5 text-orange-500 animate-bounce" />
          Daily Streak
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <span className="text-4xl font-bold text-orange-500 animate-float">
              {userAchievement?.streak_count || 0}
            </span>
            <span className="text-gray-600">days</span>
          </div>
          <Progress 
            value={((userAchievement?.streak_count || 0) % 7) * (100/7)} 
            className="h-2 animate-glow" 
          />
          <p className="text-sm text-gray-600">
            {7 - ((userAchievement?.streak_count || 0) % 7)} days until next streak bonus!
          </p>
          <div className="mt-4 bg-orange-50 p-3 rounded-lg animate-pulse">
            <p className="text-sm text-orange-600 font-medium">
              Total Points: {userAchievement?.total_points || 0}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};