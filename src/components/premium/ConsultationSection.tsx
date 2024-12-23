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
    <section className="py-16 bg-[#1A1F2C]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">
          One-on-One Expert Consultations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Video className="w-8 h-8 text-[#9b87f5]" />
              <p className="text-gray-300">Live video consultations with experts</p>
            </div>
            <div className="flex items-center space-x-4">
              <Calendar className="w-8 h-8 text-[#9b87f5]" />
              <p className="text-gray-300">Flexible scheduling options</p>
            </div>
            <div className="flex items-center space-x-4">
              <MessageSquare className="w-8 h-8 text-[#9b87f5]" />
              <p className="text-gray-300">Personalized growth strategies</p>
            </div>
            <Button
              onClick={handleBooking}
              className="w-full md:w-auto bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:opacity-90 text-white"
            >
              Book a Consultation
            </Button>
          </div>
          <Card className="p-6 bg-white/5 backdrop-blur-sm border-[#9b87f5]/20">
            <div className="aspect-video rounded-lg bg-gradient-to-br from-[#9b87f5]/20 to-[#7E69AB]/20 flex items-center justify-center">
              <Video className="w-16 h-16 text-[#9b87f5] animate-pulse" />
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};