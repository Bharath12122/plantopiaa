import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

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
    const { plantName, scientificName, basicInfo } = await req.json();

    console.log('Received request for plant:', { plantName, scientificName, basicInfo });

    const prompt = `As a botanical expert, provide detailed information about "${plantName}" (${scientificName}). Focus on:

1. Evidence-based health benefits and medicinal properties
2. Traditional medicinal uses with scientific backing where available
3. Nutritional value if edible
4. Environmental benefits (e.g., air purification)
5. Potential applications in skincare or wellness

Base your response on this basic information: ${basicInfo}

Format the response as a clear, concise list of benefits. Include appropriate disclaimers for any traditional but unverified claims.`;

    console.log('Calling OpenAI API with prompt:', prompt);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'You are a knowledgeable botanist and health expert. Provide accurate, well-researched information about plants and their benefits. Always include appropriate disclaimers about medical claims.'
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('OpenAI API response:', data);

    // Process the response to extract benefits
    const generatedContent = data.choices[0].message.content;
    const benefits = generatedContent
      .split('\n')
      .filter(line => line.trim().length > 0)
      .map(benefit => benefit.replace(/^\d+\.\s*|-\s*/, '').trim());

    console.log('Processed benefits:', benefits);

    return new Response(
      JSON.stringify({ benefits }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in enhance-plant-info function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        benefits: ["No documented health benefits have been verified for this plant. Always consult healthcare professionals before using any plant for medicinal purposes."]
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});