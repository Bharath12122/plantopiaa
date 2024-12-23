import { BarChart, TrendingUp, Target } from "lucide-react";
import { Card } from "@/components/ui/card";

export const BusinessAnalytics = () => {
  return (
    <section className="grid md:grid-cols-2 gap-8 items-center">
      <Card className="p-6 bg-white/5 backdrop-blur-sm border-[#9b87f5]/20 order-2 md:order-1">
        <div className="aspect-video rounded-lg bg-gradient-to-br from-[#9b87f5]/20 to-[#7E69AB]/20 flex items-center justify-center">
          <BarChart className="w-16 h-16 text-[#9b87f5] animate-pulse" />
        </div>
      </Card>
      <div className="order-1 md:order-2">
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent">
          Business Analytics & Growth
        </h2>
        <div className="space-y-6">
          <div className="flex items-center space-x-4 bg-white/5 p-4 rounded-lg backdrop-blur-sm hover:bg-white/10 transition-colors">
            <TrendingUp className="w-8 h-8 text-[#9b87f5]" />
            <p className="text-white/90">Track ROI and business performance</p>
          </div>
          <div className="flex items-center space-x-4 bg-white/5 p-4 rounded-lg backdrop-blur-sm hover:bg-white/10 transition-colors">
            <Target className="w-8 h-8 text-[#9b87f5]" />
            <p className="text-white/90">Set and monitor growth targets</p>
          </div>
          <div className="flex items-center space-x-4 bg-white/5 p-4 rounded-lg backdrop-blur-sm hover:bg-white/10 transition-colors">
            <BarChart className="w-8 h-8 text-[#9b87f5]" />
            <p className="text-white/90">Detailed analytics dashboard</p>
          </div>
        </div>
      </div>
    </section>
  );
};