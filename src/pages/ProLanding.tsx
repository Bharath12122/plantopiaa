import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProStatus } from "@/hooks/useProStatus";
import { ProLandingHeader } from "@/components/pro/landing/ProLandingHeader";
import { ProLandingFeatures } from "@/components/pro/landing/ProLandingFeatures";
import { ProLandingPricing } from "@/components/pro/landing/ProLandingPricing";
import { ProLandingTestimonials } from "@/components/pro/landing/ProLandingTestimonials";
import { ProLandingFAQ } from "@/components/pro/landing/ProLandingFAQ";
import { Toaster } from "@/components/ui/toaster";

export const ProLanding = () => {
  const navigate = useNavigate();
  const { isPro, isLoading } = useProStatus();

  useEffect(() => {
    if (!isLoading && isPro) {
      navigate("/pro/dashboard");
    }
  }, [isPro, isLoading, navigate]);

  return (
    <div className="min-h-screen bg-[#1A1F2C] text-white">
      <div className="container mx-auto px-4 py-12">
        <ProLandingHeader />
        <ProLandingFeatures />
        <ProLandingPricing />
        <ProLandingTestimonials />
        <ProLandingFAQ />
      </div>
      <Toaster />
    </div>
  );
};