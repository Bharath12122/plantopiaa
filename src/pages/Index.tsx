import { Leaf, Sun, Droplet } from "lucide-react";
import { SubscriptionCard } from "@/components/SubscriptionCard";
import { ChatbotTrigger } from "@/components/ChatbotTrigger";
import { LogoutButton } from "@/components/LogoutButton";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  const subscriptions = [
    {
      title: "Free",
      price: "$0/month",
      description: "Perfect for plant enthusiasts starting their journey",
      features: [
        { text: "Basic plant identification", included: true },
        { text: "General care tips", included: true },
        { text: "Community access", included: true },
        { text: "Medicinal plant details", included: false },
        { text: "Expert consultation", included: false },
      ],
      variant: "free" as const,
    },
    {
      title: "Pro",
      price: "$9.99/month",
      description: "For medicinal plant enthusiasts",
      features: [
        { text: "All Free features", included: true },
        { text: "Medicinal plant identification", included: true },
        { text: "Detailed growing guides", included: true },
        { text: "Personalized care schedules", included: true },
        { text: "Expert consultation", included: false },
      ],
      variant: "pro" as const,
      popular: true,
      onSelect: () => navigate("/pro"),
    },
    {
      title: "Premium",
      price: "$29.99/month",
      description: "For professional plant growers",
      features: [
        { text: "All Pro features", included: true },
        { text: "1-on-1 video consultation", included: true },
        { text: "Business growth tips", included: true },
        { text: "Climate analysis", included: true },
        { text: "Priority support", included: true },
      ],
      variant: "premium" as const,
      onSelect: () => navigate("/premium"),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-plant-free">
      <LogoutButton />
      {/* Hero Section */}
      <div className="container pt-20 pb-16 text-center">
        <div className="flex justify-center mb-8">
          <Leaf className="h-16 w-16 text-plant-premium animate-float" />
        </div>
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-plant-premium to-plant-premium-accent bg-clip-text text-transparent">
          Plant Care Assistant
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Your AI-powered companion for plant identification, care, and growth
        </p>
        <div className="flex justify-center gap-4 mb-16">
          <div className="flex items-center gap-2 text-gray-600">
            <Sun className="h-5 w-5" />
            <span>Smart Care Tips</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Droplet className="h-5 w-5" />
            <span>Watering Schedule</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Leaf className="h-5 w-5" />
            <span>Plant ID</span>
          </div>
        </div>

        {/* Subscription Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {subscriptions.map((sub) => (
            <SubscriptionCard key={sub.title} {...sub} />
          ))}
        </div>
      </div>

      {/* Chatbot Trigger */}
      <ChatbotTrigger />
    </div>
  );
};

export default Index;