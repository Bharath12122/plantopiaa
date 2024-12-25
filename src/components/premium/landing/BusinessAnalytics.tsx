import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { SearchForm } from "./business/SearchForm";
import { InsightsDisplay } from "./business/InsightsDisplay";
import { FeaturesList } from "./business/FeaturesList";
import { WikipediaResults } from "./business/WikipediaResults";

export const BusinessAnalytics = () => {
  const [loading, setLoading] = useState(false);
  const [insight, setInsight] = useState("");
  const [wikiResults, setWikiResults] = useState<any>(null);
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

      // Check daily search limit
      const { data: searchCount } = await supabase.rpc('get_daily_wikipedia_search_count', {
        user_uuid: session.user.id
      });

      if (searchCount >= 5) {
        toast.error("You've reached your daily search limit. Try again tomorrow!");
        return;
      }

      // Record the search
      await supabase.from('wikipedia_searches').insert({
        user_id: session.user.id,
        search_query: searchKeyword.trim()
      });

      // Fetch Wikipedia data
      const wikiResponse = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
          searchKeyword
        )}&format=json&origin=*`
      );

      if (!wikiResponse.ok) {
        throw new Error('Failed to fetch Wikipedia data');
      }

      const wikiData = await wikiResponse.json();
      setWikiResults(wikiData.query.search);

      // Make the business insights API call
      const { data, error } = await supabase.functions.invoke('business-insights', {
        body: {
          userId: session.user.id,
          keyword: searchKeyword.trim()
        }
      });

      if (error) {
        if (error.status === 429 || (error.message && error.message.includes('429'))) {
          toast.error("We've reached our API limit. Please try again in a few minutes.");
          return;
        }
        console.error('Function invocation error:', error);
        throw error;
      }

      if (!data || !data.insight) {
        throw new Error('Invalid response from business insights function');
      }

      setInsight(data.insight);
      toast.success("Generated new business insight!");
      
    } catch (error: any) {
      console.error('Error generating insight:', error);
      toast.error(error.message || "Failed to generate business insight. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="grid md:grid-cols-2 gap-8 items-center bg-[#F2FCE2]">
      <div className="space-y-8">
        <InsightsDisplay insight={insight} />
        {wikiResults && <WikipediaResults results={wikiResults} />}
      </div>
      <div className="order-1 md:order-2">
        <h2 className="text-3xl font-bold mb-6 text-[#2A3B1D]">
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