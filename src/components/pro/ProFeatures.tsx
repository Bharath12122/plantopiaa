import { Card } from "@/components/ui/card";
import { Leaf, Book, Calendar, Shield } from "lucide-react";

const features = [
  {
    icon: <Leaf className="w-12 h-12 text-[#a2d96e]" />,
    title: "Advanced Plant Identification",
    description: "Detailed medicinal plant analysis with comprehensive insights",
  },
  {
    icon: <Book className="w-12 h-12 text-[#a2d96e]" />,
    title: "Treatment Applications",
    description: "Explore medicinal properties and practical applications",
  },
  {
    icon: <Calendar className="w-12 h-12 text-[#a2d96e]" />,
    title: "Growth Tips",
    description: "Tailored advice on optimal temperature and care schedules",
  },
  {
    icon: <Shield className="w-12 h-12 text-[#a2d96e]" />,
    title: "Personalized Care",
    description: "Custom recommendations based on your environment",
  }
];

export const ProFeatures = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
      {features.map((feature, index) => (
        <Card
          key={index}
          className="p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 bg-[#1C1C1C] border-[#a2d96e]/20"
        >
          <div className="flex flex-col items-center text-center">
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};