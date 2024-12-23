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
    <section className="grid md:grid-cols-2 gap-12 items-center relative">
      <div className="space-y-8">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent leading-tight">
          One-on-One Expert Consultations
        </h2>
        <div className="space-y-6">
          <div className="flex items-center space-x-6 bg-white/5 p-6 rounded-xl backdrop-blur-sm border border-white/10 hover:border-[#9b87f5]/30 transition-colors duration-300 group">
            <Video className="w-10 h-10 text-[#9b87f5] group-hover:scale-110 transition-transform duration-300" />
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Live Video Consultations</h3>
              <p className="text-gray-400">Connect with plant experts in real-time for personalized guidance</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6 bg-white/5 p-6 rounded-xl backdrop-blur-sm border border-white/10 hover:border-[#9b87f5]/30 transition-colors duration-300 group">
            <Calendar className="w-10 h-10 text-[#9b87f5] group-hover:scale-110 transition-transform duration-300" />
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Flexible Scheduling</h3>
              <p className="text-gray-400">Book sessions at your convenience with our easy scheduling system</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6 bg-white/5 p-6 rounded-xl backdrop-blur-sm border border-white/10 hover:border-[#9b87f5]/30 transition-colors duration-300 group">
            <MessageSquare className="w-10 h-10 text-[#9b87f5] group-hover:scale-110 transition-transform duration-300" />
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Growth Strategies</h3>
              <p className="text-gray-400">Get personalized advice to optimize your plant business growth</p>
            </div>
          </div>
          
          <Button
            onClick={handleBooking}
            className="w-full md:w-auto bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:opacity-90 text-white px-8 py-6 text-lg rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(155,135,245,0.5)]"
          >
            Book a Consultation
          </Button>
        </div>
      </div>
      
      <Card className="p-8 bg-white/5 backdrop-blur-sm border-[#9b87f5]/20 relative group overflow-hidden rounded-2xl">
        <div className="aspect-video rounded-xl bg-gradient-to-br from-[#9b87f5]/20 to-[#7E69AB]/20 flex items-center justify-center overflow-hidden relative">
          <Video className="w-20 h-20 text-[#9b87f5] transition-all duration-700 group-hover:scale-110 group-hover:rotate-12" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#9b87f5]/10 to-[#7E69AB]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          {/* Decorative elements */}
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#9b87f5] rounded-full filter blur-[128px] opacity-30 group-hover:opacity-50 transition-opacity duration-700" />
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-[#7E69AB] rounded-full filter blur-[128px] opacity-30 group-hover:opacity-50 transition-opacity duration-700" />
        </div>
      </Card>
    </section>
  );
};