import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const ProLandingHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center mb-20">
      <div className="bg-[#9b87f5]/10 py-2 px-4 rounded-full inline-flex items-center mb-8">
        <span className="text-[#9b87f5] text-sm font-medium">✨ Transform Your Gardening Journey</span>
      </div>
      
      <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
        Upgrade to <span className="text-[#9b87f5]">Pro</span> and Unlock
        <br /> Your Garden's Potential
      </h1>
      
      <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
        Get unlimited plant identifications, personalized care guides, and expert insights
        to help your garden thrive like never before.
      </p>
      
      <Button
        onClick={() => navigate("/pro/features")}
        className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white px-8 py-6 text-xl font-semibold rounded-xl transition-all duration-300 inline-flex items-center gap-2"
      >
        Explore Pro Features <ArrowRight className="w-6 h-6" />
      </Button>
      
      <p className="text-gray-400 mt-4">
        Join over 1,000+ plant enthusiasts who trust our premium features
      </p>
    </div>
  );
};