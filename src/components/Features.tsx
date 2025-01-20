import { Sun, Droplet, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

export const Features = () => {
  const features = [
    {
      icon: Sun,
      title: "Smart Care Tips",
      description: "Get personalized care recommendations",
      delay: 0,
    },
    {
      icon: Droplet,
      title: "Watering Guide",
      description: "Learn optimal watering schedules",
      delay: 100,
    },
    {
      icon: Leaf,
      title: "Plant ID",
      description: "Instant plant identification",
      delay: 200,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      {features.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <div
            key={index}
            className={cn(
              "p-6 bg-white rounded-lg shadow-md",
              "transform transition-all duration-300",
              "hover:shadow-lg hover:scale-105",
              "animate-fade-in"
            )}
            style={{
              animationDelay: `${feature.delay}ms`,
            }}
          >
            <Icon className="h-8 w-8 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        );
      })}
    </div>
  );
};