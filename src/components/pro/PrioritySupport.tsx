import { useState } from "react";
import { HeadphonesIcon, Clock, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const PrioritySupport = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const createSupportTicket = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error("Please sign in to create a support ticket");
        return;
      }

      const { error } = await supabase
        .from('support_tickets')
        .insert([
          {
            user_id: session.user.id,
            title: "Priority Support Request",
            description: "Pro user support request",
            priority: "high"
          }
        ]);

      if (error) throw error;

      toast.success("Support ticket created! We'll get back to you shortly.");
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error creating support ticket:', error);
      toast.error("Failed to create support ticket");
    }
  };

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Priority Support</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6">
            <Clock className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Fast Response Time</h3>
            <p className="text-gray-600">Get answers to your questions within hours, not days.</p>
          </Card>
          <Card className="p-6">
            <MessageCircle className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Direct Communication</h3>
            <p className="text-gray-600">Chat directly with our plant experts.</p>
          </Card>
          <Card className="p-6">
            <HeadphonesIcon className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">24/7 Availability</h3>
            <p className="text-gray-600">Support available around the clock.</p>
          </Card>
        </div>
        <div className="text-center mt-8">
          <Button onClick={() => setIsDialogOpen(true)} size="lg">
            Contact Support
          </Button>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Priority Support</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 p-4">
            <p>Our support team will contact you shortly through your registered email.</p>
            <Button onClick={createSupportTicket} className="w-full">
              Create Support Ticket
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};