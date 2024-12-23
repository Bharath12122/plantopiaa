import { Video, Calendar, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

export const VideoConsultation = () => {
  const { toast } = useToast();

  const handleBooking = () => {
    toast({
      title: "Coming Soon!",
      description: "Video consultations will be available shortly.",
    });
  };

  return (
    <section className="grid md:grid-cols-2 gap-8 items-center relative">
      <div>
        <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent">
          One-on-One Expert Consultations
        </h2>
        <div className="space-y-6">
          <div className="flex items-center space-x-4 bg-white/5 p-4 rounded-lg backdrop-blur-sm">
            <Video className="w-8 h-8 text-[#9b87f5]" />
            <p className="text-gray-300">Live video consultations with experts</p>
          </div>
          <div className="flex items-center space-x-4 bg-white/5 p-4 rounded-lg backdrop-blur-sm">
            <Calendar className="w-8 h-8 text-[#9b87f5]" />
            <p className="text-gray-300">Flexible scheduling options</p>
          </div>
          <div className="flex items-center space-x-4 bg-white/5 p-4 rounded-lg backdrop-blur-sm">
            <MessageSquare className="w-8 h-8 text-[#9b87f5]" />
            <p className="text-gray-300">Personalized growth strategies</p>
          </div>
          <Button
            onClick={handleBooking}
            className="w-full md:w-auto bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:opacity-90 text-white hover:scale-105 transition-all duration-300"
          >
            Book a Consultation
          </Button>
        </div>
      </div>
      <Card className="p-6 bg-white/5 backdrop-blur-sm border-[#9b87f5]/20 relative group">
        <div className="aspect-video rounded-lg bg-gradient-to-br from-[#9b87f5]/20 to-[#7E69AB]/20 flex items-center justify-center overflow-hidden">
          <Video className="w-16 h-16 text-[#9b87f5] transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#9b87f5]/10 to-[#7E69AB]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </div>
      </Card>
    </section>
  );
};