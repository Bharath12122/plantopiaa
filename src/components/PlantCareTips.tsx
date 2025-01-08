import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const tips = [
  {
    title: "Water Wisely",
    content: "Most plants prefer to be slightly dry rather than overwatered. Check soil moisture before watering."
  },
  {
    title: "Light Matters",
    content: "Pay attention to your plant's light needs. Most indoor plants prefer bright, indirect sunlight."
  },
  {
    title: "Regular Cleaning",
    content: "Dust your plant's leaves regularly to help them photosynthesize better."
  },
  {
    title: "Humidity Helps",
    content: "Many indoor plants love humidity. Consider grouping plants or using a pebble tray."
  }
];

export const PlantCareTips = () => {
  const [currentTip, setCurrentTip] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % tips.length);
  };

  const prevTip = () => {
    setCurrentTip((prev) => (prev - 1 + tips.length) % tips.length);
  };

  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      nextTip();
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <Card
        className="relative overflow-hidden bg-white rounded-xl shadow-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="p-8">
          <div className="transition-all duration-500 ease-in-out">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              {tips[currentTip].title}
            </h3>
            <p className="text-gray-600 text-lg">
              {tips[currentTip].content}
            </p>
          </div>
        </div>

        <button
          onClick={prevTip}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-plant-free hover:bg-plant-pro text-plant-pro hover:text-white transition-colors"
          aria-label="Previous tip"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          onClick={nextTip}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-plant-free hover:bg-plant-pro text-plant-pro hover:text-white transition-colors"
          aria-label="Next tip"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {tips.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTip(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                currentTip === index
                  ? "bg-plant-pro w-4"
                  : "bg-plant-free hover:bg-plant-pro/50"
              )}
              aria-label={`Go to tip ${index + 1}`}
            />
          ))}
        </div>
      </Card>
    </div>
  );
};