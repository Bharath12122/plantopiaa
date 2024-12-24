import { BarChart, Target, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

interface InsightsDisplayProps {
  insight: any;
}

export const InsightsDisplay = ({ insight }: InsightsDisplayProps) => {
  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm border-[#9b87f5]/20 order-2 md:order-1 rounded-2xl hover:shadow-lg transition-all duration-300">
      <div className="aspect-video rounded-lg bg-gradient-to-br from-[#9b87f5]/10 to-[#E5DEFF] flex items-center justify-center mb-6">
        <BarChart className="w-16 h-16 text-[#9b87f5] animate-pulse" />
      </div>

      {insight?.insights && (
        <div className="space-y-6">
          {/* Growth Analysis */}
          <div className="p-4 bg-[#9b87f5]/5 rounded-lg border border-[#9b87f5]/20">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-[#9b87f5]" />
              <span className="font-medium text-[#7E69AB]">Growth Analysis</span>
            </div>
            <p className="text-gray-700">{insight.insights.growthAnalysis}</p>
          </div>

          {/* Business Strategy */}
          <div className="p-4 bg-[#9b87f5]/5 rounded-lg border border-[#9b87f5]/20">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-[#9b87f5]" />
              <span className="font-medium text-[#7E69AB]">Business Strategy</span>
            </div>
            <p className="text-gray-700">{insight.insights.businessStrategy}</p>
          </div>

          {/* Performance Metrics */}
          <div className="p-4 bg-[#9b87f5]/5 rounded-lg border border-[#9b87f5]/20">
            <div className="flex items-center gap-2 mb-2">
              <BarChart className="w-5 h-5 text-[#9b87f5]" />
              <span className="font-medium text-[#7E69AB]">Performance Metrics</span>
            </div>
            <p className="text-gray-700">{insight.insights.performanceMetrics}</p>
          </div>
        </div>
      )}
    </Card>
  );
};