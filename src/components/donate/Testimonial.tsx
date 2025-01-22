import { Star } from "lucide-react";

interface TestimonialProps {
  quote: string;
  author: string;
}

export const Testimonial = ({ quote, author }: TestimonialProps) => (
  <div className="p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-[#00B388]/20">
    <Star className="w-6 h-6 text-[#9b87f5] mb-4" />
    <p className="text-gray-600 italic mb-4">{quote}</p>
    <p className="text-[#00B388] font-semibold">{author}</p>
  </div>
);