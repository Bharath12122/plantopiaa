import { Leaf, Camera } from "lucide-react";
import { SubscriptionCard } from "@/components/SubscriptionCard";
import { ChatbotTrigger } from "@/components/ChatbotTrigger";
import { LogoutButton } from "@/components/LogoutButton";
import { useNavigate } from "react-router-dom";
import { useState, Suspense } from "react";
import { useToast } from "@/hooks/use-toast";
import { PlantUpload } from "@/components/PlantUpload";
import { PlantResults } from "@/components/PlantResults";
import { Button } from "@/components/ui/button";
import { DailyRewards } from "@/components/DailyRewards";
import { StreakTracker } from "@/components/gamification/StreakTracker";
import { BadgeShowcase } from "@/components/gamification/BadgeShowcase";
import { Leaderboard } from "@/components/gamification/Leaderboard";
import { ChallengeSystem } from "@/components/gamification/ChallengeSystem";
import { Skeleton } from "@/components/ui/skeleton";
import { PlantCareTips } from "@/components/PlantCareTips";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [identifiedPlant, setIdentifiedPlant] = useState<any>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [showGamification, setShowGamification] = useState(false);

  const subscriptions = [
    {
      title: "Free",
      price: "$0/month",
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
      price: "$9.99/month",
      description: "For plant enthusiasts",
      features: [
        { text: "Unlimited identifications", included: true },
        { text: "Detailed care guides", included: true },
        { text: "Plant collection library", included: true },
        { text: "Offline mode", included: true },
        { text: "Ad-free experience", included: true },
      ],
      variant: "pro" as const,
      popular: true,
      onSelect: () => navigate("/pro"),
    },
    {
      title: "Premium",
      price: "$19.99/month",
      description: "For professionals",
      features: [
        { text: "Everything in Pro", included: true },
        { text: "Expert consultation", included: true },
        { text: "Disease identification", included: true },
        { text: "Priority support", included: true },
        { text: "Family sharing (up to 5)", included: true },
      ],
      variant: "premium" as const,
      onSelect: () => navigate("/premium"),
    },
  ];

  const handleTryFreeClick = () => {
    setShowUpload(true);
    setShowGamification(true);
    setTimeout(() => {
      const uploadSection = document.getElementById('upload-section');
      if (uploadSection) {
        uploadSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleUploadSuccess = (plantData: any) => {
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
      
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="flex justify-center mb-8">
          <Leaf className="h-16 w-16 text-[#00B388] animate-float" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#2A3B1D]">
          Identify Any Plant in Seconds
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Our AI-powered plant identification app helps you discover and learn about
          the flora around you. Simply snap a photo and get instant, accurate results.
        </p>

        <div className="flex gap-4 justify-center mb-16">
          <Button 
            onClick={handleTryFreeClick}
            className="bg-[#00B388] hover:bg-[#00B388]/90 text-white px-8 py-6"
          >
            Try For Free
          </Button>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[#2A3B1D]">
            Daily Plant Care Tips
          </h2>
          <PlantCareTips />
        </div>

        {showUpload && (
          <div id="upload-section" className="scroll-mt-8">
            <GamificationSection showGamification={showGamification} />
            <DailyRewards />
            <PlantUpload onUploadSuccess={handleUploadSuccess} />
          </div>
        )}

        {identifiedPlant && <PlantResults plant={identifiedPlant} />}

        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[#2A3B1D]">
          Choose Your Plan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {subscriptions.map((sub) => (
            <SubscriptionCard key={sub.title} {...sub} />
          ))}
        </div>
      </div>

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
  );
};

export default Index;
