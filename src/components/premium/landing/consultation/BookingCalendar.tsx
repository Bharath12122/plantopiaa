import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface BookingCalendarProps {
  onBookingComplete: () => void;
}

export const BookingCalendar = ({ onBookingComplete }: BookingCalendarProps) => {
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

      onBookingComplete();
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
    <div className="grid gap-4 py-4">
      <div className="mx-auto">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          className="rounded-md border mx-auto"
          disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
        />
      </div>
      
      {isLoading && (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-plant-pro"></div>
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
                selectedSlot === slot && "bg-plant-pro text-white hover:bg-plant-pro-dark"
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
        className="bg-plant-pro hover:bg-plant-pro-dark text-white"
      >
        Confirm Booking
      </Button>
    </div>
  );
};