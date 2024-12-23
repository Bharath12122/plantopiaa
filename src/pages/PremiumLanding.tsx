import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { VideoConsultation } from "@/components/premium/landing/VideoConsultation";
import { BusinessAnalytics } from "@/components/premium/landing/BusinessAnalytics";
import { AdvancedIdentification } from "@/components/premium/landing/AdvancedIdentification";
import { PrioritySupport } from "@/components/premium/landing/PrioritySupport";
import { EducationalLibrary } from "@/components/premium/landing/EducationalLibrary";
import { Crown, ArrowLeft } from "lucide-react";

const PremiumLanding = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-[#9b87f5]/5">
      <div className="container mx-auto px-4 py-12">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-8 hover:bg-[#9b87f5]/10"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Crown className="w-12 h-12 text-[#9b87f5] animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent">
            Unlock Premium Features
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your plant business with our comprehensive suite of premium tools and expert guidance
          </p>
        </div>

        <div className="grid gap-16">
          <VideoConsultation />
          <BusinessAnalytics />
          <AdvancedIdentification />
          <PrioritySupport />
          <EducationalLibrary />
        </div>

        <div className="mt-16 text-center">
          <Button 
            className="bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:opacity-90 text-white px-8 py-6 text-lg rounded-lg transition-all duration-300 hover:shadow-lg"
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