import { useState } from "react";
import { Video, Calendar, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

export const VideoConsultation = () => {
  const [date, setDate] = useState<Date>();
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleDateSelect = async (selectedDate: Date | undefined) => {
    if (!selectedDate) return;
    setDate(selectedDate);
    setIsLoading(true);

    try {
      const startOfDay = new Date(selectedDate);
      startOfDay.setHours(0, 0, 0, 0);
      
      const endOfDay = new Date(selectedDate);
      endOfDay.setHours(23, 59, 59, 999);

      const { data, error } = await supabase.rpc('get_available_slots', {
        start_date: startOfDay.toISOString(),
        end_date: endOfDay.toISOString()
      });

      if (error) throw error;

      setAvailableSlots(data.map((slot: { available_slot: string }) => 
        format(new Date(slot.available_slot), 'HH:mm')
      ));
    } catch (error) {
      console.error('Error fetching available slots:', error);
      toast({
        title: "Error",
        description: "Failed to fetch available time slots. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBooking = async () => {
    if (!date || !selectedSlot) return;

    const bookingDate = new Date(date);
    const [hours, minutes] = selectedSlot.split(':');
    bookingDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);

    try {
      // First get the current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) throw userError;
      
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to book a consultation.",
          variant: "destructive"
        });
        return;
      }

      // Insert the booking with the user_id
      const { error: bookingError } = await supabase
        .from('consultation_bookings')
        .insert({
          booking_date: bookingDate.toISOString(),
          user_id: user.id
        });

      if (bookingError) throw bookingError;

      toast({
        title: "Success!",
        description: "Your consultation has been booked successfully.",
      });

      // Reset selection
      setDate(undefined);
      setSelectedSlot(undefined);
    } catch (error: any) {
      console.error('Error booking consultation:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to book consultation. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <section className="grid md:grid-cols-2 gap-12 items-center">
      <div className="space-y-8">
        <h2 className="text-3xl md:text-4xl font-bold text-[#9b87f5] leading-tight">
          One-on-One Expert Consultations
        </h2>
        <div className="space-y-6">
          <Card className="p-6 bg-white border-[#9b87f5]/10 hover:border-[#9b87f5]/30 transition-colors duration-300 group">
            <div className="flex items-center space-x-6">
              <Video className="w-10 h-10 text-[#9b87f5] group-hover:scale-110 transition-transform duration-300" />
              <div>
                <h3 className="text-xl font-semibold text-[#9b87f5] mb-2">Live Video Consultations</h3>
                <p className="text-[#7E69AB]/70">Connect with plant experts in real-time for personalized guidance</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 bg-white border-[#9b87f5]/10 hover:border-[#9b87f5]/30 transition-colors duration-300 group">
            <div className="flex items-center space-x-6">
              <Calendar className="w-10 h-10 text-[#9b87f5] group-hover:scale-110 transition-transform duration-300" />
              <div>
                <h3 className="text-xl font-semibold text-[#9b87f5] mb-2">Flexible Scheduling</h3>
                <p className="text-[#7E69AB]/70">Book sessions at your convenience with our easy scheduling system</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 bg-white border-[#9b87f5]/10 hover:border-[#9b87f5]/30 transition-colors duration-300 group">
            <div className="flex items-center space-x-6">
              <MessageSquare className="w-10 h-10 text-[#9b87f5] group-hover:scale-110 transition-transform duration-300" />
              <div>
                <h3 className="text-xl font-semibold text-[#9b87f5] mb-2">Growth Strategies</h3>
                <p className="text-[#7E69AB]/70">Get personalized advice to optimize your plant business growth</p>
              </div>
            </div>
          </Card>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="w-full md:w-auto bg-[#9b87f5] hover:bg-[#7E69AB] text-white px-8 py-6 text-lg rounded-xl transition-all duration-300 hover:scale-105"
              >
                Book a Consultation
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-[#9b87f5]">Schedule Your Consultation</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={handleDateSelect}
                  className="rounded-md border"
                  disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                />
                {isLoading && (
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#9b87f5]"></div>
                  </div>
                )}
                {date && availableSlots.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {availableSlots.map((slot) => (
                      <Button
                        key={slot}
                        variant="outline"
                        className={cn(
                          "text-sm",
                          selectedSlot === slot && "bg-[#9b87f5] text-white hover:bg-[#7E69AB]"
                        )}
                        onClick={() => setSelectedSlot(slot)}
                      >
                        {slot}
                      </Button>
                    ))}
                  </div>
                )}
                {date && availableSlots.length === 0 && !isLoading && (
                  <p className="text-center text-muted-foreground">No available slots for this date</p>
                )}
                <Button
                  onClick={handleBooking}
                  disabled={!date || !selectedSlot}
                  className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
                >
                  Confirm Booking
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Card className="p-8 bg-white border-[#9b87f5]/10 relative group overflow-hidden rounded-2xl">
        <div className="aspect-video rounded-xl bg-gradient-to-br from-[#9b87f5]/5 to-transparent flex items-center justify-center overflow-hidden relative">
          <Video className="w-20 h-20 text-[#9b87f5] transition-all duration-700 group-hover:scale-110 group-hover:rotate-12" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#9b87f5]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </div>
      </Card>
    </section>
  );
};