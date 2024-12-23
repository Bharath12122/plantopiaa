import { HeadphonesIcon, Clock, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export const PrioritySupport = () => {
  const { toast } = useToast();

  return (
    <section className="grid md:grid-cols-2 gap-8 items-center">
      <Card className="p-6 bg-white/5 backdrop-blur-sm border-[#9b87f5]/20 order-2 md:order-1">
        <div className="aspect-video rounded-lg bg-gradient-to-br from-[#9b87f5]/20 to-[#7E69AB]/20 flex items-center justify-center">
          <HeadphonesIcon className="w-16 h-16 text-[#9b87f5] animate-pulse" />
        </div>
      </Card>
      <div className="order-1 md:order-2">
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent">
          Priority Support
        </h2>
        <div className="space-y-6">
          <div className="flex items-center space-x-4 bg-white/5 p-4 rounded-lg backdrop-blur-sm hover:bg-white/10 transition-colors">
            <Clock className="w-8 h-8 text-[#9b87f5]" />
            <p className="text-white/90">Fast response times</p>
          </div>
          <div className="flex items-center space-x-4 bg-white/5 p-4 rounded-lg backdrop-blur-sm hover:bg-white/10 transition-colors">
            <MessageCircle className="w-8 h-8 text-[#9b87f5]" />
            <p className="text-white/90">Dedicated support team</p>
          </div>
          <div className="flex items-center space-x-4 bg-white/5 p-4 rounded-lg backdrop-blur-sm hover:bg-white/10 transition-colors">
            <HeadphonesIcon className="w-8 h-8 text-[#9b87f5]" />
            <p className="text-white/90">24/7 premium assistance</p>
          </div>
          <Button
            onClick={() => {
              toast({
                title: "Coming Soon!",
                description: "Priority support will be available shortly.",
              });
            }}
            className="w-full md:w-auto bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:opacity-90 text-white"
          >
            Contact Support
          </Button>
        </div>
      </div>
    </section>
  );
};