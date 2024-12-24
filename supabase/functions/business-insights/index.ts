import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const API_KEY = 'FBtfDxoWwHOHFVCe7uMf5UBU0EoJYEv7';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userId, keyword } = await req.json();
    console.log('Received request with userId:', userId, 'and keyword:', keyword);

    if (!userId || !keyword) {
      console.error('Missing required parameters');
      throw new Error('Missing required parameters');
    }

    // For testing purposes, generate a mock insight based on the keyword
    // This simulates the API response while we set up the actual API integration
    const generateMockInsight = (keyword: string) => {
      const insights = [
        `Market analysis shows growing demand for ${keyword} in sustainable agriculture.`,
        `Recent trends indicate ${keyword} has potential for vertical farming applications.`,
        `Business opportunities identified in ${keyword} cultivation for local markets.`,
        `Industry experts suggest ${keyword} has significant growth potential in organic farming.`
      ];
      return insights[Math.floor(Math.random() * insights.length)];
    };

    const mockInsight = generateMockInsight(keyword);
    console.log('Generated mock insight:', mockInsight);
    
    return new Response(
      JSON.stringify({
        insight: mockInsight,
        status: 'success'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in business-insights function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate insights',
        details: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});