import React, { useState } from "react";
import { useProStatus } from "@/hooks/useProStatus";
import { PlantUpload } from "@/components/PlantUpload";
import { PlantResults } from "@/components/PlantResults";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ChatbotTrigger } from "@/components/ChatbotTrigger";
import { LogoutButton } from "@/components/LogoutButton";
import { Leaf, Camera, Book, Shield, Droplet } from "lucide-react";
import { Footer } from "@/components/Footer";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isPro } = useProStatus();
  const [identifiedPlant, setIdentifiedPlant] = useState<any>(null);

  const handleUploadSuccess = (plantData: any) => {
    setIdentifiedPlant(plantData);
    toast({
      title: "Plant identified successfully!",
      description: "Scroll down to see detailed results.",
    });
  };

  const premiumFeatures = [
    {
      icon: <Leaf className="w-12 h-12 text-[#00B388]" />,
      title: "Advanced Plant Identification",
      description: "Get detailed analysis of medicinal plants with comprehensive insights",
    },
    {
      icon: <Book className="w-12 h-12 text-[#00B388]" />,
      title: "Treatment Applications",
      description: "Explore medicinal properties and practical applications",
    },
    {
      icon: <Droplet className="w-12 h-12 text-[#00B388]" />,
      title: "Growth Tips",
      description: "Receive tailored advice on optimal temperature and care schedules",
    },
    {
      icon: <Shield className="w-12 h-12 text-[#00B388]" />,
      title: "Personalized Care",
      description: "Get custom recommendations based on your environment",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F2FCE2]">
      <LogoutButton />
      
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
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
        </div>

        {/* Upload Section */}
        <div className="mb-20">
          <PlantUpload onUploadSuccess={handleUploadSuccess} />
          {identifiedPlant && <PlantResults plant={identifiedPlant} />}
        </div>

        {/* Premium Features Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#2A3B1D]">
            Premium Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {premiumFeatures.map((feature, index) => (
              <Card
                key={index}
                className="p-8 hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-[#00B388]/20"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-[#2A3B1D]">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                  {!isPro && (
                    <Button
                      onClick={() => navigate("/pro")}
                      className="mt-4 bg-[#00B388] hover:bg-[#00B388]/90"
                    >
                      Upgrade to Pro
                    </Button>
                  )}
                </div>
              </Card>
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

      <Footer />
    </div>
  );
};

export default Index;