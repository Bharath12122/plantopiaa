import { BarChart, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";

interface InsightsDisplayProps {
  insight: string;
}

export const InsightsDisplay = ({ insight }: InsightsDisplayProps) => {
  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm border-[#9b87f5]/20 order-2 md:order-1 rounded-2xl hover:shadow-lg transition-all duration-300">
      <div className="aspect-video rounded-lg bg-gradient-to-br from-[#9b87f5]/10 to-[#E5DEFF] flex items-center justify-center">
        <BarChart className="w-16 h-16 text-[#9b87f5] animate-pulse" />
      </div>
      {insight && (
        <div className="mt-6 p-4 bg-[#9b87f5]/5 rounded-lg border border-[#9b87f5]/20">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="w-5 h-5 text-[#9b87f5]" />
            <span className="font-medium text-[#7E69AB]">AI Insight</span>
          </div>
          <p className="text-gray-700">{insight}</p>
        </div>
      )}
    </Card>
  );
};