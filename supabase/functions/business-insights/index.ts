import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import OpenAI from "https://esm.sh/openai@4.28.0"

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

    // Initialize OpenAI with the latest API version
    const openai = new OpenAI({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    })

    // Check if user has made too many requests recently
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { count } = await supabase
      .from('business_insights')
      .select('*', { count: 'exact' })
      .eq('user_id', userId)
      .gte('created_at', new Date(Date.now() - 60000).toISOString()) // Last minute
      .single()

    if (count && count > 5) {
      console.log('Rate limit exceeded for user:', userId)
      return new Response(
        JSON.stringify({
          error: "Rate limit exceeded. Please wait a minute before trying again.",
          code: "RATE_LIMIT_ERROR"
        }),
        { 
          status: 429,
          headers: { 
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      )
    }

    try {
      // Generate business insights using OpenAI
      const prompt = `Generate business insights for ${keyword}. Include growth analysis, business strategy, and performance metrics. Format the response as JSON with these three sections.`
      
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
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

      const responseText = completion.choices[0].message?.content || ''
      console.log('OpenAI response:', responseText)

      // Parse the response into JSON
      let insights
      try {
        insights = JSON.parse(responseText)
      } catch (e) {
        console.error('Failed to parse OpenAI response:', e)
        insights = {
          growthAnalysis: responseText.substring(0, 200),
          businessStrategy: "Strategy analysis unavailable",
          performanceMetrics: "Metrics analysis unavailable"
        }
      }

      // Store the insight in the database
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

    } catch (openAiError: any) {
      console.error('OpenAI API error:', openAiError)
      
      if (openAiError.status === 429 || (openAiError.error && openAiError.error.includes('429'))) {
        return new Response(
          JSON.stringify({ 
            error: "Service is currently busy. Please try again in a few minutes.",
            code: "RATE_LIMIT_ERROR"
          }),
          { 
            status: 429,
            headers: { 
              ...corsHeaders,
              'Content-Type': 'application/json',
            },
          },
        )
      }
      
      throw openAiError
    }

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: "An error occurred while generating business insights."
      }),
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