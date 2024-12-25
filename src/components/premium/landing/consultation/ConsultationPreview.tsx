import { Video } from "lucide-react";
import { Card } from "@/components/ui/card";

export const ConsultationPreview = () => {
  return (
    <Card className="p-8 bg-white border-[#a2d96e]/10 relative group overflow-hidden rounded-2xl">
      <div className="aspect-video rounded-xl bg-gradient-to-br from-[#F2FCE2] to-transparent flex items-center justify-center overflow-hidden relative">
        <Video className="w-20 h-20 text-[#a2d96e] transition-all duration-700 group-hover:scale-110 group-hover:rotate-12" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#F2FCE2] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>
    </Card>
  );
};