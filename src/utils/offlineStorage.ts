import { supabase } from "@/integrations/supabase/client";

interface StoredPlant {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  image: string;
  careTips: string[];
  uses: string[];
  healthBenefits: string[];
  syncStatus: 'synced' | 'pending';
  timestamp: number;
}

const STORAGE_KEY = 'pro_plants_offline';

export const savePlantOffline = async (plantData: Omit<StoredPlant, 'syncStatus' | 'timestamp'>) => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const plants: StoredPlant[] = stored ? JSON.parse(stored) : [];
    
    const newPlant: StoredPlant = {
      ...plantData,
      syncStatus: 'pending',
      timestamp: Date.now()
    };
    
    plants.push(newPlant);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plants));
    
    return true;
  } catch (error) {
    console.error('Error saving plant offline:', error);
    return false;
  }
};

export const getOfflinePlants = (): StoredPlant[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const syncOfflinePlants = async () => {
  try {
    const plants = getOfflinePlants();
    const pendingPlants = plants.filter(p => p.syncStatus === 'pending');
    
    for (const plant of pendingPlants) {
      const { error } = await supabase
        .from('plants')
        .insert([{
          name: plant.name,
          scientific_name: plant.scientificName,
          description: plant.description,
          image_url: plant.image,
          medicinal_uses: plant.healthBenefits,
        }]);
      
      if (!error) {
        plant.syncStatus = 'synced';
      }
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plants));
    return true;
  } catch (error) {
    console.error('Error syncing plants:', error);
    return false;
  }
};

export const clearOfflineStorage = () => {
  localStorage.removeItem(STORAGE_KEY);
};