import { BarChart, TrendingUp, Target, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const BusinessAnalytics = () => {
  const [loading, setLoading] = useState(false);
  const [insight, setInsight] = useState("");

  const generateInsight = async () => {
    try {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        toast.error("Please sign in to generate insights");
        return;
      }

      const { data, error } = await supabase.functions.invoke('business-insights', {
        body: {
          userId: session.user.id,
          metricType: 'growth',
          query: 'What are the key growth opportunities based on current metrics?'
        }
      });

      if (error) {
        // Check if it's a quota error
        if (error.status === 429 || (data && data.isQuotaError)) {
          toast.error("AI service is currently unavailable. Please try again later or contact support.");
          console.error("OpenAI quota exceeded:", error);
          return;
        }
        throw error;
      }

      setInsight(data.insight);
      toast.success("Generated new business insight!");
    } catch (error) {
      console.error('Error generating insight:', error);
      toast.error("Failed to generate business insight. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="grid md:grid-cols-2 gap-8 items-center">
      <Card className="p-6 bg-white/80 backdrop-blur-sm border-[#9b87f5]/20 order-2 md:order-1 rounded-2xl hover:shadow-lg transition-all duration-300">
        <div className="aspect-video rounded-lg bg-gradient-to-br from-[#9b87f5]/10 to-[#E5DEFF] flex items-center justify-center">
          <BarChart className="w-16 h-16 text-[#9b87f5] animate-pulse" />
        </div>
        {insight && (
          <div className="mt-6 p-4 bg-[#9b87f5]/5 rounded-lg border border-[#9b87f5]/20">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-5 h-5 text-[#9b87f5]" />
              <span className="font-medium text-[#7E69AB]">AI Insight</span>
            </div>
            <p className="text-gray-700">{insight}</p>
          </div>
        )}
      </Card>
      <div className="order-1 md:order-2">
        <h2 className="text-3xl font-bold mb-6 text-[#2A3B1D] bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent">
          Business Analytics & Growth
        </h2>
        <div className="space-y-6">
          <Card className="flex items-center space-x-4 p-6 bg-white/80 backdrop-blur-sm border-[#9b87f5]/20 hover:border-[#9b87f5]/30 transition-colors duration-300 group rounded-xl">
            <TrendingUp className="w-8 h-8 text-[#9b87f5] group-hover:scale-110 transition-transform duration-300" />
            <p className="text-gray-700">AI-powered growth analysis and recommendations</p>
          </Card>
          <Card className="flex items-center space-x-4 p-6 bg-white/80 backdrop-blur-sm border-[#9b87f5]/20 hover:border-[#9b87f5]/30 transition-colors duration-300 group rounded-xl">
            <Target className="w-8 h-8 text-[#9b87f5] group-hover:scale-110 transition-transform duration-300" />
            <p className="text-gray-700">Personalized business strategies</p>
          </Card>
          <Card className="flex items-center space-x-4 p-6 bg-white/80 backdrop-blur-sm border-[#9b87f5]/20 hover:border-[#9b87f5]/30 transition-colors duration-300 group rounded-xl">
            <BarChart className="w-8 h-8 text-[#9b87f5] group-hover:scale-110 transition-transform duration-300" />
            <p className="text-gray-700">Real-time performance tracking</p>
          </Card>
          <Button
            onClick={generateInsight}
            disabled={loading}
            className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white transition-all duration-300 hover:shadow-lg"
          >
            {loading ? "Generating Insight..." : "Generate Business Insight"}
          </Button>
        </div>
      </div>
    </section>
  );
};