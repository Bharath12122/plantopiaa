import { TrendingUp, Target, BarChart } from "lucide-react";
import { Card } from "@/components/ui/card";

export const FeaturesList = () => {
  return (
    <div className="space-y-6">
      <Card className="flex items-center space-x-4 p-6 bg-white/80 backdrop-blur-sm border-[#2A3B1D]/20 hover:border-[#2A3B1D]/30 transition-colors duration-300 group rounded-xl">
        <TrendingUp className="w-8 h-8 text-[#2A3B1D] group-hover:scale-110 transition-transform duration-300" />
        <p className="text-[#2A3B1D]/90">AI-powered growth analysis and recommendations</p>
      </Card>
      <Card className="flex items-center space-x-4 p-6 bg-white/80 backdrop-blur-sm border-[#2A3B1D]/20 hover:border-[#2A3B1D]/30 transition-colors duration-300 group rounded-xl">
        <Target className="w-8 h-8 text-[#2A3B1D] group-hover:scale-110 transition-transform duration-300" />
        <p className="text-[#2A3B1D]/90">Personalized business strategies</p>
      </Card>
      <Card className="flex items-center space-x-4 p-6 bg-white/80 backdrop-blur-sm border-[#2A3B1D]/20 hover:border-[#2A3B1D]/30 transition-colors duration-300 group rounded-xl">
        <BarChart className="w-8 h-8 text-[#2A3B1D] group-hover:scale-110 transition-transform duration-300" />
        <p className="text-[#2A3B1D]/90">Real-time performance tracking</p>
      </Card>
    </div>
  );
};