import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProLandingHeader } from "@/components/pro/landing/ProLandingHeader";
import { ProLandingFeatures } from "@/components/pro/landing/ProLandingFeatures";
import { ProLandingComparison } from "@/components/pro/landing/ProLandingComparison";
import { ProLandingTestimonials } from "@/components/pro/landing/ProLandingTestimonials";
import { ProLandingPricing } from "@/components/pro/landing/ProLandingPricing";
import { ProLandingFAQ } from "@/components/pro/landing/ProLandingFAQ";
import { Footer } from "@/components/Footer";

const ProLanding = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#1A1F2C]">
      <div className="container mx-auto px-4 py-12">
        <ProLandingHeader />
        <ProLandingFeatures />
        <ProLandingComparison />
        <ProLandingTestimonials />
        <ProLandingPricing />
        <ProLandingFAQ />
        
        <div className="text-center mt-16">
          <Button
            onClick={() => navigate("/pro")}
            className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white px-8 py-6 text-xl font-semibold rounded-xl transition-all duration-300"
          >
            Join Pro Today
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProLanding;