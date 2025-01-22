import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { Heart, Sprout, Globe, Database, Shield } from "lucide-react";
import { toast } from "sonner";
import { DonationTier } from "@/components/donate/DonationTier";
import { Testimonial } from "@/components/donate/Testimonial";
import { CustomDonation } from "@/components/donate/CustomDonation";

const RAZORPAY_URL = "https://rzp.io/l/XQF70pCm"; // Updated Razorpay payment link format

export default function Donate() {
  const [customAmount, setCustomAmount] = useState([500]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDonate = async (amount: number) => {
    try {
      setIsProcessing(true);
      console.log('Redirecting to Razorpay payment page...');
      window.location.href = RAZORPAY_URL;
    } catch (error) {
      console.error('Error redirecting to payment page:', error);
      toast.error("Failed to redirect to payment page. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F2FCE2] to-white">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-[#2A3B1D] mb-6">
            Support Plantopiaa – Together, Let's Grow!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your contribution empowers us to build smarter plant-care solutions.
          </p>
          <Button
            onClick={() => handleDonate(customAmount[0])}
            disabled={isProcessing}
            className="bg-[#00B388] hover:bg-[#00B388]/90 text-white px-8 py-6 text-xl rounded-full animate-float"
          >
            <Heart className="w-6 h-6 mr-2" /> 
            {isProcessing ? "Processing..." : "Donate Now"}
          </Button>
        </div>
      </section>
      
      {/* Impact Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#2A3B1D] mb-12">
            Your Support Makes a Difference
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#F2FCE2] rounded-full flex items-center justify-center">
                <Sprout className="w-8 h-8 text-[#00B388]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Enhanced AI Models</h3>
              <p className="text-gray-600">Improving plant identification accuracy</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#F2FCE2] rounded-full flex items-center justify-center">
                <Database className="w-8 h-8 text-[#00B388]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expanded Database</h3>
              <p className="text-gray-600">Adding more plant species and care guides</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#F2FCE2] rounded-full flex items-center justify-center">
                <Globe className="w-8 h-8 text-[#00B388]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
              <p className="text-gray-600">Making plant care accessible worldwide</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Donation Options */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#2A3B1D] mb-12">
            Choose Your Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {[
              { amount: 299, description: "Help us identify more plant species" },
              { amount: 599, description: "Support AI model improvements" },
              { amount: 999, description: "Enable global plant care access" },
              { amount: 1999, description: "Fund major platform enhancements" }
            ].map((tier) => (
              <DonationTier
                key={tier.amount}
                {...tier}
                onClick={() => handleDonate(tier.amount)}
              />
            ))}
          </div>
          
          <CustomDonation
            amount={customAmount}
            onAmountChange={setCustomAmount}
            onDonate={() => handleDonate(customAmount[0])}
            isProcessing={isProcessing}
          />
        </div>
      </section>
      
      {/* Trust Signals */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-12">
            <div className="bg-[#F2FCE2] px-6 py-3 rounded-full flex items-center">
              <Shield className="w-5 h-5 text-[#00B388] mr-2" />
              <span className="text-sm font-medium">Secure Payment Processing</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Testimonial
              quote="Plantopiaa has transformed how I care for my plants. Supporting their mission was an easy decision!"
              author="Sarah J., Plant Enthusiast"
            />
            <Testimonial
              quote="The AI-powered plant identification has helped me discover and properly care for so many species."
              author="Michael R., Urban Gardener"
            />
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}