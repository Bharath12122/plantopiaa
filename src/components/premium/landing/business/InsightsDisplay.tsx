import { BarChart, Target, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

interface InsightsDisplayProps {
  insight: any;
}

export const InsightsDisplay = ({ insight }: InsightsDisplayProps) => {
  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm border-[#a2d96e]/20 order-2 md:order-1 rounded-2xl hover:shadow-lg transition-all duration-300">
      <div className="aspect-video rounded-lg bg-gradient-to-br from-[#F2FCE2] to-[#a2d96e]/10 flex items-center justify-center mb-6">
        <BarChart className="w-16 h-16 text-[#a2d96e] animate-pulse" />
      </div>

      {insight?.insights && (
        <div className="space-y-6">
          {/* Growth Analysis */}
          <div className="p-4 bg-[#F2FCE2] rounded-lg border border-[#a2d96e]/20">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-[#a2d96e]" />
              <span className="font-medium text-[#2A3B1D]">Growth Analysis</span>
            </div>
            <p className="text-gray-700">{insight.insights.growthAnalysis}</p>
          </div>

          {/* Business Strategy */}
          <div className="p-4 bg-[#F2FCE2] rounded-lg border border-[#a2d96e]/20">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-[#a2d96e]" />
              <span className="font-medium text-[#2A3B1D]">Business Strategy</span>
            </div>
            <p className="text-gray-700">{insight.insights.businessStrategy}</p>
          </div>

          {/* Performance Metrics */}
          <div className="p-4 bg-[#F2FCE2] rounded-lg border border-[#a2d96e]/20">
            <div className="flex items-center gap-2 mb-2">
              <BarChart className="w-5 h-5 text-[#a2d96e]" />
              <span className="font-medium text-[#2A3B1D]">Performance Metrics</span>
            </div>
            <p className="text-gray-700">{insight.insights.performanceMetrics}</p>
          </div>
        </div>
      )}
    </Card>
  );
};