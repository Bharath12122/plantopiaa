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
    <section className="py-16 bg-gradient-to-b from-white to-[#E5DEFF]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent">
          One-on-One Expert Consultations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="flex items-center space-x-4 bg-white/80 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-[#9b87f5]/20">
              <div className="p-3 bg-[#9b87f5]/10 rounded-lg">
                <Video className="w-8 h-8 text-[#7E69AB]" />
              </div>
              <p className="text-gray-700 font-medium">Live video consultations with experts</p>
            </div>
            <div className="flex items-center space-x-4 bg-white/80 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-[#9b87f5]/20">
              <div className="p-3 bg-[#9b87f5]/10 rounded-lg">
                <Calendar className="w-8 h-8 text-[#7E69AB]" />
              </div>
              <p className="text-gray-700 font-medium">Flexible scheduling options</p>
            </div>
            <div className="flex items-center space-x-4 bg-white/80 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-[#9b87f5]/20">
              <div className="p-3 bg-[#9b87f5]/10 rounded-lg">
                <MessageSquare className="w-8 h-8 text-[#7E69AB]" />
              </div>
              <p className="text-gray-700 font-medium">Personalized growth strategies</p>
            </div>
            <Button
              onClick={handleBooking}
              className="w-full md:w-auto bg-[#9b87f5] hover:bg-[#7E69AB] text-white px-8 py-6 text-lg rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Book a Consultation
            </Button>
          </div>
          <Card className="p-8 bg-white/80 border-[#9b87f5]/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="aspect-video rounded-xl bg-gradient-to-br from-[#9b87f5]/10 to-[#E5DEFF] flex items-center justify-center">
              <Video className="w-16 h-16 text-[#9b87f5] animate-pulse" />
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};