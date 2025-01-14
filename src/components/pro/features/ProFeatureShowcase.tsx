import { Leaf, Droplet, FileText, Bug, Beaker, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const ProFeatureShowcase = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Leaf className="w-12 h-12 text-[#9b87f5]" />,
      title: "Advanced Plant Identification",
      description: "Detailed medicinal plant analysis with comprehensive insights",
    },
    {
      icon: <Beaker className="w-12 h-12 text-[#9b87f5]" />,
      title: "Treatment Applications",
      description: "Explore medicinal properties and practical applications",
    },
    {
      icon: <Calendar className="w-12 h-12 text-[#9b87f5]" />,
      title: "Growth Tips",
      description: "Tailored advice on optimal temperature and care schedules",
    },
    {
      icon: <Bug className="w-12 h-12 text-[#9b87f5]" />,
      title: "Disease Detection",
      description: "Early identification of plant diseases and pests",
    },
    {
      icon: <FileText className="w-12 h-12 text-[#9b87f5]" />,
      title: "Detailed Reports",
      description: "Comprehensive analysis of plant health and growth",
    },
    {
      icon: <Droplet className="w-12 h-12 text-[#9b87f5]" />,
      title: "Watering Schedule",
      description: "Smart reminders for optimal plant care",
    },
  ];

  return (
    <section className="py-16 bg-[#1A1F2C]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">
          Pro Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 bg-[#1A1F2C] border-[#9b87f5]/20 cursor-pointer"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button
            onClick={() => navigate("/pro/onboarding")}
            className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white px-8 py-6 text-xl font-semibold rounded-xl transition-all duration-300"
          >
            Join Pro Today
          </Button>
        </div>
      </div>
    </section>
  );
};