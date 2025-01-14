import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Leaf, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const ProOnboarding = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const totalSteps = 3;

  const handleNextStep = async () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user?.id) {
          toast.success("Pro setup completed! Enjoy your enhanced features.");
          navigate("/pro/dashboard");
        }
      } catch (error) {
        console.error("Error completing pro setup:", error);
        toast.error("Failed to complete setup. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1F2C] py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center mb-8">
            <Leaf className="w-12 h-12 text-[#9b87f5] mr-4" />
            <h1 className="text-4xl font-bold text-white">Welcome to Pro</h1>
          </div>

          <div className="flex justify-center mb-12">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div
                key={index}
                className={`h-2 w-16 mx-1 rounded ${
                  index + 1 <= step ? "bg-[#9b87f5]" : "bg-gray-600"
                }`}
              />
            ))}
          </div>

          <Card className="p-8 bg-[#1A1F2C] border-[#9b87f5]/20">
            {step === 1 && (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Unlimited Plant Identification
                </h2>
                <p className="text-gray-400 mb-8">
                  Get started with unlimited plant scans and detailed identification
                </p>
              </div>
            )}

            {step === 2 && (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Personalized Care Calendar
                </h2>
                <p className="text-gray-400 mb-8">
                  Set up your plant care schedule and receive smart reminders
                </p>
              </div>
            )}

            {step === 3 && (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Advanced Features Access
                </h2>
                <p className="text-gray-400 mb-8">
                  Get full access to all Pro features including disease identification
                  and detailed reports
                </p>
              </div>
            )}

            <div className="flex justify-center">
              <Button
                onClick={handleNextStep}
                className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white px-8 py-6 text-xl font-semibold rounded-xl transition-all flex items-center"
              >
                {step === totalSteps ? "Complete Setup" : "Next Step"}
                <ArrowRight className="ml-2 w-6 h-6" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};