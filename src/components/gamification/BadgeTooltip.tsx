import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BadgeTooltipProps {
  badge: {
    name: string;
    description: string;
    requirement_count: number;
    is_unlocked?: boolean;
    current_progress?: number;
  };
  children: React.ReactNode;
}

export const BadgeTooltip = ({ badge, children }: BadgeTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
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
  );
};