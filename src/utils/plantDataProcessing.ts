export const processPlantData = (plantInfo: any, publicUrl: string) => {
  const description = plantInfo.plant_details?.wiki_description?.value || 
    "This plant's detailed description is currently being researched.";

  return {
    name: plantInfo.plant_name || plantInfo.common_names?.[0] || "Unknown Plant",
    scientificName: plantInfo.scientific_name || plantInfo.plant_details?.scientific_name || "Species unknown",
    description,
    careTips: [
      `Watering: ${plantInfo.plant_details?.watering || 'Water when top soil feels dry'}`,
      `Light: ${plantInfo.plant_details?.sunlight || 'Provide adequate light based on species'}`,
      `Soil: ${plantInfo.plant_details?.soil || 'Use well-draining potting mix'}`,
      `Temperature: ${plantInfo.plant_details?.temperature || 'Maintain room temperature'}`,
      `Humidity: ${plantInfo.plant_details?.humidity || 'Average household humidity'}`,
      ...(plantInfo.plant_details?.propagation_methods || []),
      ...(plantInfo.plant_details?.care_instructions || [])
    ].filter(Boolean),
    image: publicUrl,
    uses: [
      ...(plantInfo.plant_details?.edible_parts || []),
      ...(plantInfo.plant_details?.medicinal_properties || []),
      ...(plantInfo.plant_details?.economic_uses || []),
      "Decorative plant for indoor or outdoor spaces",
    ].filter(Boolean),
    healthBenefits: [] // Will be populated by enhance-plant-info
  };
};