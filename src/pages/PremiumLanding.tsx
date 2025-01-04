import React from 'react';
import { VideoConsultation } from "@/components/premium/landing/VideoConsultation";
import { EducationalLibrary } from "@/components/premium/landing/EducationalLibrary";
import { PrioritySupport } from "@/components/premium/landing/PrioritySupport";
import { SupportChat } from "@/components/premium/landing/SupportChat";
import { AdvancedIdentification } from "@/components/premium/landing/AdvancedIdentification";
import { YieldEstimation } from "@/components/premium/landing/analytics/YieldEstimation";

const PremiumLanding = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-16 text-gray-900">
          Premium Features
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <AdvancedIdentification />
          <YieldEstimation />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <VideoConsultation />
          <EducationalLibrary />
          <PrioritySupport />
          <SupportChat />
        </div>
      </div>
    </div>
  );
};

export default PremiumLanding;