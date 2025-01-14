import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProHeaderProps {
  onUpgrade: () => void;
  isPro: boolean;
}

export const ProHeader = ({ onUpgrade, isPro }: ProHeaderProps) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="flex justify-center">
        <div className="bg-[#1A1F2C] py-2 px-6 rounded-full inline-flex items-center">
          <span className="text-[#9b87f5] text-sm font-medium">
            {isPro ? "✨ PRO ACCESS ACTIVATED" : "✨ SPECIAL OFFER: LIMITED TIME PRO ACCESS"}
          </span>
        </div>
      </div>
      
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white">
          Hand-Picked <span className="text-[#9b87f5]">Plant Insights</span>
        </h1>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white">
          To Enhance Your Garden
        </h2>
        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
          #1 Database of Medicinal Plants | Save 100+ hours of research and cultivation time
        </p>
      </div>
      
      {!isPro && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button
            onClick={onUpgrade}
            className="w-full sm:w-auto bg-[#9b87f5] text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-[#7E69AB] transition-all flex items-center justify-center gap-2"
          >
            Get Pro Access <ArrowRight className="w-6 h-6" />
          </Button>
        </div>
      )}
      
      <p className="text-gray-400 text-center pt-4">
        Over 1,000+ plant enthusiasts trust our database
      </p>
    </div>
  );
};