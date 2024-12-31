import { useEffect, useState } from "react";
import { Crown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeDisplay } from "./BadgeDisplay";

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

      // Get all available badges and user progress
      const { data: allBadges, error: badgesError } = await supabase
        .from('badges')
        .select(`
          *,
          user_badges!left (
            progress,
            earned_at
          )
        `);

      if (badgesError) {
        console.error('Error fetching badges:', badgesError);
        return;
      }

      // Format badges with progress
      const combinedBadges = allBadges?.map(badge => ({
        ...badge,
        is_unlocked: badge.user_badges?.[0]?.earned_at !== null,
        current_progress: badge.user_badges?.[0]?.progress || 0
      })) || [];

      setBadges(combinedBadges);
      setLoading(false);
    };

    fetchBadges();
  }, []);

  if (loading) return null;

  const unlockedBadges = badges.filter(badge => badge.is_unlocked);
  const lockedBadges = badges.filter(badge => !badge.is_unlocked);

  return (
    <Card className="bg-white/80 backdrop-blur mb-4 animate-fade-in">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Crown className="h-5 w-5 text-purple-500" />
          Your Badges
        </CardTitle>
      </CardHeader>
      <CardContent>
        {unlockedBadges.length > 0 && (
          <>
            <h3 className="font-semibold mb-4">Unlocked Badges</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
              {unlockedBadges.map((badge, index) => (
                <BadgeDisplay 
                  key={badge.id} 
                  badge={badge} 
                  index={index} 
                />
              ))}
            </div>
          </>
        )}
        
        {lockedBadges.length > 0 && (
          <>
            <h3 className="font-semibold mb-4">Badges to Unlock</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {lockedBadges.map((badge, index) => (
                <BadgeDisplay 
                  key={badge.id} 
                  badge={badge} 
                  index={index} 
                />
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};