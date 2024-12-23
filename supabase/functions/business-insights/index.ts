import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

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
    const { userId, metricType, query } = await req.json();
    console.log('Received request:', { userId, metricType, query });

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Fetch relevant business metrics
    const { data: metrics, error: metricsError } = await supabaseClient
      .from('business_metrics')
      .select('*')
      .eq('user_id', userId)
      .order('metric_date', { ascending: false })
      .limit(10);

    if (metricsError) {
      console.error('Error fetching metrics:', metricsError);
      throw new Error('Failed to fetch business metrics');
    }

    console.log('Fetched metrics:', metrics);

    // Prepare data for OpenAI
    const prompt = `Based on the following business metrics:
      ${JSON.stringify(metrics)}
      
      ${query || 'Provide key business insights and recommendations'}`;

    console.log('Sending prompt to OpenAI:', prompt);

    // Call OpenAI API
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a business analytics expert specializing in plant nursery and cultivation businesses. Provide concise, actionable insights and recommendations.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
      }),
    });

    if (!openAIResponse.ok) {
      const errorData = await openAIResponse.text();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${errorData}`);
    }

    const aiData = await openAIResponse.json();
    console.log('OpenAI response:', aiData);

    if (!aiData.choices || !aiData.choices[0] || !aiData.choices[0].message) {
      console.error('Invalid OpenAI response format:', aiData);
      throw new Error('Invalid response from OpenAI');
    }

    const insight = aiData.choices[0].message.content;

    // Store the insight in the database
    const { error: insertError } = await supabaseClient
      .from('business_insights')
      .insert({
        user_id: userId,
        insight_type: metricType,
        content: insight,
        relevance_score: 0.95
      });

    if (insertError) {
      console.error('Error storing insight:', insertError);
      throw new Error('Failed to store business insight');
    }

    return new Response(
      JSON.stringify({ insight }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in business-insights function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.stack
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});