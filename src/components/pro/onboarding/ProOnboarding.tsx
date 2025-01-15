import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export const ProOnboarding = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const totalSteps = 4;

  const handleActivatePro = async () => {
    try {
      setError(null);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to activate Pro features.",
          variant: "destructive",
        });
        return;
      }

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ is_pro: true })
        .eq('id', session.user.id);

      if (updateError) {
        console.error('Error activating Pro:', updateError);
        setError('Failed to activate Pro features. Please try again.');
        toast({
          title: "Activation Failed",
          description: "Please try again or contact support.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Welcome to Pro!",
        description: "Your Pro features have been activated.",
      });
      
      navigate("/pro");
    } catch (error) {
      console.error('Error activating Pro:', error);
      setError('An unexpected error occurred. Please try again.');
      toast({
        title: "Activation Failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    }
  };

  const steps = [
    {
      title: "Welcome to Pro",
      content: (
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-bold text-white">Welcome to Pro!</h3>
          <p className="text-gray-400">
            Let's get you set up with all the advanced features.
          </p>
        </div>
      ),
    },
    {
      title: "Plant Collection",
      content: (
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-bold text-white">Create Your Collection</h3>
          <p className="text-gray-400">
            Start by creating your first plant collection to organize your plants.
          </p>
        </div>
      ),
    },
    {
      title: "Scanning Setup",
      content: (
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-bold text-white">Advanced Scanning</h3>
          <p className="text-gray-400">
            Get ready to use unlimited plant scanning with detailed analysis.
          </p>
        </div>
      ),
    },
    {
      title: "Complete",
      content: (
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-bold text-white">You're All Set!</h3>
          <p className="text-gray-400">
            Start exploring all the Pro features and grow your plant knowledge.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#1A1F2C] py-16">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto p-8 bg-[#1A1F2C] border-[#9b87f5]/20">
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <Progress
            value={(step / totalSteps) * 100}
            className="mb-8"
          />
          
          <div className="mb-8">
            {steps[step - 1].content}
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className="text-white border-[#9b87f5]"
            >
              Previous
            </Button>
            
            {step < totalSteps ? (
              <Button
                onClick={() => setStep(Math.min(totalSteps, step + 1))}
                className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleActivatePro}
                className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
              >
                Complete Setup
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};