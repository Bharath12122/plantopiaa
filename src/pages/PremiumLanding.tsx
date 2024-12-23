import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { VideoConsultation } from "@/components/premium/landing/VideoConsultation";
import { BusinessAnalytics } from "@/components/premium/landing/BusinessAnalytics";
import { AdvancedIdentification } from "@/components/premium/landing/AdvancedIdentification";
import { PrioritySupport } from "@/components/premium/landing/PrioritySupport";
import { EducationalLibrary } from "@/components/premium/landing/EducationalLibrary";
import { Crown, ArrowLeft } from "lucide-react";

const PremiumLanding = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#1A1F2C] text-white">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#9b87f5]/10 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 py-12 relative">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-8 text-white hover:bg-white/10"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <div className="text-center mb-24">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Crown className="w-16 h-16 text-[#9b87f5] animate-float" />
              <div className="absolute inset-0 animate-glow" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent">
            Unlock Premium Features
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Transform your plant business with our comprehensive suite of premium tools and expert guidance
          </p>
        </div>

        <div className="grid gap-24">
          <div className="relative">
            <div className="absolute -inset-x-4 -inset-y-4 bg-gradient-to-r from-[#9b87f5]/20 to-[#7E69AB]/20 rounded-2xl blur-xl" />
            <VideoConsultation />
          </div>
          
          <div className="relative">
            <div className="absolute -inset-x-4 -inset-y-4 bg-gradient-to-r from-[#7E69AB]/20 to-[#9b87f5]/20 rounded-2xl blur-xl" />
            <BusinessAnalytics />
          </div>
          
          <div className="relative">
            <div className="absolute -inset-x-4 -inset-y-4 bg-gradient-to-r from-[#9b87f5]/20 to-[#7E69AB]/20 rounded-2xl blur-xl" />
            <AdvancedIdentification />
          </div>
          
          <div className="relative">
            <div className="absolute -inset-x-4 -inset-y-4 bg-gradient-to-r from-[#7E69AB]/20 to-[#9b87f5]/20 rounded-2xl blur-xl" />
            <PrioritySupport />
          </div>
          
          <div className="relative">
            <div className="absolute -inset-x-4 -inset-y-4 bg-gradient-to-r from-[#9b87f5]/20 to-[#7E69AB]/20 rounded-2xl blur-xl" />
            <EducationalLibrary />
          </div>
        </div>

        <div className="mt-24 text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#9b87f5]/20 to-[#7E69AB]/20 rounded-2xl blur-3xl" />
          <Button 
            className="relative bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:opacity-90 text-white px-12 py-6 text-lg rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(155,135,245,0.5)]"
            onClick={() => {
              // TODO: Implement subscription logic
              console.log("Subscribe to Premium");
            }}
          >
            Get Premium Access Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PremiumLanding;