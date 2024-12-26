import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
  progress: number;
  requirement_count: number;
}

export const ChallengeSystem = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChallenges = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data, error } = await supabase
        .from('challenges')
        .select(`
          id,
          title,
          description,
          points,
          requirement_count,
          user_challenge_progress!inner (
            progress
          )
        `)
        .eq('user_challenge_progress.user_id', session.user.id)
        .limit(3);

      if (error) {
        console.error('Error fetching challenges:', error);
        return;
      }

      setChallenges(data?.map(challenge => ({
        ...challenge,
        progress: challenge.user_challenge_progress?.[0]?.progress || 0
      })) || []);
      setLoading(false);
    };

    fetchChallenges();
  }, []);

  if (loading) return null;

  return (
    <Card className="bg-white/80 backdrop-blur mb-4">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Star className="h-5 w-5 text-green-500" />
          Daily Challenges
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {challenges.map((challenge) => (
            <div key={challenge.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold">{challenge.title}</h4>
                  <p className="text-sm text-gray-600">{challenge.description}</p>
                </div>
                <span className="text-green-500 font-semibold">
                  {challenge.points} pts
                </span>
              </div>
              <Progress
                value={(challenge.progress / challenge.requirement_count) * 100}
                className="h-2"
              />
              <div className="text-sm text-gray-600 text-right">
                {challenge.progress} / {challenge.requirement_count}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};