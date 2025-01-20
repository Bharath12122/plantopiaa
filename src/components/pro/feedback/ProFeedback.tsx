import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, ThumbsUp } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const ProFeedback = () => {
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!feedback.trim()) {
      toast.error("Please enter your feedback");
      return;
    }

    setIsSubmitting(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error("Please sign in to submit feedback");
        return;
      }

      const { error } = await supabase
        .from('support_tickets')
        .insert({
          title: 'Pro Feature Feedback',
          description: feedback,
          priority: 'normal',
          status: 'open',
          user_id: session.user.id
        });

      if (error) throw error;

      toast.success("Thank you for your feedback!");
      setFeedback('');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error("Failed to submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center space-x-2">
        <MessageSquare className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Share Your Feedback</h3>
      </div>

      <Textarea
        placeholder="Tell us what you think about our Pro features..."
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        className="min-h-[100px]"
      />

      <Button 
        onClick={handleSubmit} 
        disabled={isSubmitting}
        className="w-full"
      >
        <ThumbsUp className="w-4 h-4 mr-2" />
        Submit Feedback
      </Button>
    </Card>
  );
};