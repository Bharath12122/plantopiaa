import React, { useState, useEffect } from "react";
import { useProStatus } from "@/hooks/useProStatus";
import { PlantUpload } from "@/components/PlantUpload";
import { PlantResults } from "@/components/PlantResults";
import { PlantCollectionManager } from "@/components/pro/PlantCollectionManager";
import { PrioritySupport } from "@/components/pro/PrioritySupport";
import { EducationalResources } from "@/components/pro/EducationalResources";
import { BusinessAnalytics } from "@/components/pro/BusinessAnalytics";
import { SubscriptionCard } from "@/components/SubscriptionCard";
import { ChatbotTrigger } from "@/components/ChatbotTrigger";
import { LogoutButton } from "@/components/LogoutButton";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { DailyRewards } from "@/components/DailyRewards";
import { GamificationSection } from "@/components/gamification/GamificationSection";
import { PlantCareTips } from "@/components/PlantCareTips";
import { Footer } from "@/components/Footer";
import { Leaf, Camera } from "lucide-react";
import { Features } from "@/components/Features";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const subscriptions = [
  {
    title: "Free",
    monthlyPrice: "0",
    yearlyPrice: "0",
    description: "Perfect for beginners",
    features: [
      { text: "10 plant identifications/month", included: true },
      { text: "Basic care guides", included: true },
      { text: "Community access", included: true },
      { text: "Ad-supported", included: true },
      { text: "Offline mode", included: false },
    ],
    variant: "free" as const,
  },
  {
    title: "Pro",
    monthlyPrice: "299",
    yearlyPrice: "2,999",
    description: "For plant enthusiasts",
    features: [
      { text: "Unlimited plant identifications", included: true },
      { text: "Detailed Medicinal Plant Information", included: true },
      { text: "Watering schedules", included: true },
      { text: "Plant pros & cons analysis", included: true },
      { text: "Ad-free experience", included: true },
    ],
    variant: "pro" as const,
    popular: true,
  },
  {
    title: "Premium",
    monthlyPrice: "699",
    yearlyPrice: "6,999",
    description: "For professionals",
    features: [
      { text: "Everything in Pro", included: true },
      { text: "Personalized growth tips", included: true },
      { text: "Companion planting advice", included: true },
      { text: "Disease identification", included: true },
      { text: "Advanced gamification features", included: true },
    ],
    variant: "premium" as const,
  },
];

const faqItems = [
  {
    question: "What features are included in the free version?",
    answer: "The free version includes 10 plant identifications per month, basic care guides, community access, and ad-supported features. You can track your plants, get basic care recommendations, and participate in our plant-loving community.",
  },
  {
    question: "How accurate is the plant identification?",
    answer: "Our AI-powered plant identification system has an accuracy rate of over 95% for common plants. The system is continuously learning and improving. For best results, we recommend taking clear, well-lit photos of the plant's leaves, flowers, or overall structure.",
  },
  {
    question: "What additional features do I get with premium upgrades?",
    answer: "Premium upgrades (Pro and Premium plans) offer unlimited plant identifications, detailed care guides, offline mode, ad-free experience, expert consultations, disease identification, and family sharing options. Pro users also get access to a plant collection library and priority support.",
  },
  {
    question: "Are there daily limits on plant scans?",
    answer: "Free users can perform up to 10 plant identifications per month. Pro and Premium users have unlimited scans. The daily limit resets at midnight in your local time zone.",
  },
];

const Index = () => {
  console.log("Rendering Index page");
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isPro, isLoading: isProLoading } = useProStatus();
  const [identifiedPlant, setIdentifiedPlant] = useState<any>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [showGamification, setShowGamification] = useState(false);

  useEffect(() => {
    // Reset states when component mounts
    setShowUpload(false);
    setShowGamification(false);
    setIdentifiedPlant(null);
  }, []);

  if (isProLoading) {
    return (
      <div className="min-h-screen bg-[#F2FCE2] flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  const handleTryFreeClick = () => {
    console.log("Try Free clicked");
    setShowUpload(true);
    setShowGamification(true);
    
    // Use requestAnimationFrame to ensure state is updated before scrolling
    requestAnimationFrame(() => {
      const uploadSection = document.getElementById('upload-section');
      if (uploadSection) {
        uploadSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  };

  const handleUploadSuccess = (plantData: any) => {
    console.log("Upload success, plant data:", plantData);
    setIdentifiedPlant(plantData);
    setShowGamification(true);
    toast({
      title: "Achievement Unlocked! 🌟",
      description: "You've earned your first Plant Explorer badge!",
    });
  };

  return (
    <div className="min-h-screen bg-[#F2FCE2]">
      <LogoutButton />
      
      <div className="container pt-20 pb-16 text-center">
        <div className="flex justify-center mb-8">
          <Leaf className="h-16 w-16 text-[#00B388] animate-float" />
        </div>
        <h1 className="text-5xl font-bold mb-6 text-[#2A3B1D]">
          {isPro ? "Pro Plant Identification" : "Identify Any Plant in Seconds"}
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          {isPro 
            ? "Access unlimited plant identifications, detailed care guides, and exclusive Pro features."
            : "Our AI-powered plant identification app helps you discover and learn about the flora around you."}
        </p>

        <div className="flex gap-4 justify-center mb-16">
          <Button 
            onClick={handleTryFreeClick}
            className="bg-[#00B388] hover:bg-[#00B388]/90 text-white px-8 py-6"
          >
            {isPro ? "Start Scanning" : "Try For Free"}
          </Button>
          {!isPro && (
            <Button
              onClick={() => navigate("/pro/landing")}
              variant="outline"
              className="border-[#00B388] text-[#00B388] hover:bg-[#00B388]/10 px-8 py-6"
            >
              Upgrade to Pro
            </Button>
          )}
        </div>

        <Features />

        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-[#2A3B1D]">
            Daily Plant Care Tips
          </h2>
          <PlantCareTips />
        </div>

        {showUpload && (
          <div id="upload-section" className="scroll-mt-8">
            <GamificationSection showGamification={showGamification} />
            <PlantUpload onUploadSuccess={handleUploadSuccess} />
            {identifiedPlant && <PlantResults plant={identifiedPlant} />}
            
            {isPro && (
              <>
                <PlantCollectionManager />
                <BusinessAnalytics />
                <EducationalResources />
                <PrioritySupport />
              </>
            )}
            
            <DailyRewards />
          </div>
        )}

        {!isPro && (
          <>
            <h2 className="text-3xl font-bold mb-8 text-[#2A3B1D]">
              Choose Your Plan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {subscriptions.map((sub) => (
                <SubscriptionCard key={sub.title} {...sub} />
              ))}
            </div>
          </>
        )}

        <section className="mt-20 mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-[#2A3B1D]">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="bg-white/80 backdrop-blur-sm rounded-lg mb-4 px-6 data-[state=open]:shadow-md transition-shadow duration-200"
              >
                <AccordionTrigger className="text-left hover:no-underline py-4">
                  <span className="text-lg font-medium text-[#2A3B1D]">
                    {item.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <button
          className="fixed bottom-8 right-8 p-4 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
          onClick={() => toast({
            title: "Need Help?",
            description: "Our support team is here to assist you!",
          })}
        >
          <Camera className="h-6 w-6 text-[#00B388] group-hover:text-[#00B388]/80 transition-colors" />
        </button>

        <ChatbotTrigger />
      </div>

      <Footer />
    </div>
  );
};

export default Index;