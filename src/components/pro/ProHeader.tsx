import { ArrowRight } from "lucide-react";

export const ProHeader = () => {
  return (
    <div className="text-center space-y-8">
      <div className="bg-[#1A1F2C] py-2 px-4 rounded-full inline-flex items-center">
        <span className="text-[#9b87f5] text-sm font-medium">✨ SPECIAL OFFER: LIMITED TIME PRO ACCESS</span>
      </div>
      <div className="space-y-6">
        <h1 className="text-5xl md:text-7xl font-bold text-white">
          Hand-Picked <span className="text-[#9b87f5]">Plant Insights</span>
        </h1>
        <h2 className="text-4xl md:text-6xl font-bold text-white">
          To Enhance Your Garden
        </h2>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          #1 Database of Medicinal Plants | Save 100+ hours of research and cultivation time
        </p>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button className="bg-[#9b87f5] text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-[#7E69AB] transition-all flex items-center gap-2 w-full sm:w-auto">
          Get Pro Access <ArrowRight className="w-6 h-6" />
        </button>
      </div>
      <p className="text-gray-400">
        Over 1,000+ plant enthusiasts trust our database. Try it out{" "}
        <span className="text-[#9b87f5] cursor-pointer">here</span>
      </p>
    </div>
  );
};