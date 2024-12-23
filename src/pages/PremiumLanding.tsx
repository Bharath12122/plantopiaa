import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { VideoConsultation } from "@/components/premium/landing/VideoConsultation";
import { BusinessAnalytics } from "@/components/premium/landing/BusinessAnalytics";
import { AdvancedIdentification } from "@/components/premium/landing/AdvancedIdentification";
import { PrioritySupport } from "@/components/premium/landing/PrioritySupport";
import { EducationalLibrary } from "@/components/premium/landing/EducationalLibrary";
import { Crown, ArrowLeft, Star } from "lucide-react";

const PremiumLanding = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] to-[#2A2F3C] text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[10%] left-[5%] w-72 h-72 bg-[#9b87f5] rounded-full filter blur-[128px] opacity-20" />
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-[#7E69AB] rounded-full filter blur-[128px] opacity-20" />
      </div>
      
      <div className="container mx-auto px-4 py-12 relative">
        {/* Navigation */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-8 text-white hover:bg-white/10 group transition-all duration-300"
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </Button>

        {/* Hero Section */}
        <div className="text-center mb-32 relative">
          <div className="flex items-center justify-center mb-8 relative">
            <div className="relative">
              <Crown className="w-20 h-20 text-[#9b87f5] animate-float" />
              <div className="absolute inset-0 animate-glow" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-[#9b87f5] via-[#a794f8] to-[#7E69AB] bg-clip-text text-transparent">
            Unlock Premium Features
          </h1>
          <div className="flex items-center justify-center gap-2 mb-6">
            <Star className="w-5 h-5 text-[#9b87f5]" />
            <Star className="w-5 h-5 text-[#9b87f5]" />
            <Star className="w-5 h-5 text-[#9b87f5]" />
          </div>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Transform your plant business with our comprehensive suite of premium tools and expert guidance
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-32">
          {/* Video Consultation Section */}
          <div className="relative">
            <div className="absolute -inset-x-4 -inset-y-4 bg-gradient-to-r from-[#9b87f5]/20 to-[#7E69AB]/20 rounded-3xl blur-xl" />
            <VideoConsultation />
          </div>
          
          {/* Business Analytics Section */}
          <div className="relative">
            <div className="absolute -inset-x-4 -inset-y-4 bg-gradient-to-r from-[#7E69AB]/20 to-[#9b87f5]/20 rounded-3xl blur-xl" />
            <BusinessAnalytics />
          </div>
          
          {/* Advanced Identification Section */}
          <div className="relative">
            <div className="absolute -inset-x-4 -inset-y-4 bg-gradient-to-r from-[#9b87f5]/20 to-[#7E69AB]/20 rounded-3xl blur-xl" />
            <AdvancedIdentification />
          </div>
          
          {/* Priority Support Section */}
          <div className="relative">
            <div className="absolute -inset-x-4 -inset-y-4 bg-gradient-to-r from-[#7E69AB]/20 to-[#9b87f5]/20 rounded-3xl blur-xl" />
            <PrioritySupport />
          </div>
          
          {/* Educational Library Section */}
          <div className="relative">
            <div className="absolute -inset-x-4 -inset-y-4 bg-gradient-to-r from-[#9b87f5]/20 to-[#7E69AB]/20 rounded-3xl blur-xl" />
            <EducationalLibrary />
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-32 text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#9b87f5]/20 to-[#7E69AB]/20 rounded-3xl blur-3xl" />
          <Button 
            className="relative bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:opacity-90 text-white px-16 py-8 text-xl font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(155,135,245,0.5)] group"
            onClick={() => {
              // TODO: Implement subscription logic
              console.log("Subscribe to Premium");
            }}
          >
            Get Premium Access Now
            <Star className="ml-3 w-5 h-5 inline-block group-hover:rotate-45 transition-transform duration-300" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PremiumLanding;