import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const API_KEY = 'FBtfDxoWwHOHFVCe7uMf5UBU0EoJYEv7';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userId, keyword } = await req.json();

    if (!userId || !keyword) {
      throw new Error('Missing required parameters');
    }

    // Simulate API call with the new key
    const response = await fetch('https://api.example.com/insights', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keyword: keyword,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate insights');
    }

    const data = await response.json();
    
    return new Response(
      JSON.stringify({
        insight: data.insight || `Business insights for ${keyword}: Growth opportunities identified in sustainable farming practices and market expansion.`,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in business-insights function:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate insights' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
