import { Video, Calendar, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";

export const ConsultationFeatures = () => {
  return (
    <div className="space-y-6">
      <Card className="p-6 bg-white/80 border-[#2A3B1D]/20 hover:border-[#2A3B1D]/30 transition-colors duration-300 group">
        <div className="flex items-center space-x-6">
          <Video className="w-10 h-10 text-[#2A3B1D] group-hover:scale-110 transition-transform duration-300" />
          <div>
            <h3 className="text-xl font-semibold text-[#2A3B1D] mb-2">Live Video Consultations</h3>
            <p className="text-[#2A3B1D]/70">Connect with plant experts in real-time for personalized guidance</p>
          </div>
        </div>
      </Card>
      
      <Card className="p-6 bg-white/80 border-[#2A3B1D]/20 hover:border-[#2A3B1D]/30 transition-colors duration-300 group">
        <div className="flex items-center space-x-6">
          <Calendar className="w-10 h-10 text-[#2A3B1D] group-hover:scale-110 transition-transform duration-300" />
          <div>
            <h3 className="text-xl font-semibold text-[#2A3B1D] mb-2">Flexible Scheduling</h3>
            <p className="text-[#2A3B1D]/70">Book sessions at your convenience with our easy scheduling system</p>
          </div>
        </div>
      </Card>
      
      <Card className="p-6 bg-white/80 border-[#2A3B1D]/20 hover:border-[#2A3B1D]/30 transition-colors duration-300 group">
        <div className="flex items-center space-x-6">
          <MessageSquare className="w-10 h-10 text-[#2A3B1D] group-hover:scale-110 transition-transform duration-300" />
          <div>
            <h3 className="text-xl font-semibold text-[#2A3B1D] mb-2">Growth Strategies</h3>
            <p className="text-[#2A3B1D]/70">Get personalized advice to optimize your plant business growth</p>
          </div>
        </div>
      </Card>
    </div>
  );
};