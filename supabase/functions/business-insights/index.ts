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

    // Make API call with proper error handling
    const apiResponse = await fetch('https://api.example.com/insights', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ keyword }),
    });

    console.log('API Response status:', apiResponse.status);

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      console.error('API Error:', errorText);
      throw new Error(`API request failed: ${apiResponse.status}`);
    }

    let responseData;
    try {
      responseData = await apiResponse.json();
      console.log('API Response data:', responseData);
    } catch (e) {
      console.error('Error parsing API response:', e);
      throw new Error('Invalid API response format');
    }

    // For testing, return a mock insight if API fails
    const mockInsight = `Business insights for ${keyword}: Growth opportunities identified in sustainable farming practices and market expansion.`;
    
    return new Response(
      JSON.stringify({
        insight: responseData?.insight || mockInsight,
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