import { useEffect, useState } from "react";
import { Bell, Gift } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAnonymousInteractions } from "@/hooks/useAnonymousInteractions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export const DailyRewards = () => {
  const { toast } = useToast();
  const { interactionCount } = useAnonymousInteractions();
  const [showReward, setShowReward] = useState(false);
  const FREE_SCANS_LIMIT = 3;
  const remainingScans = FREE_SCANS_LIMIT - interactionCount;

  useEffect(() => {
    // Show reward notification when user completes all daily scans
    if (interactionCount === FREE_SCANS_LIMIT && !showReward) {
      setShowReward(true);
      toast({
        title: "Daily Goal Achieved! 🎉",
        description: "You've unlocked today's plant care tips and fun facts!",
      });
    }
  }, [interactionCount, toast]);

  if (interactionCount === 0) return null;

  return (
    <Card className="mb-8 bg-white/80 backdrop-blur animate-fade-in">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Bell className="h-5 w-5 text-[#00B388]" />
          Daily Plant Scans
        </CardTitle>
        <CardDescription>
          Complete your daily scans to unlock special rewards
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Progress 
            value={(interactionCount / FREE_SCANS_LIMIT) * 100} 
            className="h-2"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>{interactionCount} of {FREE_SCANS_LIMIT} scans completed</span>
            <span>{remainingScans} remaining</span>
          </div>
          {showReward && (
            <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-100 flex items-center gap-2">
              <Gift className="h-5 w-5 text-[#00B388]" />
              <span className="text-sm text-green-800">
                Reward unlocked! Check your profile for special plant care tips.
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};