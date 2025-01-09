import { Infinity, Book, Wifi, Shield, Plant, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: <Infinity className="w-12 h-12 text-[#9b87f5]" />,
    title: "Unlimited Identifications",
    description: "Scan and identify as many plants as you want, anytime.",
  },
  {
    icon: <Book className="w-12 h-12 text-[#9b87f5]" />,
    title: "Advanced Care Guides",
    description: "Detailed, personalized care instructions for every plant.",
  },
  {
    icon: <Wifi className="w-12 h-12 text-[#9b87f5]" />,
    title: "Offline Mode",
    description: "Access your plant information even without internet.",
  },
  {
    icon: <Shield className="w-12 h-12 text-[#9b87f5]" />,
    title: "Ad-Free Experience",
    description: "Enjoy an uninterrupted, clean interface.",
  },
  {
    icon: <Plant className="w-12 h-12 text-[#9b87f5]" />,
    title: "Plant Collection",
    description: "Build and manage your personal plant database.",
  },
  {
    icon: <MessageSquare className="w-12 h-12 text-[#9b87f5]" />,
    title: "Priority Support",
    description: "Get help when you need it most.",
  },
];

export const ProLandingFeatures = () => {
  return (
    <div className="mb-20">
      <h2 className="text-4xl font-bold text-center mb-12 text-white">
        Everything You Need to Succeed
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 bg-[#1A1F2C] border-[#9b87f5]/20"
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};