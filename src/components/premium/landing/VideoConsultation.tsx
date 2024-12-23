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
    <section className="grid md:grid-cols-2 gap-12 items-center">
      <div className="space-y-8">
        <h2 className="text-3xl md:text-4xl font-bold text-[#2A3B1D] leading-tight">
          One-on-One Expert Consultations
        </h2>
        <div className="space-y-6">
          <Card className="p-6 bg-white/90 border-[#2A3B1D]/10 hover:border-[#2A3B1D]/30 transition-colors duration-300 group">
            <div className="flex items-center space-x-6">
              <Video className="w-10 h-10 text-[#2A3B1D] group-hover:scale-110 transition-transform duration-300" />
              <div>
                <h3 className="text-xl font-semibold text-[#2A3B1D] mb-2">Live Video Consultations</h3>
                <p className="text-[#2A3B1D]/70">Connect with plant experts in real-time for personalized guidance</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 bg-white/90 border-[#2A3B1D]/10 hover:border-[#2A3B1D]/30 transition-colors duration-300 group">
            <div className="flex items-center space-x-6">
              <Calendar className="w-10 h-10 text-[#2A3B1D] group-hover:scale-110 transition-transform duration-300" />
              <div>
                <h3 className="text-xl font-semibold text-[#2A3B1D] mb-2">Flexible Scheduling</h3>
                <p className="text-[#2A3B1D]/70">Book sessions at your convenience with our easy scheduling system</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 bg-white/90 border-[#2A3B1D]/10 hover:border-[#2A3B1D]/30 transition-colors duration-300 group">
            <div className="flex items-center space-x-6">
              <MessageSquare className="w-10 h-10 text-[#2A3B1D] group-hover:scale-110 transition-transform duration-300" />
              <div>
                <h3 className="text-xl font-semibold text-[#2A3B1D] mb-2">Growth Strategies</h3>
                <p className="text-[#2A3B1D]/70">Get personalized advice to optimize your plant business growth</p>
              </div>
            </div>
          </Card>
          
          <Button
            onClick={handleBooking}
            className="w-full md:w-auto bg-[#2A3B1D] hover:bg-[#2A3B1D]/90 text-white px-8 py-6 text-lg rounded-xl transition-all duration-300 hover:scale-105"
          >
            Book a Consultation
          </Button>
        </div>
      </div>
      
      <Card className="p-8 bg-white/90 border-[#2A3B1D]/10 relative group overflow-hidden rounded-2xl">
        <div className="aspect-video rounded-xl bg-[#F2FCE2] flex items-center justify-center overflow-hidden relative">
          <Video className="w-20 h-20 text-[#2A3B1D] transition-all duration-700 group-hover:scale-110 group-hover:rotate-12" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#2A3B1D]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </div>
      </Card>
    </section>
  );
};