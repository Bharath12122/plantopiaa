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
    const { plantData, targetLanguage } = await req.json()

    // If the target language is English, return the original data
    if (targetLanguage === 'en') {
      return new Response(
        JSON.stringify({ translatedData: plantData }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Prepare the texts to translate
    const textsToTranslate = [
      plantData.name,
      plantData.description,
      ...plantData.careTips,
      ...plantData.uses
    ].filter(Boolean) // Remove any null/undefined values

    // Call Microsoft Translator API
    const endpoint = 'https://api.cognitive.microsofttranslator.com'
    const region = 'eastus' // Replace with your Azure region

    const response = await fetch(`${endpoint}/translate?api-version=3.0&to=${targetLanguage}`, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': Deno.env.get('AZURE_TRANSLATOR_KEY') || '',
        'Ocp-Apim-Subscription-Region': region,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        textsToTranslate.map(text => ({
          text
        }))
      )
    })

    const translations = await response.json()

    // Update the plant data with translations
    const translatedData = {
      ...plantData,
      name: translations[0].translations[0].text,
      description: translations[1].translations[0].text,
      careTips: plantData.careTips.map((_, index) => 
        translations[index + 2].translations[0].text
      ),
      uses: plantData.uses.map((_, index) => 
        translations[index + 2 + plantData.careTips.length].translations[0].text
      )
    }

    return new Response(
      JSON.stringify({ translatedData }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Translation error:', error)
    return new Response(
      JSON.stringify({ error: 'Translation failed', details: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})