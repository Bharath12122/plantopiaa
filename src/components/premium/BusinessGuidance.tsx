import { Tools, Thermometer, Sprout } from "lucide-react";
import { Card } from "@/components/ui/card";

export const BusinessGuidance = () => {
  const features = [
    {
      icon: <Tools className="w-12 h-12 text-[#9b87f5]" />,
      title: "Tools & Accessories",
      description: "Get personalized recommendations for professional equipment",
    },
    {
      icon: <Thermometer className="w-12 h-12 text-[#9b87f5]" />,
      title: "Temperature Control",
      description: "Advanced climate management solutions",
    },
    {
      icon: <Sprout className="w-12 h-12 text-[#9b87f5]" />,
      title: "Growth Optimization",
      description: "Expert soil and fertilization guidance",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-white to-[#9b87f5]/5">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent">
          Personalized Business Guidance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white/50 backdrop-blur-sm border-[#9b87f5]/20"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 transform transition-transform group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#9b87f5]">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};