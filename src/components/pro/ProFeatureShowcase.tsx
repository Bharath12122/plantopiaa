import { Shield, Leaf, Book, Calendar, MessageSquare, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useProStatus } from "@/hooks/useProStatus";

const features = [
  {
    icon: <Shield className="w-12 h-12 text-[#9b87f5]" />,
    title: "Advanced Plant Identification",
    description: "Detailed medicinal plant analysis with comprehensive insights",
  },
  {
    icon: <Book className="w-12 h-12 text-[#9b87f5]" />,
    title: "Treatment Applications",
    description: "Explore medicinal properties and practical applications",
  },
  {
    icon: <Calendar className="w-12 h-12 text-[#9b87f5]" />,
    title: "Growth Tips",
    description: "Tailored advice on optimal temperature and care schedules",
  },
  {
    icon: <Shield className="w-12 h-12 text-[#9b87f5]" />,
    title: "Personalized Care",
    description: "Custom recommendations based on your environment",
  },
  {
    icon: <MessageSquare className="w-12 h-12 text-[#9b87f5]" />,
    title: "Priority Support",
    description: "24/7 access to our plant care experts",
  },
  {
    icon: <Award className="w-12 h-12 text-[#9b87f5]" />,
    title: "Exclusive Content",
    description: "Early access to new features and premium content",
  }
];

export const ProFeatureShowcase = () => {
  const { isPro } = useProStatus();

  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-bold text-center text-white">
        {isPro ? "Your Pro Features" : "Premium Features"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 bg-[#1A1F2C] border-[#9b87f5]/20"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="transform transition-transform hover:scale-110">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
              {isPro && (
                <span className="text-[#9b87f5] text-sm">Active</span>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};