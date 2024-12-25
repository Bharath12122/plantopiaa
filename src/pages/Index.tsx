import { Leaf, HelpCircle, Camera, Sprout, Star } from "lucide-react";
import { SubscriptionCard } from "@/components/SubscriptionCard";
import { ChatbotTrigger } from "@/components/ChatbotTrigger";
import { LogoutButton } from "@/components/LogoutButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { PlantUpload } from "@/components/PlantUpload";
import { PlantResults } from "@/components/PlantResults";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [identifiedPlant, setIdentifiedPlant] = useState<any>(null);
  
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

  return (
    <div className="min-h-screen bg-[#F2FCE2]">
      <LogoutButton />
      
      <div className="container pt-20 pb-16 text-center">
        <div className="flex justify-center mb-8">
          <Leaf className="h-16 w-16 text-[#00B388] animate-float" />
        </div>
        <h1 className="text-5xl font-bold mb-6 text-[#2A3B1D]">
          Identify Any Plant in Seconds
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Our AI-powered plant identification app helps you discover and learn about
          the flora around you. Simply snap a photo and get instant, accurate results.
        </p>

        <div className="flex gap-4 justify-center mb-16">
          <Button 
            onClick={() => document.getElementById('plant-upload')?.click()}
            className="bg-[#00B388] hover:bg-[#00B388]/90 text-white px-8 py-6"
          >
            Try For Free
          </Button>
          <Button 
            variant="outline"
            className="border-[#00B388] text-[#00B388] hover:bg-[#00B388]/10"
            onClick={() => toast({ title: "Demo coming soon!" })}
          >
            Watch Demo
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-6 bg-white/80 backdrop-blur rounded-lg shadow-md hover:shadow-lg transition-all">
            <div className="bg-[#E8F5E9] p-4 rounded-full w-16 h-16 mx-auto mb-4">
              <Camera className="h-8 w-8 text-[#00B388]" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-[#2A3B1D]">Instant Recognition</h3>
            <p className="text-gray-600">Accurate plant identification in seconds using our advanced AI technology</p>
          </div>
          <div className="p-6 bg-white/80 backdrop-blur rounded-lg shadow-md hover:shadow-lg transition-all">
            <div className="bg-[#E8F5E9] p-4 rounded-full w-16 h-16 mx-auto mb-4">
              <Sprout className="h-8 w-8 text-[#00B388]" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-[#2A3B1D]">Care Guides</h3>
            <p className="text-gray-600">Detailed care instructions for every identified plant</p>
          </div>
          <div className="p-6 bg-white/80 backdrop-blur rounded-lg shadow-md hover:shadow-lg transition-all">
            <div className="bg-[#E8F5E9] p-4 rounded-full w-16 h-16 mx-auto mb-4">
              <Star className="h-8 w-8 text-[#00B388]" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-[#2A3B1D]">Plant Collection</h3>
            <p className="text-gray-600">Build your personal plant library and track their growth</p>
          </div>
        </div>

        <div id="plant-upload" className="hidden">
          <PlantUpload onUploadSuccess={setIdentifiedPlant} />
        </div>

        {identifiedPlant && <PlantResults plant={identifiedPlant} />}

        <h2 className="text-3xl font-bold mb-8 text-[#2A3B1D]">
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
        <HelpCircle className="h-6 w-6 text-[#00B388] group-hover:text-[#00B388]/80 transition-colors" />
      </button>

      <ChatbotTrigger />
    </div>
  );
};

export default Index;