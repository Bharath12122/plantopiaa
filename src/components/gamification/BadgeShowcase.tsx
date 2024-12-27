import { useEffect, useState } from "react";
import { Award, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement_type: string;
  requirement_count: number;
  is_unlocked?: boolean;
}

export const BadgeShowcase = () => {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBadges = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      // First, ensure we have our basic badges
      const basicBadges = [
        {
          name: "Plant Pioneer",
          description: "Identify your first plant",
          icon: "🌱",
          requirement_type: "plant_scans",
          requirement_count: 1,
          points: 10
        },
        {
          name: "Green Thumb",
          description: "Maintain a 3-day streak",
          icon: "🌿",
          requirement_type: "streak_days",
          requirement_count: 3,
          points: 30
        },
        {
          name: "Botanical Expert",
          description: "Identify 10 different plants",
          icon: "🎓",
          requirement_type: "plant_scans",
          requirement_count: 10,
          points: 50
        },
        {
          name: "Nature's Guardian",
          description: "Complete 5 daily challenges",
          icon: "🛡️",
          requirement_type: "daily_challenges",
          requirement_count: 5,
          points: 100
        },
        {
          name: "Plant Whisperer",
          description: "Maintain a 7-day streak",
          icon: "🌺",
          requirement_type: "streak_days",
          requirement_count: 7,
          points: 150
        },
        {
          name: "Garden Master",
          description: "Identify 25 different plants",
          icon: "👑",
          requirement_type: "plant_scans",
          requirement_count: 25,
          points: 200
        },
        {
          name: "Community Hero",
          description: "Help 10 other users",
          icon: "⭐",
          requirement_type: "community_help",
          requirement_count: 10,
          points: 250
        },
        {
          name: "Plant Scholar",
          description: "Read 20 plant care guides",
          icon: "📚",
          requirement_type: "guide_reads",
          requirement_count: 20,
          points: 300
        }
      ];

      // Insert badges if they don't exist
      for (const badge of basicBadges) {
        const { error: insertError } = await supabase
          .from('badges')
          .upsert(badge);

        if (insertError) console.error('Error inserting badge:', insertError);
      }

      // Then get all available badges
      const { data: allBadges, error: badgesError } = await supabase
        .from('badges')
        .select('*')
        .limit(8); // Limit to 8 badges

      if (badgesError) {
        console.error('Error fetching badges:', badgesError);
        return;
      }

      // Then get user's unlocked badges
      const { data: userBadges, error: userBadgesError } = await supabase
        .from('user_badges')
        .select('badge_id')
        .eq('user_id', session.user.id);

      if (userBadgesError) {
        console.error('Error fetching user badges:', userBadgesError);
        return;
      }

      // Combine the data to show both locked and unlocked badges
      const unlockedBadgeIds = userBadges?.map(ub => ub.badge_id) || [];
      const combinedBadges = allBadges?.map(badge => ({
        ...badge,
        is_unlocked: unlockedBadgeIds.includes(badge.id)
      })) || [];

      setBadges(combinedBadges);
      setLoading(false);
    };

    fetchBadges();
  }, []);

  if (loading) return null;

  return (
    <Card className="bg-white/80 backdrop-blur mb-4 animate-fade-in">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Award className="h-5 w-5 text-purple-500 animate-bounce" />
          Your Badges
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 place-items-center">
          {badges.map((badge, index) => (
            <TooltipProvider key={badge.id}>
              <Tooltip>
                <TooltipTrigger>
                  <div 
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl
                      ${badge.is_unlocked 
                        ? 'bg-purple-100 hover:bg-purple-200 transition-colors animate-float shadow-lg' 
                        : 'bg-gray-100'}`}
                    style={{
                      animationDelay: `${index * 0.1}s`
                    }}
                  >
                    {badge.is_unlocked ? (
                      <span>{badge.icon}</span>
                    ) : (
                      <Lock className="h-6 w-6 text-gray-400" />
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-1">
                    <p className="font-semibold">{badge.name}</p>
                    <p className="text-sm">{badge.description}</p>
                    {!badge.is_unlocked && (
                      <p className="text-sm text-gray-500">
                        Complete {badge.requirement_count} {badge.requirement_type.replace('_', ' ')} to unlock
                      </p>
                    )}
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm text-purple-600 animate-pulse font-medium">
            Complete daily challenges to unlock more badges!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};