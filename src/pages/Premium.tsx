import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Video, Calendar, Shield, MessageSquare, Crown, Gem, Star } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { BusinessGuidance } from "@/components/premium/BusinessGuidance";
import { ConsultationSection } from "@/components/premium/ConsultationSection";
import { DashboardPreview } from "@/components/premium/DashboardPreview";

const Premium = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const features = [
    {
      icon: <Crown className="w-12 h-12 text-[#9b87f5]" />,
      title: "1-on-1 Consultation",
      description: "Personal video consultations with plant experts",
    },
    {
      icon: <Star className="w-12 h-12 text-[#9b87f5]" />,
      title: "Business Guidance",
      description: "Expert advice on growing your plant business",
    },
    {
      icon: <Gem className="w-12 h-12 text-[#9b87f5]" />,
      title: "Priority Support",
      description: "24/7 access to expert assistance",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Plant Nursery Owner",
      content: "The Premium features transformed my small nursery into a thriving business. The expert consultations are invaluable!",
    },
    {
      name: "Michael Chen",
      role: "Medicinal Plant Cultivator",
      content: "The advanced climate control and disease prevention features helped me optimize my growing conditions significantly.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-[#9b87f5]/5">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent">
            Premium Business Solutions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Elevate your plant business with exclusive features and personalized support
          </p>
        </div>

        <BusinessGuidance />
        <ConsultationSection />
        <DashboardPreview />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="p-6 hover:shadow-xl transition-all duration-300 border-[#9b87f5]/20 hover:scale-105 bg-white/50 backdrop-blur-sm group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 transform transition-transform group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mt-4 mb-2 text-[#9b87f5] group-hover:text-[#7E69AB] transition-colors">
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
                className="p-6 hover:shadow-xl transition-all duration-300 border-[#9b87f5]/20 hover:scale-105 bg-white/50 backdrop-blur-sm"
              >
                <div className="flex flex-col">
                  <p className="text-gray-600 italic mb-4">{testimonial.content}</p>
                  <div>
                    <p className="font-semibold text-[#9b87f5]">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center mb-16">
          <Button 
            className="bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:opacity-90 text-white px-8 py-6 text-lg rounded-lg transition-all duration-300 hover:shadow-lg"
            onClick={() => {
              toast({
                title: "Coming Soon!",
                description: "Premium subscriptions will be available shortly.",
              });
            }}
          >
            Join Premium Today
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Premium;