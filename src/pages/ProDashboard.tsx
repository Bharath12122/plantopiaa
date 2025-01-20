import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProStatus } from "@/hooks/useProStatus";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProUpload } from "@/components/pro/upload/ProUpload";
import { PlantCollection } from "@/components/pro/PlantCollection";
import { EducationalResources } from "@/components/pro/EducationalResources";
import { PrioritySupport } from "@/components/pro/PrioritySupport";
import { ProOnboardingTour } from "@/components/pro/onboarding/ProOnboardingTour";
import { ProFeedback } from "@/components/pro/feedback/ProFeedback";
import { 
  Sprout, 
  Leaf, 
  Bell, 
  Shield, 
  MessageSquare, 
  Wifi, 
  Book, 
  Bug, 
  LineChart, 
  TestTube 
} from "lucide-react";
import { toast } from "sonner";

export default function ProDashboard() {
  const navigate = useNavigate();
  const { isPro, isLoading } = useProStatus();

  useEffect(() => {
    if (!isLoading && !isPro) {
      navigate("/pro");
    }
  }, [isPro, isLoading, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const features = [
    {
      title: "Unlimited Plant Identifications",
      icon: <Sprout className="w-6 h-6 text-primary" />,
      component: <ProUpload />,
    },
    {
      title: "Plant Collection Library",
      icon: <Leaf className="w-6 h-6 text-primary" />,
      component: <PlantCollection />,
    },
    {
      title: "Watering Schedules",
      icon: <Bell className="w-6 h-6 text-primary" />,
      description: "Set up personalized watering reminders",
      onClick: () => toast.info("Watering schedule feature coming soon!"),
    },
    {
      title: "Ad-Free Experience",
      icon: <Shield className="w-6 h-6 text-primary" />,
      description: "Enjoy an uninterrupted experience",
    },
    {
      title: "Priority Support",
      icon: <MessageSquare className="w-6 h-6 text-primary" />,
      component: <PrioritySupport />,
    },
    {
      title: "Offline Mode",
      icon: <Wifi className="w-6 h-6 text-primary" />,
      description: "Access your plant data offline",
    },
    {
      title: "Advanced Care Guides",
      icon: <Book className="w-6 h-6 text-primary" />,
      component: <EducationalResources />,
    },
    {
      title: "Disease Detection",
      icon: <Bug className="w-6 h-6 text-primary" />,
      description: "Identify plant diseases and get treatment recommendations",
      onClick: () => toast.info("Disease detection feature coming soon!"),
    },
    {
      title: "Growth Tracking",
      icon: <LineChart className="w-6 h-6 text-primary" />,
      description: "Monitor your plants' progress over time",
      onClick: () => toast.info("Growth tracking feature coming soon!"),
    },
    {
      title: "Scientific Analysis",
      icon: <TestTube className="w-6 h-6 text-primary" />,
      description: "Access detailed scientific information about your plants",
      onClick: () => toast.info("Scientific analysis feature coming soon!"),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <ProOnboardingTour />
      
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to Plantopiaa Pro! 🌿</h1>
        <p className="text-xl text-gray-600">
          Explore all your premium features and take your plant care to the next level
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="p-6 hover:shadow-lg transition-all cursor-pointer"
            onClick={feature.onClick}
          >
            <div className="flex items-center mb-4">
              {feature.icon}
              <h3 className="text-xl font-semibold ml-3">{feature.title}</h3>
            </div>
            {feature.description && (
              <p className="text-gray-600">{feature.description}</p>
            )}
            {feature.component && (
              <div className="mt-4">{feature.component}</div>
            )}
          </Card>
        ))}
      </div>

      <div className="mt-12">
        <ProFeedback />
      </div>

      <div className="mt-12 text-center">
        <Button
          onClick={() => navigate("/support")}
          className="bg-primary hover:bg-primary/90"
        >
          Need Help? Contact Support
        </Button>
      </div>
    </div>
  );
}