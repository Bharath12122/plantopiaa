import { useEffect, useState } from "react";
import { Flame } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

interface UserAchievement {
  streak_count: number;
  total_points: number;
  last_scan_date: string | null;
}

export const StreakTracker = () => {
  const [userAchievement, setUserAchievement] = useState<UserAchievement | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserAchievement = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          setLoading(false);
          return;
        }

        const { data: existingAchievement, error: fetchError } = await supabase
          .from('user_achievements')
          .select('streak_count, total_points, last_scan_date')
          .eq('user_id', session.user.id)
          .maybeSingle();

        if (fetchError) {
          console.error('Error fetching user achievement:', fetchError);
          toast({
            title: "Error",
            description: "Failed to load streak data. Please try again.",
            variant: "destructive",
          });
          return;
        }

        if (!existingAchievement) {
          const { data: newAchievement, error: insertError } = await supabase
            .from('user_achievements')
            .insert({
              user_id: session.user.id,
              streak_count: 0,
              total_points: 0,
              last_scan_date: null,
            })
            .select()
            .single();

          if (insertError) {
            console.error('Error creating user achievement:', insertError);
            return;
          }

          setUserAchievement(newAchievement);
        } else {
          setUserAchievement(existingAchievement);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error in fetchUserAchievement:', error);
        setLoading(false);
      }
    };

    fetchUserAchievement();

    const channel = supabase
      .channel('streak-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_achievements'
        },
        (payload) => {
          const updatedAchievement = payload.new as UserAchievement;
          setUserAchievement(updatedAchievement);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  if (loading) {
    return (
      <Card className="bg-white/80 backdrop-blur mb-4">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Flame className="h-5 w-5 text-orange-500" />
            Daily Streak
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-32 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const streakProgress = ((userAchievement?.streak_count || 0) % 7) * (100/7);
  const daysUntilBonus = 7 - ((userAchievement?.streak_count || 0) % 7);

  return (
    <Card className="bg-white/80 backdrop-blur mb-4">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Flame className="h-5 w-5 text-orange-500" />
          Daily Streak
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <span className="text-4xl font-bold text-orange-500">
              {userAchievement?.streak_count || 0}
            </span>
            <span className="text-gray-600">days</span>
          </div>
          <Progress 
            value={streakProgress}
            className="h-2" 
          />
          <p className="text-sm text-gray-600">
            {daysUntilBonus} days until next streak bonus!
          </p>
          <div className="mt-4 bg-orange-50 p-3 rounded-lg">
            <p className="text-sm text-orange-600 font-medium">
              Total Points: {userAchievement?.total_points || 0}
            </p>
          </div>
          {userAchievement?.last_scan_date && (
            <p className="text-xs text-gray-500">
              Last activity: {new Date(userAchievement.last_scan_date).toLocaleDateString()}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};