import { Video, Calendar, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

export const ConsultationSection = () => {
  const { toast } = useToast();

  const handleBooking = () => {
    toast({
      title: "Coming Soon!",
      description: "Video consultations will be available shortly.",
    });
  };

  return (
    <section className="py-16 bg-[#F2FCE2]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#2A3B1D]">
          One-on-One Expert Consultations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <Video className="w-8 h-8 text-[#2A3B1D]" />
              <p className="text-[#2A3B1D]/90">Live video consultations with experts</p>
            </div>
            <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <Calendar className="w-8 h-8 text-[#2A3B1D]" />
              <p className="text-[#2A3B1D]/90">Flexible scheduling options</p>
            </div>
            <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <MessageSquare className="w-8 h-8 text-[#2A3B1D]" />
              <p className="text-[#2A3B1D]/90">Personalized growth strategies</p>
            </div>
            <Button
              onClick={handleBooking}
              className="w-full md:w-auto bg-[#2A3B1D] hover:bg-[#2A3B1D]/90 text-white px-8 py-6 text-lg rounded-xl transition-all duration-300 hover:scale-105"
            >
              Book a Consultation
            </Button>
          </div>
          <Card className="p-6 bg-white border-[#2A3B1D]/10 rounded-2xl">
            <div className="aspect-video rounded-lg bg-[#F2FCE2] flex items-center justify-center">
              <Video className="w-16 h-16 text-[#2A3B1D] animate-pulse" />
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};