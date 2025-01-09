import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Home Gardener",
    content: "The Pro version has completely transformed how I care for my plants. The detailed guides are invaluable!",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Plant Enthusiast",
    content: "Being able to identify unlimited plants has helped me expand my knowledge tremendously. Worth every penny!",
    rating: 5,
  },
  {
    name: "Emma Davis",
    role: "Urban Farmer",
    content: "The offline mode is perfect for when I'm in the garden. Pro features make plant care so much easier.",
    rating: 5,
  },
];

export const ProLandingTestimonials = () => {
  return (
    <div className="mb-20">
      <h2 className="text-4xl font-bold text-center mb-12 text-white">
        What Our Pro Users Say
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <Card
            key={index}
            className="p-6 bg-[#1A1F2C] border-[#9b87f5]/20 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex gap-1 mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-[#9b87f5] text-[#9b87f5]"
                />
              ))}
            </div>
            <p className="text-gray-400 mb-4">{testimonial.content}</p>
            <div>
              <p className="font-semibold text-white">{testimonial.name}</p>
              <p className="text-sm text-gray-400">{testimonial.role}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};