import { BarChart, TrendingUp, Target } from "lucide-react";
import { Card } from "@/components/ui/card";

export const BusinessAnalytics = () => {
  return (
    <section className="grid md:grid-cols-2 gap-8 items-center">
      <Card className="p-6 bg-white border-[#2A3B1D]/10 order-2 md:order-1 rounded-2xl">
        <div className="aspect-video rounded-lg bg-[#F2FCE2] flex items-center justify-center">
          <BarChart className="w-16 h-16 text-[#2A3B1D] animate-pulse" />
        </div>
      </Card>
      <div className="order-1 md:order-2">
        <h2 className="text-3xl font-bold mb-6 text-[#2A3B1D]">
          Business Analytics & Growth
        </h2>
        <div className="space-y-6">
          <Card className="flex items-center space-x-4 p-6 bg-white border-[#2A3B1D]/10 hover:border-[#2A3B1D]/30 transition-colors duration-300 group rounded-xl">
            <TrendingUp className="w-8 h-8 text-[#2A3B1D] group-hover:scale-110 transition-transform duration-300" />
            <p className="text-[#2A3B1D]/90">Track ROI and business performance</p>
          </Card>
          <Card className="flex items-center space-x-4 p-6 bg-white border-[#2A3B1D]/10 hover:border-[#2A3B1D]/30 transition-colors duration-300 group rounded-xl">
            <Target className="w-8 h-8 text-[#2A3B1D] group-hover:scale-110 transition-transform duration-300" />
            <p className="text-[#2A3B1D]/90">Set and monitor growth targets</p>
          </Card>
          <Card className="flex items-center space-x-4 p-6 bg-white border-[#2A3B1D]/10 hover:border-[#2A3B1D]/30 transition-colors duration-300 group rounded-xl">
            <BarChart className="w-8 h-8 text-[#2A3B1D] group-hover:scale-110 transition-transform duration-300" />
            <p className="text-[#2A3B1D]/90">Detailed analytics dashboard</p>
          </Card>
        </div>
      </div>
    </section>
  );
};