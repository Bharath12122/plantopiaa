import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Footer } from "@/components/Footer";
import { 
  Heart, 
  Sprout, 
  Globe, 
  Database, 
  Shield, 
  ChevronRight,
  Star
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

declare const Razorpay: any;

const DonationTier = ({ amount, description, onClick }: { 
  amount: number;
  description: string;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="p-6 border border-[#00B388]/20 rounded-xl hover:border-[#00B388] transition-all duration-300 bg-white/50 backdrop-blur-sm hover:shadow-lg group"
  >
    <div className="text-2xl font-bold text-[#00B388] mb-2">₹{amount}</div>
    <p className="text-gray-600 text-sm">{description}</p>
    <ChevronRight className="w-5 h-5 text-[#00B388] opacity-0 group-hover:opacity-100 transition-all duration-300 ml-auto mt-2" />
  </button>
);

const Testimonial = ({ quote, author }: { quote: string; author: string }) => (
  <div className="p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-[#00B388]/20">
    <Star className="w-6 h-6 text-[#9b87f5] mb-4" />
    <p className="text-gray-600 italic mb-4">{quote}</p>
    <p className="text-[#00B388] font-semibold">{author}</p>
  </div>
);

export default function Donate() {
  const [customAmount, setCustomAmount] = useState([500]);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleDonate = async (amount: number) => {
    try {
      setIsProcessing(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      const options = {
        key: process.env.RAZORPAY_KEY_ID,
        amount: amount * 100, // Razorpay expects amount in paise
        currency: "INR",
        name: "Plantopiaa",
        description: "Donation to support plant care",
        handler: function(response: any) {
          toast.success("Thank you for your donation!");
          console.log(response);
        },
        prefill: {
          email: session?.user?.email,
        },
        theme: {
          color: "#00B388"
        }
      };

      const razorpay = new Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Error processing donation:', error);
      toast.error("Failed to process donation. Please try again.");
    } finally {
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
            <DonationTier 
              amount={299} 
              description="Help us identify more plant species"
              onClick={() => handleDonate(299)}
            />
            <DonationTier 
              amount={599} 
              description="Support AI model improvements"
              onClick={() => handleDonate(599)}
            />
            <DonationTier 
              amount={999} 
              description="Enable global plant care access"
              onClick={() => handleDonate(999)}
            />
            <DonationTier 
              amount={1999} 
              description="Fund major platform enhancements"
              onClick={() => handleDonate(1999)}
            />
          </div>
          
          <div className="bg-white/50 backdrop-blur-sm p-6 rounded-xl border border-[#00B388]/20">
            <h3 className="text-xl font-semibold mb-4">Custom Amount</h3>
            <div className="space-y-4">
              <Slider
                value={customAmount}
                onValueChange={setCustomAmount}
                max={10000}
                step={100}
                className="py-4"
              />
              <div className="flex justify-between items-center">
                <input
                  type="number"
                  value={customAmount[0]}
                  onChange={(e) => setCustomAmount([Number(e.target.value)])}
                  className="text-2xl font-bold text-[#00B388] bg-transparent border-b border-[#00B388]/20 w-32 focus:outline-none focus:border-[#00B388]"
                  min={100}
                  max={10000}
                />
                <Button
                  onClick={() => handleDonate(customAmount[0])}
                  disabled={isProcessing}
                  className="bg-[#00B388] hover:bg-[#00B388]/90 text-white"
                >
                  {isProcessing ? "Processing..." : "Donate Custom Amount"}
                </Button>
              </div>
            </div>
          </div>
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