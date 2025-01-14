import { Shield, Leaf, Book, Wifi, MessageSquare, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useProStatus } from "@/hooks/useProStatus";

const features = [
  {
    icon: <Shield className="w-12 h-12 text-[#9b87f5]" />,
    title: "Premium Protection",
    description: "Advanced plant disease detection and prevention strategies",
  },
  {
    icon: <Leaf className="w-12 h-12 text-[#9b87f5]" />,
    title: "Expert Plant Care",
    description: "Personalized care schedules and growth tracking",
  },
  {
    icon: <Book className="w-12 h-12 text-[#9b87f5]" />,
    title: "Extensive Library",
    description: "Access to our complete medicinal plant database",
  },
  {
    icon: <Wifi className="w-12 h-12 text-[#9b87f5]" />,
    title: "Offline Access",
    description: "Full functionality even without internet connection",
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
  },
];

export const ProFeatureShowcase = () => {
  const { isPro } = useProStatus();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <h2 className="text-4xl font-bold text-center text-white mb-12">
        {isPro ? "Your Pro Features" : "Premium Features"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 bg-[#1A1F2C] border-[#9b87f5]/20"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div>{feature.icon}</div>
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