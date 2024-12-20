import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ChatbotTrigger = () => {
  return (
    <Button
      className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-plant-premium hover:bg-plant-premium/90 animate-float"
      size="icon"
      onClick={() => console.log("Open chatbot")}
    >
      <MessageCircle className="h-6 w-6 text-white" />
    </Button>
  );
};