import { Leaf, Sun, Droplet, Upload, HelpCircle } from "lucide-react";
import { SubscriptionCard } from "@/components/SubscriptionCard";
import { ChatbotTrigger } from "@/components/ChatbotTrigger";
import { LogoutButton } from "@/components/LogoutButton";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [identifiedPlant, setIdentifiedPlant] = useState<any>(null);
  
  const subscriptions = [
    {
      title: "Free",
      price: "$0/month",
      description: "Perfect for plant enthusiasts starting their journey",
      features: [
        { text: "Basic plant identification", included: true },
        { text: "General care tips", included: true },
        { text: "Community access", included: true },
        { text: "Medicinal plant details", included: false },
        { text: "Expert consultation", included: false },
      ],
      variant: "free" as const,
    },
    {
      title: "Pro",
      price: "$9.99/month",
      description: "For medicinal plant enthusiasts",
      features: [
        { text: "All Free features", included: true },
        { text: "Medicinal plant identification", included: true },
        { text: "Detailed growing guides", included: true },
        { text: "Personalized care schedules", included: true },
        { text: "Expert consultation", included: false },
      ],
      variant: "pro" as const,
      popular: true,
      onSelect: () => navigate("/pro"),
    },
    {
      title: "Premium",
      price: "$29.99/month",
      description: "For professional plant growers",
      features: [
        { text: "All Pro features", included: true },
        { text: "1-on-1 video consultation", included: true },
        { text: "Business growth tips", included: true },
        { text: "Climate analysis", included: true },
        { text: "Priority support", included: true },
      ],
      variant: "premium" as const,
      onSelect: () => navigate("/premium"),
    },
  ];

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('plant-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Simulate plant identification (in a real app, this would call an AI service)
      setIdentifiedPlant({
        name: "Monstera Deliciosa",
        careTips: [
          "Water when top soil is dry",
          "Indirect bright light",
          "High humidity preferred",
        ],
        image: URL.createObjectURL(file)
      });

      toast({
        title: "Plant identified successfully!",
        description: "Scroll down to see the results.",
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-plant-free">
      <LogoutButton />
      
      {/* Hero Section */}
      <div className="container pt-20 pb-16 text-center">
        <div className="flex justify-center mb-8">
          <Leaf className="h-16 w-16 text-plant-premium animate-float" />
        </div>
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
          Plant Care Assistant
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Your AI-powered companion for plant identification, care, and growth
        </p>

        {/* Upload Section */}
        <div className="max-w-md mx-auto mb-16 p-6 bg-white rounded-lg shadow-lg animate-fade-in">
          <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
          <p className="text-gray-600 mb-4">Upload a photo of your plant for instant identification</p>
          <div className="relative">
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              id="plant-upload"
              disabled={isUploading}
            />
            <Button
              asChild
              className="w-full bg-green-500 hover:bg-green-600"
              disabled={isUploading}
            >
              <label htmlFor="plant-upload" className="cursor-pointer">
                <Upload className="mr-2" />
                {isUploading ? "Uploading..." : "Upload Plant Image"}
              </label>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <Sun className="h-8 w-8 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Smart Care Tips</h3>
            <p className="text-gray-600">Get personalized care recommendations</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <Droplet className="h-8 w-8 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Watering Guide</h3>
            <p className="text-gray-600">Learn optimal watering schedules</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <Leaf className="h-8 w-8 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Plant ID</h3>
            <p className="text-gray-600">Instant plant identification</p>
          </div>
        </div>

        {/* Identified Plant Results */}
        {identifiedPlant && (
          <div className="max-w-2xl mx-auto mb-16 p-6 bg-white rounded-lg shadow-lg animate-fade-in">
            <h2 className="text-2xl font-semibold mb-4">Your Plant</h2>
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={identifiedPlant.image}
                alt={identifiedPlant.name}
                className="w-full md:w-1/2 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">{identifiedPlant.name}</h3>
                <h4 className="text-lg font-medium mb-2">Care Tips:</h4>
                <ul className="list-disc list-inside text-gray-600">
                  {identifiedPlant.careTips.map((tip: string, index: number) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Subscription Cards */}
        <h2 className="text-3xl font-bold mb-8">Choose Your Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {subscriptions.map((sub) => (
            <SubscriptionCard key={sub.title} {...sub} />
          ))}
        </div>
      </div>

      {/* Help Button */}
      <button
        className="fixed bottom-8 right-8 p-4 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
        onClick={() => toast({
          title: "Need Help?",
          description: "Our support team is here to assist you!",
        })}
      >
        <HelpCircle className="h-6 w-6 text-green-500" />
      </button>

      {/* Chatbot Trigger */}
      <ChatbotTrigger />
    </div>
  );
};

export default Index;