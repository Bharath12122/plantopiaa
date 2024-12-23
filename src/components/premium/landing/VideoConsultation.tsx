import { Calendar, Video, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

export const VideoConsultation = () => {
  const { toast } = useToast();

  return (
    <section className="grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent">
          One-on-One Expert Consultations
        </h2>
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Video className="w-8 h-8 text-[#9b87f5]" />
            <p className="text-gray-700">Live video consultations with plant experts</p>
          </div>
          <div className="flex items-center space-x-4">
            <Calendar className="w-8 h-8 text-[#9b87f5]" />
            <p className="text-gray-700">Flexible scheduling in your timezone</p>
          </div>
          <div className="flex items-center space-x-4">
            <MessageSquare className="w-8 h-8 text-[#9b87f5]" />
            <p className="text-gray-700">Post-consultation notes and recordings</p>
          </div>
          <Button
            onClick={() => {
              toast({
                title: "Coming Soon!",
                description: "Video consultations will be available shortly.",
              });
            }}
            className="w-full md:w-auto bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:opacity-90 text-white"
          >
            Schedule a Consultation
          </Button>
        </div>
      </div>
      <Card className="p-6 bg-white/5 backdrop-blur-sm border-[#9b87f5]/20">
        <div className="aspect-video rounded-lg bg-gradient-to-br from-[#9b87f5]/20 to-[#7E69AB]/20 flex items-center justify-center">
          <Video className="w-16 h-16 text-[#9b87f5] animate-pulse" />
        </div>
      </Card>
    </section>
  );
};