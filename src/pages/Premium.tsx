import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Video, Calendar, Shield, MessageSquare, BarChart, Thermometer, Droplet, Heart, Crown, Gem, Star } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Premium = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const features = [
    {
      icon: <Crown className="w-12 h-12 text-[#9b87f5] animate-float" />,
      title: "1-on-1 Consultation",
      description: "Personal video consultations with plant experts",
    },
    {
      icon: <Star className="w-12 h-12 text-[#9b87f5] animate-float" />,
      title: "Business Guidance",
      description: "Expert advice on growing your plant business",
    },
    {
      icon: <Gem className="w-12 h-12 text-[#9b87f5] animate-float" />,
      title: "Temperature Management",
      description: "Advanced climate control recommendations",
    },
    {
      icon: <Droplet className="w-12 h-12 text-[#9b87f5] animate-float" />,
      title: "Smart Watering",
      description: "AI-powered watering schedules",
    },
    {
      icon: <Heart className="w-12 h-12 text-[#9b87f5] animate-float" />,
      title: "Preventative Care",
      description: "Early disease detection and prevention",
    },
    {
      icon: <Shield className="w-12 h-12 text-[#9b87f5] animate-float" />,
      title: "Priority Support",
      description: "24/7 access to expert assistance",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Plant Nursery Owner",
      content: "The Premium features transformed my small nursery into a thriving business. The expert consultations are invaluable!",
      avatar: "👩‍🌾",
    },
    {
      name: "Michael Chen",
      role: "Medicinal Plant Cultivator",
      content: "The advanced climate control and disease prevention features helped me optimize my growing conditions significantly.",
      avatar: "👨‍🌾",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9b87f5]/5 to-[#7E69AB]/5">
      <div className="container pt-8">
        <div className="text-center mb-16 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Crown className="w-16 h-16 text-[#9b87f5] animate-float" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent animate-fade-in">
            Premium Business Solutions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Elevate your plant business with exclusive features and personalized support
          </p>
          <div className="absolute w-64 h-64 bg-[#9b87f5]/10 rounded-full blur-3xl -z-10 top-0 left-1/2 -translate-x-1/2"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="p-6 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-[#9b87f5]/5 border-[#9b87f5]/20 backdrop-blur-sm hover:scale-105"
            >
              <div className="flex flex-col items-center text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#9b87f5]/5 rounded-full blur-2xl -z-10"></div>
                {feature.icon}
                <h3 className="text-xl font-semibold mt-4 mb-2 bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent">
            Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="p-6 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-[#9b87f5]/5 border-[#9b87f5]/20 backdrop-blur-sm"
              >
                <div className="flex flex-col relative">
                  <div className="absolute top-0 right-0 text-4xl animate-float">
                    {testimonial.avatar}
                  </div>
                  <p className="text-gray-600 italic mb-4 pr-12">"{testimonial.content}"</p>
                  <div className="mt-auto">
                    <p className="font-semibold bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center mb-16 relative">
          <div className="absolute w-96 h-96 bg-[#9b87f5]/10 rounded-full blur-3xl -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
          <Button 
            className="bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:opacity-90 text-white px-8 py-6 text-lg rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-[#9b87f5]/25 hover:shadow-xl relative overflow-hidden group"
            onClick={() => {
              toast({
                title: "Coming Soon!",
                description: "Premium subscriptions will be available shortly.",
              });
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Join Premium Today
              <Crown className="w-5 h-5" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Premium;