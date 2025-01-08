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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top section with StreakTracker and Leaderboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <StreakTracker />
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <Leaderboard />
          </div>
        </div>
        
        {/* Badge showcase section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <BadgeShowcase />
        </div>
        
        {/* Challenge system section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <ChallengeSystem />
        </div>
      </div>
    </div>
  );
};