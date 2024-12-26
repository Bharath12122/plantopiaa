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

      // First get all available badges
      const { data: allBadges, error: badgesError } = await supabase
        .from('badges')
        .select('*');

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
    <Card className="bg-white/80 backdrop-blur mb-4">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Award className="h-5 w-5 text-purple-500" />
          Your Badges
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {badges.map((badge) => (
            <TooltipProvider key={badge.id}>
              <Tooltip>
                <TooltipTrigger>
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center
                      ${badge.is_unlocked 
                        ? 'bg-purple-100 hover:bg-purple-200 transition-colors' 
                        : 'bg-gray-100'}`}
                  >
                    {badge.is_unlocked ? (
                      <Award className="h-6 w-6 text-purple-500" />
                    ) : (
                      <Lock className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-1">
                    <p className="font-semibold">{badge.name}</p>
                    <p className="text-sm">{badge.description}</p>
                    {!badge.is_unlocked && (
                      <p className="text-sm text-gray-500">
                        Complete {badge.requirement_count} {badge.requirement_type} to unlock
                      </p>
                    )}
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};