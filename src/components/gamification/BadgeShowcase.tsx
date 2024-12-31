import { useEffect, useState } from "react";
import { Sprout, Crown, Leaf, Flower, Heart, Sparkles, Globe, Timer } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement_type: string;
  requirement_count: number;
  points: number;
  is_unlocked?: boolean;
  current_progress?: number;
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
          name: "Sprout Starter",
          description: "Complete your first plant scan",
          icon: "🌱",
          requirement_type: "plant_scans",
          requirement_count: 1,
          points: 10
        },
        {
          name: "Garden Guru",
          description: "Identify 50 different plants",
          icon: "👑",
          requirement_type: "plant_scans",
          requirement_count: 50,
          points: 100
        },
        {
          name: "Disease Detective",
          description: "Identify 5 plant diseases",
          icon: "🔍",
          requirement_type: "disease_scans",
          requirement_count: 5,
          points: 50
        },
        {
          name: "Herbal Healer",
          description: "Explore 10 medicinal plants",
          icon: "🌿",
          requirement_type: "medicinal_scans",
          requirement_count: 10,
          points: 75
        },
        {
          name: "Companion Planter",
          description: "Use companion planting guides",
          icon: "💚",
          requirement_type: "guide_reads",
          requirement_count: 5,
          points: 30
        },
        {
          name: "Exotic Explorer",
          description: "Identify rare or unique plants",
          icon: "✨",
          requirement_type: "rare_scans",
          requirement_count: 3,
          points: 150
        },
        {
          name: "Sustainability Hero",
          description: "Engage with eco-friendly tips",
          icon: "🌍",
          requirement_type: "eco_tips",
          requirement_count: 10,
          points: 50
        },
        {
          name: "Blossom Booster",
          description: "Use the app daily for 30 days",
          icon: "🌸",
          requirement_type: "streak_days",
          requirement_count: 30,
          points: 200
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
        .limit(8);

      if (badgesError) {
        console.error('Error fetching badges:', badgesError);
        return;
      }

      // Then get user's unlocked badges and progress
      const { data: userBadges, error: userBadgesError } = await supabase
        .from('user_badges')
        .select('badge_id, progress')
        .eq('user_id', session.user.id);

      if (userBadgesError) {
        console.error('Error fetching user badges:', userBadgesError);
        return;
      }

      // Combine the data to show both locked and unlocked badges with progress
      const combinedBadges = allBadges?.map(badge => {
        const userBadge = userBadges?.find(ub => ub.badge_id === badge.id);
        return {
          ...badge,
          is_unlocked: !!userBadge,
          current_progress: userBadge?.progress || 0
        };
      }) || [];

      setBadges(combinedBadges);
      setLoading(false);
    };

    fetchBadges();
  }, []);

  const getIconComponent = (badgeName: string) => {
    switch (badgeName) {
      case "Sprout Starter":
        return <Sprout className="h-6 w-6" />;
      case "Garden Guru":
        return <Crown className="h-6 w-6" />;
      case "Disease Detective":
        return <Leaf className="h-6 w-6" />;
      case "Herbal Healer":
        return <Leaf className="h-6 w-6" />;
      case "Companion Planter":
        return <Heart className="h-6 w-6" />;
      case "Exotic Explorer":
        return <Sparkles className="h-6 w-6" />;
      case "Sustainability Hero":
        return <Globe className="h-6 w-6" />;
      case "Blossom Booster":
        return <Timer className="h-6 w-6" />;
      default:
        return <Leaf className="h-6 w-6" />;
    }
  };

  if (loading) return null;

  return (
    <Card className="bg-white/80 backdrop-blur mb-4 animate-fade-in">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Crown className="h-5 w-5 text-purple-500 animate-bounce" />
          Your Badges
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {badges.map((badge, index) => (
            <TooltipProvider key={badge.id}>
              <Tooltip>
                <TooltipTrigger>
                  <div className="space-y-4">
                    <div 
                      className={`w-16 h-16 rounded-full flex items-center justify-center
                        ${badge.is_unlocked 
                          ? 'bg-gradient-to-br from-green-100 to-purple-100 shadow-lg ring-2 ring-purple-300 animate-pulse' 
                          : 'bg-gray-100'}`}
                      style={{
                        animationDelay: `${index * 0.1}s`
                      }}
                    >
                      <div className={`text-2xl ${badge.is_unlocked ? 'text-purple-600' : 'text-gray-400'}`}>
                        {getIconComponent(badge.name)}
                      </div>
                    </div>
                    {!badge.is_unlocked && badge.current_progress > 0 && (
                      <div className="w-full px-2">
                        <Progress 
                          value={(badge.current_progress / badge.requirement_count) * 100}
                          className="h-1"
                        />
                      </div>
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-1">
                    <p className="font-semibold">{badge.name}</p>
                    <p className="text-sm">{badge.description}</p>
                    {!badge.is_unlocked && (
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500">
                          Progress: {badge.current_progress || 0} / {badge.requirement_count}
                        </p>
                        <p className="text-xs text-purple-600">
                          {badge.requirement_count - (badge.current_progress || 0)} more to unlock!
                        </p>
                      </div>
                    )}
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm text-purple-600 animate-pulse font-medium">
            Keep exploring to unlock more badges!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};