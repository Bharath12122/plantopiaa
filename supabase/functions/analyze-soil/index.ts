import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Configuration, OpenAIApi } from "https://esm.sh/openai@3.2.1";

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
    const { ph, nitrogen, phosphorus, potassium, organicMatter } = await req.json();
    
    const openai = new OpenAIApi(new Configuration({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    }));

    const prompt = `Analyze this soil data and provide recommendations:
      pH: ${ph}
      Nitrogen: ${nitrogen} ppm
      Phosphorus: ${phosphorus} ppm
      Potassium: ${potassium} ppm
      Organic Matter: ${organicMatter}%`;

    const response = await openai.createChatCompletion({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a soil analysis expert. Provide concise, actionable recommendations." },
        { role: "user", content: prompt }
      ],
    });

    const analysis = response.data.choices[0].message?.content || "No analysis available";
    const recommendations = analysis.split('\n').filter(line => line.trim().startsWith('-'));

    return new Response(
      JSON.stringify({ analysis, recommendations }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in analyze-soil function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});