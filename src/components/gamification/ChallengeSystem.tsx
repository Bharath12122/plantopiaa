import { useEffect, useState } from "react";
import { Star, Gift } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  useEffect(() => {
    const fetchChallenges = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      // First, ensure daily challenges exist
      const now = new Date();
      const dailyChallenges = [
        {
          title: "Plant Explorer",
          description: "Identify 3 different plants today",
          points: 50,
          requirement_count: 3,
          challenge_type: "daily_scans",
          created_at: now.toISOString(),
          start_date: now.toISOString(),
          end_date: new Date(now.setHours(23, 59, 59, 999)).toISOString()
        },
        {
          title: "Knowledge Seeker",
          description: "Read 2 plant care guides",
          points: 30,
          requirement_count: 2,
          challenge_type: "guide_reads",
          created_at: now.toISOString(),
          start_date: now.toISOString(),
          end_date: new Date(now.setHours(23, 59, 59, 999)).toISOString()
        },
        {
          title: "Community Helper",
          description: "Help identify a plant in the community",
          points: 40,
          requirement_count: 1,
          challenge_type: "community_help",
          created_at: now.toISOString(),
          start_date: now.toISOString(),
          end_date: new Date(now.setHours(23, 59, 59, 999)).toISOString()
        },
        {
          title: "Green Thumb",
          description: "Water 5 of your registered plants",
          points: 25,
          requirement_count: 5,
          challenge_type: "plant_care",
          created_at: now.toISOString(),
          start_date: now.toISOString(),
          end_date: new Date(now.setHours(23, 59, 59, 999)).toISOString()
        },
        {
          title: "Plant Photographer",
          description: "Take 3 high-quality plant photos",
          points: 35,
          requirement_count: 3,
          challenge_type: "photo_uploads",
          created_at: now.toISOString(),
          start_date: now.toISOString(),
          end_date: new Date(now.setHours(23, 59, 59, 999)).toISOString()
        }
      ];

      // Insert challenges if they don't exist
      for (const challenge of dailyChallenges) {
        const { error: insertError } = await supabase
          .from('challenges')
          .upsert(challenge);

        if (insertError) console.error('Error inserting challenge:', insertError);
      }

      // Fetch user's challenge progress
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
        .limit(5);

      if (error) {
        console.error('Error fetching challenges:', error);
        return;
      }

      const formattedChallenges = data?.map(challenge => ({
        ...challenge,
        progress: challenge.user_challenge_progress?.[0]?.progress || 0
      })) || [];

      // Check for completed challenges
      formattedChallenges.forEach(challenge => {
        if (challenge.progress >= challenge.requirement_count) {
          toast({
            title: "Challenge Completed! 🎉",
            description: `You've earned ${challenge.points} points!`,
          });
        }
      });

      setChallenges(formattedChallenges);
      setLoading(false);
    };

    fetchChallenges();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('challenge-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_challenge_progress'
        },
        () => {
          fetchChallenges();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  if (loading) return null;

  return (
    <Card className="bg-white/80 backdrop-blur mb-4 animate-fade-in">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Star className="h-5 w-5 text-green-500 animate-spin-slow" />
          Daily Challenges
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {challenges.map((challenge, index) => (
            <div 
              key={challenge.id} 
              className="space-y-3 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold text-lg">{challenge.title}</h4>
                  <p className="text-sm text-gray-600">{challenge.description}</p>
                </div>
                <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full animate-pulse">
                  <Gift className="h-4 w-4 text-green-500" />
                  <span className="text-green-500 font-semibold">
                    {challenge.points} pts
                  </span>
                </div>
              </div>
              <Progress
                value={(challenge.progress / challenge.requirement_count) * 100}
                className="h-2 animate-glow"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>Progress: {challenge.progress} / {challenge.requirement_count}</span>
                <span>{Math.round((challenge.progress / challenge.requirement_count) * 100)}%</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm text-green-600 animate-bounce font-medium">
            Complete challenges to earn points and unlock badges!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};