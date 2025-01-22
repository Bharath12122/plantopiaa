import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { VideoConsultation } from "@/components/premium/landing/VideoConsultation";
import { BusinessAnalytics } from "@/components/premium/landing/BusinessAnalytics";
import { AdvancedIdentification } from "@/components/premium/landing/AdvancedIdentification";
import { PrioritySupport } from "@/components/premium/landing/PrioritySupport";
import { EducationalLibrary } from "@/components/premium/landing/EducationalLibrary";
import { ArrowLeft, Star } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

const PremiumLanding = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubscribe = () => {
    toast({
      title: "Coming Soon!",
      description: "Premium features are currently under development.",
    });
  };

  return (
    <div className="min-h-screen bg-[#F2FCE2]">
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-8 text-[#2A3B1D] hover:bg-[#2A3B1D]/10 group transition-all duration-300"
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </Button>

        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[#2A3B1D]">
            Premium Plant Care
          </h1>
          <div className="flex items-center justify-center gap-2 mb-6">
            <Star className="w-5 h-5 text-[#2A3B1D]" />
            <Star className="w-5 h-5 text-[#2A3B1D]" />
            <Star className="w-5 h-5 text-[#2A3B1D]" />
          </div>
          <p className="text-xl text-[#2A3B1D]/80 max-w-2xl mx-auto leading-relaxed">
            Transform your plant business with our comprehensive suite of premium tools and expert guidance
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-24">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
            <VideoConsultation />
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
            <BusinessAnalytics />
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
            <AdvancedIdentification />
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
            <PrioritySupport />
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
            <EducationalLibrary />
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <Button 
            className="bg-[#2A3B1D] hover:bg-[#2A3B1D]/90 text-white px-16 py-8 text-xl font-semibold rounded-2xl transition-all duration-300 hover:scale-105 group"
            onClick={handleSubscribe}
          >
            Get Premium Access Now
            <Star className="ml-3 w-5 h-5 inline-block group-hover:rotate-45 transition-transform duration-300" />
          </Button>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default PremiumLanding;