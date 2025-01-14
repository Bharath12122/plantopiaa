import { Leaf, Droplet, FileText, Bug, Sprout, Calendar, Search, Heart, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface ProFeature {
  icon: JSX.Element;
  title: string;
  description: string;
  comingSoon?: boolean;
  route?: string;
}

export const ProFeatureShowcase = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const features: ProFeature[] = [
    {
      icon: <Search className="w-12 h-12 text-[#9b87f5]" />,
      title: "Advanced Plant Scanning",
      description: "Unlimited scans with detailed species identification and care instructions",
      route: "/scan"
    },
    {
      icon: <Heart className="w-12 h-12 text-[#9b87f5]" />,
      title: "Medicinal Properties",
      description: "Access comprehensive database of medicinal plants and their uses",
      route: "/medicinal"
    },
    {
      icon: <Droplet className="w-12 h-12 text-[#9b87f5]" />,
      title: "Smart Watering Schedule",
      description: "AI-powered watering recommendations based on plant species and conditions",
      route: "/schedule"
    },
    {
      icon: <Bug className="w-12 h-12 text-[#9b87f5]" />,
      title: "Disease Identification",
      description: "Early detection of plant diseases with treatment recommendations",
      comingSoon: true
    },
    {
      icon: <FileText className="w-12 h-12 text-[#9b87f5]" />,
      title: "Detailed Plant Reports",
      description: "Generate comprehensive reports on plant health and growth",
      route: "/reports"
    },
    {
      icon: <Calendar className="w-12 h-12 text-[#9b87f5]" />,
      title: "Care Calendar",
      description: "Personalized maintenance schedules for your entire plant collection",
      route: "/calendar"
    },
    {
      icon: <BookOpen className="w-12 h-12 text-[#9b87f5]" />,
      title: "Educational Resources",
      description: "Access to premium guides and video tutorials",
      route: "/education"
    },
    {
      icon: <Sprout className="w-12 h-12 text-[#9b87f5]" />,
      title: "Growth Tracking",
      description: "Monitor and analyze your plants' growth progress over time",
      route: "/growth"
    }
  ];

  const handleFeatureClick = (feature: ProFeature) => {
    if (feature.comingSoon) {
      toast({
        title: "Coming Soon!",
        description: `${feature.title} will be available shortly.`,
      });
      return;
    }

    if (feature.route) {
      navigate(feature.route);
    }
  };

  return (
    <section className="py-16 bg-[#1A1F2C]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">
          Pro Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 bg-[#1A1F2C] border-[#9b87f5]/20 cursor-pointer"
              onClick={() => handleFeatureClick(feature)}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  {feature.title}
                  {feature.comingSoon && (
                    <span className="ml-2 text-sm text-[#9b87f5]">(Coming Soon)</span>
                  )}
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