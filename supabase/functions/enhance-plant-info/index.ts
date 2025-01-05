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

    const prompt = `Please provide detailed health benefits and special features for the plant "${plantName}" (${scientificName}). Include:
    1. Unique attributes and characteristics
    2. Traditional and modern medicinal uses
    3. Health benefits with scientific backing where available
    4. Environmental benefits (like air purification)
    5. Nutritional value if edible
    6. Potential skincare or cosmetic applications
    
    Base your response on this basic information: ${basicInfo}
    
    Format the response as a clear, concise list of benefits, being careful to mention if any claims are traditional but not scientifically verified.`;

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
      }),
    });

    const data = await response.json();
    console.log('OpenAI API response received');

    // Process the response to extract benefits
    const generatedContent = data.choices[0].message.content;
    const benefits = generatedContent.split('\n')
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
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});