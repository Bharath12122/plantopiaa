import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ConsultationFeatures } from "./consultation/ConsultationFeatures";
import { BookingCalendar } from "./consultation/BookingCalendar";
import { ConsultationPreview } from "./consultation/ConsultationPreview";

export const VideoConsultation = () => {
  return (
    <section className="grid md:grid-cols-2 gap-12 items-center">
      <div className="space-y-8">
        <h2 className="text-3xl md:text-4xl font-bold text-[#2A3B1D] leading-tight">
          One-on-One Expert Consultations
        </h2>
        
        <ConsultationFeatures />
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full md:w-auto bg-[#2A3B1D] hover:bg-[#2A3B1D]/90 text-white px-8 py-6 text-lg rounded-xl transition-all duration-300 hover:scale-105">
              Book a Consultation
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-[#2A3B1D]">Schedule Your Consultation</DialogTitle>
            </DialogHeader>
            <div className="flex justify-center items-center">
              <BookingCalendar onBookingComplete={() => {
                const closeButton = document.querySelector('[aria-label="Close"]');
                if (closeButton instanceof HTMLButtonElement) {
                  closeButton.click();
                }
              }} />
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <ConsultationPreview />
    </section>
  );
};