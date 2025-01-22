import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const ProLandingPricing = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleClick = () => {
    toast({
      title: "Coming Soon!",
      description: "Pro features are currently under development. Stay tuned!",
      duration: 3000,
    });
  };

  return (
    <div className="mb-20">
      <div className="text-center mb-8">
        <div className="inline-block bg-[#9b87f5]/10 text-[#9cff3d] font-semibold px-4 py-2 rounded-full mb-4 animate-pulse">
          ✨ SPECIAL CHRISTMAS DEAL: LIMITED TIME DISCOUNT
        </div>
        <h2 className="text-4xl font-bold text-center mb-4 text-white">
          Simple, Transparent Pricing
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          #1 Database of Vetted Plants | Save 350+ hours of painful research
        </p>
      </div>
      
      <div className="max-w-md mx-auto bg-[#1A1F2C] border border-[#9b87f5]/20 rounded-xl p-8 text-center">
        <div className="mb-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-6xl font-bold text-white">₹299</span>
            <div className="text-left">
              <span className="text-gray-400">/month</span>
              <div className="text-[#9cff3d] text-sm font-medium">50% OFF</div>
            </div>
          </div>
          <div className="text-sm text-gray-400">Database + Full Access: ₹599</div>
        </div>
        
        <p className="text-gray-400 mb-8">
          Over 300+ users signed up for Beta
        </p>
        
        <ul className="space-y-4 mb-8 text-left">
          <li className="flex items-center gap-3">
            <Check className="w-5 h-5 text-[#9cff3d]" />
            <span className="text-white">Unlimited Plant Identifications</span>
          </li>
          <li className="flex items-center gap-3">
            <Check className="w-5 h-5 text-[#9cff3d]" />
            <span className="text-white">Advanced Care Guides</span>
          </li>
          <li className="flex items-center gap-3">
            <Check className="w-5 h-5 text-[#9cff3d]" />
            <span className="text-white">Offline Mode</span>
          </li>
          <li className="flex items-center gap-3">
            <Check className="w-5 h-5 text-[#9cff3d]" />
            <span className="text-white">Ad-Free Experience</span>
          </li>
          <li className="flex items-center gap-3">
            <Check className="w-5 h-5 text-[#9cff3d]" />
            <span className="text-white">Priority Support</span>
          </li>
        </ul>
        
        <Button
          onClick={handleClick}
          className="w-full bg-[#9cff3d] hover:bg-[#8bef2c] text-black py-6 text-xl font-semibold rounded-xl transition-all duration-300 group"
        >
          Get Full Access <ArrowRight className="w-5 h-5 ml-2 inline-block group-hover:translate-x-1 transition-transform" />
        </Button>

        <div className="mt-4 text-sm text-gray-400">
          Try it out, 30-day money-back guarantee
        </div>
      </div>
    </div>
  );
};