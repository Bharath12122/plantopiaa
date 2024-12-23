import { BarChart, TrendingUp, Target, MessageSquare, Search, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Tooltip } from "@/components/ui/tooltip";

export const BusinessAnalytics = () => {
  const [loading, setLoading] = useState(false);
  const [insight, setInsight] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchesRemaining, setSearchesRemaining] = useState<number | null>(null);

  const generateInsight = async () => {
    if (!searchKeyword.trim()) {
      toast.error("Please enter a valid keyword");
      return;
    }

    try {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        toast.error("Please sign in to generate insights");
        return;
      }

      // Get daily search count
      const { data: searchCount } = await supabase.rpc('get_daily_search_count', {
        user_uuid: session.user.id
      });

      if (searchCount >= 5) {
        toast.error("You've reached your daily search limit. Please try again tomorrow.");
        return;
      }

      // Record the search
      await supabase.from('user_searches').insert({
        user_id: session.user.id,
        search_keyword: searchKeyword.trim()
      });

      const { data, error } = await supabase.functions.invoke('business-insights', {
        body: {
          userId: session.user.id,
          keyword: searchKeyword,
          query: `Generate business insights for ${searchKeyword}`
        }
      });

      if (error) {
        if (error.status === 429 || (data && data.isQuotaError)) {
          toast.error("AI service is currently unavailable. Please try again later or contact support.");
          console.error("OpenAI quota exceeded:", error);
          return;
        }
        throw error;
      }

      setInsight(data.insight);
      
      // Update remaining searches
      const remainingSearches = 5 - (searchCount + 1);
      setSearchesRemaining(remainingSearches);
      
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
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent">
          Business Analytics & Growth
        </h2>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Type a business or plant-related topic (e.g., mushroom business)"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="border-[#9b87f5]/20 focus:border-[#9b87f5] focus:ring-[#9b87f5]"
              />
              <Tooltip content="Limited to 5 searches per day">
                <Info className="w-5 h-5 text-[#9b87f5] cursor-help" />
              </Tooltip>
            </div>
            {searchesRemaining !== null && (
              <p className="text-sm text-[#7E69AB]">
                {searchesRemaining} searches remaining today
              </p>
            )}
          </div>

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