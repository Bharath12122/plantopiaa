import { useState } from "react";
import { HeadphonesIcon, Clock, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SupportChat } from "./SupportChat";

export const PrioritySupport = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <section className="grid md:grid-cols-2 gap-8 items-center">
      <Card className="p-6 bg-white border-[#2A3B1D]/10 order-2 md:order-1 rounded-2xl">
        <div className="aspect-video rounded-lg bg-[#F2FCE2] flex items-center justify-center">
          <HeadphonesIcon className="w-16 h-16 text-[#2A3B1D] animate-pulse" />
        </div>
      </Card>
      <div className="order-1 md:order-2">
        <h2 className="text-3xl font-bold mb-6 text-[#2A3B1D]">
          Priority Support
        </h2>
        <div className="space-y-6">
          <Card className="flex items-center space-x-4 p-6 bg-white border-[#2A3B1D]/10 hover:border-[#2A3B1D]/30 transition-colors duration-300 group rounded-xl">
            <Clock className="w-8 h-8 text-[#2A3B1D] group-hover:scale-110 transition-transform duration-300" />
            <p className="text-[#2A3B1D]/90">Fast response times</p>
          </Card>
          <Card className="flex items-center space-x-4 p-6 bg-white border-[#2A3B1D]/10 hover:border-[#2A3B1D]/30 transition-colors duration-300 group rounded-xl">
            <MessageCircle className="w-8 h-8 text-[#2A3B1D] group-hover:scale-110 transition-transform duration-300" />
            <p className="text-[#2A3B1D]/90">Dedicated support team</p>
          </Card>
          <Card className="flex items-center space-x-4 p-6 bg-white border-[#2A3B1D]/10 hover:border-[#2A3B1D]/30 transition-colors duration-300 group rounded-xl">
            <HeadphonesIcon className="w-8 h-8 text-[#2A3B1D] group-hover:scale-110 transition-transform duration-300" />
            <p className="text-[#2A3B1D]/90">24/7 premium assistance</p>
          </Card>
          <Button
            onClick={() => setIsChatOpen(true)}
            className="w-full md:w-auto bg-[#2A3B1D] hover:bg-[#2A3B1D]/90 text-white px-8 py-6 text-lg rounded-xl transition-all duration-300 hover:scale-105"
          >
            Contact Support
          </Button>
        </div>
      </div>
      <SupportChat open={isChatOpen} onOpenChange={setIsChatOpen} />
    </section>
  );
};