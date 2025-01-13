import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export const translatePlantData = async (plantData: any, targetLanguage: string) => {
  const cacheKey = `translation_${JSON.stringify(plantData)}_${targetLanguage}`;
  const cached = localStorage.getItem(cacheKey);
  
  if (cached) {
    console.log('Using cached translation');
    return JSON.parse(cached);
  }

  try {
    const { data, error } = await supabase.functions.invoke('translate-plant-data', {
      body: { 
        plantData,
        targetLanguage
      }
    });

    if (error) throw error;
    
    localStorage.setItem(cacheKey, JSON.stringify(data.translatedData));
    return data.translatedData;
  } catch (error) {
    console.error('Translation error:', error);
    toast({
      title: "Translation failed",
      description: "Showing results in English",
      variant: "destructive",
    });
    return plantData;
  }
};