import { Leaf, Search, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export const AdvancedIdentification = () => {
  const { toast } = useToast();

  return (
    <section className="grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h2 className="text-3xl font-bold mb-6 text-[#2A3B1D]">
          Advanced Plant Identification
        </h2>
        <div className="space-y-6">
          <Card className="flex items-center space-x-4 p-6 bg-white/90 border-[#2A3B1D]/10 hover:border-[#2A3B1D]/30 transition-colors duration-300 group rounded-xl">
            <Search className="w-8 h-8 text-[#2A3B1D] group-hover:scale-110 transition-transform duration-300" />
            <p className="text-[#2A3B1D]/90">Identify rare and medicinal plants</p>
          </Card>
          <Card className="flex items-center space-x-4 p-6 bg-white/90 border-[#2A3B1D]/10 hover:border-[#2A3B1D]/30 transition-colors duration-300 group rounded-xl">
            <FileText className="w-8 h-8 text-[#2A3B1D] group-hover:scale-110 transition-transform duration-300" />
            <p className="text-[#2A3B1D]/90">Detailed plant history and properties</p>
          </Card>
          <Card className="flex items-center space-x-4 p-6 bg-white/90 border-[#2A3B1D]/10 hover:border-[#2A3B1D]/30 transition-colors duration-300 group rounded-xl">
            <Leaf className="w-8 h-8 text-[#2A3B1D] group-hover:scale-110 transition-transform duration-300" />
            <p className="text-[#2A3B1D]/90">Personalized care recommendations</p>
          </Card>
          <Button
            onClick={() => {
              toast({
                title: "Coming Soon!",
                description: "Advanced identification features will be available shortly.",
              });
            }}
            className="w-full md:w-auto bg-[#2A3B1D] hover:bg-[#2A3B1D]/90 text-white px-8 py-6 text-lg rounded-xl transition-all duration-300 hover:scale-105"
          >
            Try Advanced ID
          </Button>
        </div>
      </div>
      <Card className="p-6 bg-white/90 border-[#2A3B1D]/10 rounded-2xl">
        <div className="aspect-video rounded-lg bg-[#F2FCE2] flex items-center justify-center">
          <Leaf className="w-16 h-16 text-[#2A3B1D] animate-pulse" />
        </div>
      </Card>
    </section>
  );
};