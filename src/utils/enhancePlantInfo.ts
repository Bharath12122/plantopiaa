import { supabase } from "@/integrations/supabase/client";

export const getEnhancedPlantInfo = async (plantName: string, scientificName: string, basicInfo: string) => {
  try {
    console.log('Calling enhance-plant-info function with:', { plantName, scientificName, basicInfo });
    
    const { data, error } = await supabase.functions.invoke('enhance-plant-info', {
      body: { 
        plantName,
        scientificName,
        basicInfo
      }
    });

    if (error) {
      console.error('Error getting enhanced plant info:', error);
      throw error;
    }

    console.log('Enhanced plant info response:', data);
    return data.benefits || [];
  } catch (error) {
    console.error('Error in getEnhancedPlantInfo:', error);
    return ["No documented health benefits have been verified for this plant. Always consult healthcare professionals before using any plant for medicinal purposes."];
  }
};