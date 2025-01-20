import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Book, 
  Plant2, 
  Bell, 
  Shield, 
  MessageSquare, 
  Wifi, 
  Sprout,
  Bug, 
  LineChart, 
  TestTube 
} from "lucide-react";
import { toast } from "sonner";

interface OnboardingStep {
  title: string;
  description: string;
  icon: React.ReactNode;
  action?: () => void;
}

export const ProOnboardingTour = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showTour, setShowTour] = useState(true);

  const steps: OnboardingStep[] = [
    {
      title: "Welcome to Plantopiaa Pro!",
      description: "Let's take a quick tour of your new features.",
      icon: <Sprout className="w-8 h-8 text-primary" />,
    },
    {
      title: "Unlimited Plant Identification",
      description: "Upload any plant photo for instant identification.",
      icon: <Plant2 className="w-8 h-8 text-primary" />,
      action: () => toast.info("Try uploading a plant photo now!")
    },
    {
      title: "Smart Watering Schedule",
      description: "Set up personalized watering reminders for your plants.",
      icon: <Bell className="w-8 h-8 text-primary" />,
      action: () => toast.info("Set your first watering schedule")
    },
    {
      title: "Disease Detection",
      description: "Early detection of plant diseases with AI analysis.",
      icon: <Bug className="w-8 h-8 text-primary" />,
      action: () => toast.info("Upload a photo to check plant health")
    },
    {
      title: "Growth Tracking",
      description: "Monitor your plants' progress over time.",
      icon: <LineChart className="w-8 h-8 text-primary" />,
      action: () => toast.info("Start tracking your first plant")
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      steps[currentStep].action?.();
    } else {
      setShowTour(false);
      toast.success("Tour completed! Enjoy your Pro features!");
    }
  };

  const handleSkip = () => {
    setShowTour(false);
    toast.info("You can always restart the tour from settings");
  };

  if (!showTour) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-lg w-full p-6 space-y-4 bg-white">
        <div className="flex items-center space-x-4">
          {steps[currentStep].icon}
          <div>
            <h3 className="text-xl font-semibold">{steps[currentStep].title}</h3>
            <p className="text-gray-600">{steps[currentStep].description}</p>
          </div>
        </div>

        <Progress value={(currentStep / (steps.length - 1)) * 100} className="my-4" />

        <div className="flex justify-between">
          <Button variant="ghost" onClick={handleSkip}>
            Skip Tour
          </Button>
          <Button onClick={handleNext}>
            {currentStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </div>
      </Card>
    </div>
  );
};