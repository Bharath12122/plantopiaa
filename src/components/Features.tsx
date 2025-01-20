import { Sun, Droplet, Leaf, Infinity, Shield, Wifi, Book, Camera, Microscope, Heart, ChartLine, Database } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

export const Features = () => {
  const features = [
    {
      icon: Camera,
      title: "Unlimited Identifications",
      description: "Identify any plant, anytime, anywhere",
      delay: 0,
    },
    {
      icon: Book,
      title: "Medicinal Database",
      description: "Access detailed medicinal plant information",
      delay: 100,
    },
    {
      icon: Droplet,
      title: "Smart Watering",
      description: "Personalized watering schedules",
      delay: 200,
    },
    {
      icon: Shield,
      title: "Ad-Free Experience",
      description: "Clean, distraction-free interface",
      delay: 300,
    },
    {
      icon: Heart,
      title: "Priority Support",
      description: "Get help when you need it most",
      delay: 400,
    },
    {
      icon: Wifi,
      title: "Offline Mode",
      description: "Access your data without internet",
      delay: 500,
    },
    {
      icon: Database,
      title: "Plant Collection",
      description: "Build your personal plant library",
      delay: 600,
    },
    {
      icon: Microscope,
      title: "Disease Detection",
      description: "Early detection and treatment",
      delay: 700,
    },
    {
      icon: ChartLine,
      title: "Growth Tracking",
      description: "Monitor progress with analytics",
      delay: 800,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      {features.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <Card
            key={index}
            className={cn(
              "p-6 bg-white/50 backdrop-blur-sm",
              "transform transition-all duration-300",
              "hover:shadow-lg hover:scale-105",
              "animate-fade-in border-green-100"
            )}
            style={{
              animationDelay: `${feature.delay}ms`,
            }}
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 p-3 bg-green-50 rounded-full">
                <Icon className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          </Card>
        );
      })}
    </div>
  );
};