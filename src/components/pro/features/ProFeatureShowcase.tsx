import { Leaf, Droplet, FileText, Bug, Beaker, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const ProFeatureShowcase = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Leaf className="h-8 w-8 text-[#9b87f5]" />,
      title: "Advanced Plant Recognition",
      description: "Get detailed insights about any plant with our enhanced AI recognition system"
    },
    {
      icon: <Droplet className="h-8 w-8 text-[#9b87f5]" />,
      title: "Care Instructions",
      description: "Receive personalized care instructions for optimal plant growth"
    },
    {
      icon: <FileText className="h-8 w-8 text-[#9b87f5]" />,
      title: "Detailed Reports",
      description: "Access comprehensive reports about plant health and growth patterns"
    },
    {
      icon: <Bug className="h-8 w-8 text-[#9b87f5]" />,
      title: "Disease Detection",
      description: "Early detection of plant diseases and treatment recommendations"
    },
    {
      icon: <Beaker className="h-8 w-8 text-[#9b87f5]" />,
      title: "Scientific Analysis",
      description: "In-depth scientific analysis of plant properties and characteristics"
    },
    {
      icon: <Calendar className="h-8 w-8 text-[#9b87f5]" />,
      title: "Growth Tracking",
      description: "Monitor and track your plants' growth progress over time"
    }
  ];

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">
          Pro Features
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Unlock the full potential of plant identification and care with our professional tools
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card 
            key={index}
            className="p-6 bg-[#1A1F2C] border-[#9b87f5]/20 hover:border-[#9b87f5]/40 transition-all duration-300"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-3 bg-[#9b87f5]/10 rounded-full">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white">
                {feature.title}
              </h3>
              <p className="text-gray-400">
                {feature.description}
              </p>
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <Button
          onClick={() => navigate("/pro/landing")}
          className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white px-8 py-6 rounded-lg text-lg"
        >
          Explore All Pro Features
        </Button>
      </div>
    </section>
  );
};