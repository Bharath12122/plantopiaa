import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";

interface Feature {
  text: string;
  included: boolean;
}

interface SubscriptionCardProps {
  title: string;
  monthlyPrice: string;
  yearlyPrice: string;
  description: string;
  features: Feature[];
  variant: "free" | "pro" | "premium";
  popular?: boolean;
}

export const SubscriptionCard = ({
  title,
  monthlyPrice,
  yearlyPrice,
  description,
  features,
  variant,
  popular,
}: SubscriptionCardProps) => {
  const navigate = useNavigate();
  const [isYearly, setIsYearly] = useState(false);

  const bgColors = {
    free: "bg-plant-free hover:bg-plant-free/90",
    pro: "bg-gradient-to-br from-plant-pro to-plant-pro-dark hover:opacity-90",
    premium: "bg-gradient-to-br from-plant-premium to-plant-premium-accent hover:opacity-90",
  };

  const textColors = {
    free: "text-gray-900",
    pro: "text-white",
    premium: "text-white",
  };

  const handleClick = () => {
    switch (variant) {
      case "pro":
        navigate("/pro/landing");
        break;
      case "premium":
        navigate("/premium");
        break;
      default:
        break;
    }
  };

  const currentPrice = isYearly ? yearlyPrice : monthlyPrice;
  const billingPeriod = isYearly ? "/year" : "/month";

  return (
    <Card className={`w-full max-w-sm transition-all duration-300 hover:scale-105 ${popular ? "border-plant-premium border-2" : ""}`}>
      <CardHeader>
        {popular && (
          <div className="absolute top-0 right-0 -translate-y-1/2 px-3 py-1 bg-plant-premium text-white rounded-full text-sm font-medium">
            Most Popular
          </div>
        )}
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Monthly</span>
            <Switch
              checked={isYearly}
              onCheckedChange={setIsYearly}
              className="data-[state=checked]:bg-plant-premium"
            />
            <span className="text-sm text-gray-500">Yearly</span>
          </div>
        </div>
        <div className="mt-4">
          <span className="text-3xl font-bold">₹{currentPrice}</span>
          <span className="text-gray-500">{billingPeriod}</span>
          {isYearly && (
            <div className="text-sm text-green-500 mt-1">
              Save up to 2 months free!
            </div>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-2">{description}</p>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center space-x-2">
              <Check className={feature.included ? "text-green-500" : "text-gray-300"} size={20} />
              <span className={feature.included ? "text-gray-700" : "text-gray-400"}>{feature.text}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          className={`w-full ${bgColors[variant]} ${textColors[variant]}`}
          onClick={handleClick}
        >
          Get Started
        </Button>
      </CardFooter>
    </Card>
  );
};