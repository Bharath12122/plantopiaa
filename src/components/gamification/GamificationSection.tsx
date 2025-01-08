import { BadgeShowcase } from "./BadgeShowcase";
import { ChallengeSystem } from "./ChallengeSystem";
import { Leaderboard } from "./Leaderboard";
import { StreakTracker } from "./StreakTracker";

interface GamificationSectionProps {
  showGamification: boolean;
}

export const GamificationSection = ({ showGamification }: GamificationSectionProps) => {
  if (!showGamification) return null;

  return (
    <div className="space-y-8 mb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <StreakTracker />
        <Leaderboard />
      </div>
      <BadgeShowcase />
      <ChallengeSystem />
    </div>
  );
};