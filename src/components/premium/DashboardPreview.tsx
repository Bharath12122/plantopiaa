import { BarChart, LineChart, Calendar as CalendarIcon, Leaf } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const DashboardPreview = () => {
  const features = [
    {
      icon: <BarChart className="w-12 h-12 text-[#9b87f5]" />,
      title: "Business Analytics",
      description: "Track your growth and performance",
    },
    {
      icon: <LineChart className="w-12 h-12 text-[#9b87f5]" />,
      title: "Yield Forecasting",
      description: "AI-powered growth predictions",
    },
    {
      icon: <CalendarIcon className="w-12 h-12 text-[#9b87f5]" />,
      title: "Care Schedules",
      description: "Automated maintenance planning",
    },
    {
      icon: <Leaf className="w-12 h-12 text-[#9b87f5]" />,
      title: "Growth Insights",
      description: "Advanced plant care recommendations",
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent">
          Premium Dashboard Preview
        </h2>
        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            {features.map((feature, index) => (
              <CarouselItem key={index}>
                <Card className="p-6 hover:shadow-xl transition-all duration-300 bg-white/50 backdrop-blur-sm border-[#9b87f5]/20">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold mb-2 text-[#9b87f5]">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};