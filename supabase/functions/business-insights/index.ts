import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Configuration, OpenAIApi } from 'https://esm.sh/openai@3.1.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { keyword, userId } = await req.json()
    
    if (!keyword || !userId) {
      throw new Error('Missing required parameters')
    }

    // Initialize OpenAI
    const configuration = new Configuration({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    })
    const openai = new OpenAIApi(configuration)

    // Generate business insights using OpenAI
    const prompt = `Generate business insights for ${keyword}. Include growth analysis, business strategy, and performance metrics. Format the response as JSON with these three sections.`
    
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a business analyst providing insights in JSON format with three sections: growthAnalysis, businessStrategy, and performanceMetrics."
        },
        {
          role: "user",
          content: prompt
        }
      ],
    })

    const responseText = completion.data.choices[0].message?.content || ''
    console.log('OpenAI response:', responseText)

    // Parse the response into JSON
    let insights
    try {
      insights = JSON.parse(responseText)
    } catch (e) {
      console.error('Failed to parse OpenAI response:', e)
      // Provide a structured fallback if parsing fails
      insights = {
        growthAnalysis: responseText.substring(0, 200),
        businessStrategy: "Strategy analysis unavailable",
        performanceMetrics: "Metrics analysis unavailable"
      }
    }

    // Store the insight in the database
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { error: dbError } = await supabase
      .from('business_insights')
      .insert({
        user_id: userId,
        insight_type: 'general',
        content: JSON.stringify(insights),
      })

    if (dbError) {
      console.error('Database error:', dbError)
      throw new Error('Failed to store insight')
    }

    // Return the response with CORS headers
    return new Response(
      JSON.stringify({
        insight: {
          insights: insights
        }
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    )
  }
})