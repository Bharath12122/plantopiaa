import { Progress } from "@/components/ui/progress";
import { BadgeIcon } from "./BadgeIcon";
import { BadgeTooltip } from "./BadgeTooltip";

interface BadgeDisplayProps {
  badge: {
    id: string;
    name: string;
    description: string;
    requirement_count: number;
    is_unlocked?: boolean;
    current_progress?: number;
  };
  index: number;
}

export const BadgeDisplay = ({ badge, index }: BadgeDisplayProps) => {
  return (
    <BadgeTooltip badge={badge}>
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
            <BadgeIcon badgeName={badge.name} />
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
    </BadgeTooltip>
  );
};