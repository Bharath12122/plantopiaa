import { Video } from "lucide-react";
import { Card } from "@/components/ui/card";

export const ConsultationPreview = () => {
  return (
    <Card className="p-8 bg-white border-plant-pro/10 relative group overflow-hidden rounded-2xl">
      <div className="aspect-video rounded-xl bg-gradient-to-br from-plant-pro/5 to-transparent flex items-center justify-center overflow-hidden relative">
        <Video className="w-20 h-20 text-plant-pro transition-all duration-700 group-hover:scale-110 group-hover:rotate-12" />
        <div className="absolute inset-0 bg-gradient-to-br from-plant-pro/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>
    </Card>
  );
};