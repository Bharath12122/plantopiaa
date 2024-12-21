import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Leaf, Book, Video, Calendar, Shield, Star } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ProFeatures = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
      }
    };
    checkSession();
  }, [navigate]);

  const handleUpgrade = () => {
    toast({
      title: "Coming Soon",
      description: "Pro version upgrade will be available soon!",
      duration: 3000,
    });
  };

  const features = [
    {
      icon: <Leaf className="w-12 h-12 text-plant-pro" />,
      title: "Advanced Plant Identification",
      description: "Detailed medicinal plant analysis with comprehensive insights",
    },
    {
      icon: <Book className="w-12 h-12 text-plant-pro" />,
      title: "Educational Resources",
      description: "Access to exclusive articles, videos, and step-by-step guides",
    },
    {
      icon: <Video className="w-12 h-12 text-plant-pro" />,
      title: "Expert Consultation",
      description: "One-on-one video consultations with plant experts",
    },
    {
      icon: <Calendar className="w-12 h-12 text-plant-pro" />,
      title: "Personalized Care Schedules",
      description: "Custom watering and care schedules for your plants",
    },
    {
      icon: <Shield className="w-12 h-12 text-plant-pro" />,
      title: "Disease Detection",
      description: "Early detection and treatment recommendations",
    },
    {
      icon: <Star className="w-12 h-12 text-plant-pro" />,
      title: "Business Guidance",
      description: "Professional advice for plant-based businesses",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-plant-free">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-plant-pro to-plant-pro-dark bg-clip-text text-transparent">
            Upgrade to Pro
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Unlock advanced features and expert knowledge to take your plant journey to the next level
          </p>
          <Button
            onClick={handleUpgrade}
            className="mt-8 bg-gradient-to-r from-plant-pro to-plant-pro-dark text-white hover:opacity-90 transform hover:scale-105 transition-all duration-300"
            size="lg"
          >
            Upgrade Now
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 animate-float">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">What Pro Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-6 bg-white/80 backdrop-blur-sm">
                <p className="text-gray-600 italic mb-4">
                  "The Pro version has transformed my understanding of medicinal plants. The expert
                  guidance is invaluable!"
                </p>
                <p className="font-semibold text-gray-800">- Plant Enthusiast {i}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProFeatures;