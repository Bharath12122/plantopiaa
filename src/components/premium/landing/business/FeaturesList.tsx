import { TrendingUp, Target, BarChart } from "lucide-react";
import { Card } from "@/components/ui/card";

export const FeaturesList = () => {
  return (
    <div className="space-y-6">
      <Card className="flex items-center space-x-4 p-6 bg-white/80 backdrop-blur-sm border-[#a2d96e]/20 hover:border-[#a2d96e]/30 transition-colors duration-300 group rounded-xl">
        <TrendingUp className="w-8 h-8 text-[#a2d96e] group-hover:scale-110 transition-transform duration-300" />
        <p className="text-gray-700">AI-powered growth analysis and recommendations</p>
      </Card>
      <Card className="flex items-center space-x-4 p-6 bg-white/80 backdrop-blur-sm border-[#a2d96e]/20 hover:border-[#a2d96e]/30 transition-colors duration-300 group rounded-xl">
        <Target className="w-8 h-8 text-[#a2d96e] group-hover:scale-110 transition-transform duration-300" />
        <p className="text-gray-700">Personalized business strategies</p>
      </Card>
      <Card className="flex items-center space-x-4 p-6 bg-white/80 backdrop-blur-sm border-[#a2d96e]/20 hover:border-[#a2d96e]/30 transition-colors duration-300 group rounded-xl">
        <BarChart className="w-8 h-8 text-[#a2d96e] group-hover:scale-110 transition-transform duration-300" />
        <p className="text-gray-700">Real-time performance tracking</p>
      </Card>
    </div>
  );
};