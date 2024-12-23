import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Configuration, OpenAIApi } from 'https://esm.sh/openai@3.3.0'

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

    // Validate input
    if (!keyword || !userId) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Initialize OpenAI
    const configuration = new Configuration({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    })
    const openai = new OpenAIApi(configuration)

    console.log(`Generating insights for keyword: ${keyword}`)

    try {
      const completion = await openai.createChatCompletion({
        model: "gpt-4o-mini",
        messages: [{
          role: "system",
          content: "You are a business analyst specializing in plant and agriculture businesses. Provide concise, actionable insights."
        }, {
          role: "user",
          content: `Generate business insights for ${keyword}. Include market trends, growth tips, and cost analysis. Keep it concise and specific to the topic.`
        }],
        max_tokens: 500,
        temperature: 0.7,
      })

      const insight = completion.data.choices[0]?.message?.content || "No insights available for this topic. Please try another keyword."

      console.log('Successfully generated insight')

      return new Response(
        JSON.stringify({ insight }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )

    } catch (error) {
      console.error('OpenAI API error:', error)
      
      // Check if it's a quota error
      if (error.response?.status === 429 || error.message?.includes('quota')) {
        return new Response(
          JSON.stringify({ 
            error: 'OpenAI API quota exceeded',
            isQuotaError: true,
            details: error.toString()
          }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 429
          }
        )
      }

      throw error
    }

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})