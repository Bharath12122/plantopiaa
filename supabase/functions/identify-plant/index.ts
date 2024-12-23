import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

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
    const { image } = await req.json()

    if (!image) {
      throw new Error('No image provided')
    }

    const plantIdApiKey = Deno.env.get('PLANT_ID_API_KEY')
    
    if (!plantIdApiKey) {
      throw new Error('Plant.ID API key not configured')
    }

    console.log('Calling Plant.ID API...')
    
    const response = await fetch('https://api.plant.id/v2/identify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': plantIdApiKey,
      },
      body: JSON.stringify({
        images: [image],
        plant_details: ["common_names", "url", "wiki_description", "taxonomy", "synonyms", "edible_parts", "propagation_methods"],
      }),
    })

    if (!response.ok) {
      console.error('Plant.ID API error:', await response.text())
      throw new Error('Failed to identify plant')
    }

    const data = await response.json()
    console.log('Plant.ID API response received')

    return new Response(
      JSON.stringify(data),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in identify-plant function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})