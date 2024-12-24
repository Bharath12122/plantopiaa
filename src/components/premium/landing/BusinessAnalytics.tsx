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

      // Get daily search count first
      const { data: searchCount } = await supabase.rpc('get_daily_search_count', {
        user_uuid: session.user.id
      });

      // Check limit before making the API call
      if (searchCount >= 5) {
        toast.error("Daily limit reached. Try again tomorrow!");
        setSearchesRemaining(0);
        return;
      }

      // Record the search first
      await supabase.from('user_searches').insert({
        user_id: session.user.id,
        search_keyword: searchKeyword.trim()
      });

      // Calculate remaining searches
      const remainingSearches = 5 - (searchCount + 1);
      setSearchesRemaining(remainingSearches);

      // Make the API call
      const { data, error } = await supabase.functions.invoke('business-insights', {
        body: {
          userId: session.user.id,
          keyword: searchKeyword.trim()
        }
      });

      if (error) {
        console.error('Function invocation error:', error);
        throw error;
      }

      if (!data || !data.insight) {
        throw new Error('Invalid response from business insights function');
      }

      setInsight(data.insight);
      toast.success(`Generated new business insight! ${remainingSearches} searches remaining today.`);
      
    } catch (error: any) {
      console.error('Error generating insight:', error);
      toast.error("Failed to generate business insight. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="grid md:grid-cols-2 gap-8 items-center bg-gradient-to-br from-[#9b87f5]/10 to-[#7E69AB]/10">
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