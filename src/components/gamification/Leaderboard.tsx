import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LeaderboardEntry {
  id: string;
  total_points: number | null;
  user_id: string;
  profiles: {
    full_name: string | null;
  } | null;
}

export const Leaderboard = () => {
  const [leaders, setLeaders] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      // First get the user achievements
      const { data: achievementsData, error: achievementsError } = await supabase
        .from('user_achievements')
        .select(`
          id,
          total_points,
          user_id
        `)
        .order('total_points', { ascending: false })
        .limit(5);

      if (achievementsError) {
        console.error('Error fetching leaderboard:', achievementsError);
        return;
      }

      // Then fetch the corresponding profiles
      const userIds = achievementsData.map(achievement => achievement.user_id);
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name')
        .in('id', userIds);

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
        return;
      }

      // Combine the data
      const leaderboardData = achievementsData.map(achievement => ({
        ...achievement,
        profiles: profilesData.find(profile => profile.id === achievement.user_id) || null
      }));

      setLeaders(leaderboardData);
      setLoading(false);
    };

    fetchLeaderboard();
  }, []);

  if (loading) return null;

  return (
    <Card className="bg-white/80 backdrop-blur mb-4">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Trophy className="h-5 w-5 text-amber-500" />
          Top Plant Enthusiasts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {leaders.map((leader, index) => (
            <div
              key={leader.id}
              className="flex items-center justify-between p-2 rounded-lg bg-white/50"
            >
              <div className="flex items-center gap-2">
                <span className="font-bold text-amber-500">#{index + 1}</span>
                <span>{leader.profiles?.full_name || 'Anonymous User'}</span>
              </div>
              <span className="font-semibold">{leader.total_points || 0} pts</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};