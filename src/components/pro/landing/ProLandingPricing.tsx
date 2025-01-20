import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const ProLandingPricing = () => {
  const navigate = useNavigate();

  return (
    <div className="mb-20">
      <h2 className="text-4xl font-bold text-center mb-12 text-white">
        Simple, Transparent Pricing
      </h2>
      
      <div className="max-w-md mx-auto bg-[#1A1F2C] border border-[#9b87f5]/20 rounded-xl p-8 text-center">
        <div className="mb-4">
          <span className="text-6xl font-bold text-white">₹299</span>
          <span className="text-gray-400">/month</span>
        </div>
        
        <p className="text-gray-400 mb-8">
          Cancel anytime. No hidden fees.
        </p>
        
        <ul className="space-y-4 mb-8 text-left">
          <li className="flex items-center gap-3">
            <Check className="w-5 h-5 text-[#9b87f5]" />
            <span className="text-white">Unlimited Plant Identifications</span>
          </li>
          <li className="flex items-center gap-3">
            <Check className="w-5 h-5 text-[#9b87f5]" />
            <span className="text-white">Advanced Care Guides</span>
          </li>
          <li className="flex items-center gap-3">
            <Check className="w-5 h-5 text-[#9b87f5]" />
            <span className="text-white">Offline Mode</span>
          </li>
          <li className="flex items-center gap-3">
            <Check className="w-5 h-5 text-[#9b87f5]" />
            <span className="text-white">Ad-Free Experience</span>
          </li>
          <li className="flex items-center gap-3">
            <Check className="w-5 h-5 text-[#9b87f5]" />
            <span className="text-white">Priority Support</span>
          </li>
        </ul>
        
        <Button
          onClick={() => navigate("/pro")}
          className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white py-6 text-xl font-semibold rounded-xl transition-all duration-300"
        >
          Get Started with Pro
        </Button>
      </div>
    </div>
  );
};