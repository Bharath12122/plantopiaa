import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { SearchForm } from "./business/SearchForm";
import { InsightsDisplay } from "./business/InsightsDisplay";
import { FeaturesList } from "./business/FeaturesList";

export const BusinessAnalytics = () => {
  const [loading, setLoading] = useState(false);
  const [insight, setInsight] = useState("");
  const [searchesRemaining, setSearchesRemaining] = useState<number | null>(null);

  const generateInsight = async (searchKeyword: string) => {
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
      <InsightsDisplay insight={insight} />
      <div className="order-1 md:order-2">
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent">
          Business Analytics & Growth
        </h2>
        <div className="space-y-6">
          <SearchForm 
            onSearch={generateInsight}
            loading={loading}
            searchesRemaining={searchesRemaining}
          />
          <FeaturesList />
        </div>
      </div>
    </section>
  );
};