import { ArrowRight } from "lucide-react";

export const ProHeader = () => {
  return (
    <div className="text-center mb-16">
      <div className="bg-[#1A1F2C] py-2 px-4 rounded-full inline-flex items-center mb-8">
        <span className="text-[#9b87f5] text-sm font-medium">✨ SPECIAL OFFER: LIMITED TIME PRO ACCESS</span>
      </div>
      <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
        Hand-Picked <span className="text-[#9b87f5]">Plant Insights</span>
      </h1>
      <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
        To Enhance Your Garden
      </h2>
      <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
        #1 Database of Medicinal Plants | Save 100+ hours of research and cultivation time
      </p>
      <div className="flex justify-center gap-4">
        <button className="bg-[#9b87f5] text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-[#7E69AB] transition-all flex items-center gap-2">
          Get Pro Access <ArrowRight className="w-6 h-6" />
        </button>
      </div>
      <p className="text-gray-400 mt-4">
        Over 1,000+ plant enthusiasts trust our database. Try it out{" "}
        <span className="text-[#9b87f5] cursor-pointer">here</span>
      </p>
    </div>
  );
};
