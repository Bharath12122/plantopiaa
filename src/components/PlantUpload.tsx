import { useState, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAnonymousInteractions } from "@/hooks/useAnonymousInteractions";
import { UploadHeader } from "./upload/UploadHeader";
import { FileInput } from "./upload/FileInput";
import { DesktopUpload } from "./upload/DesktopUpload";
import { UploadProgress } from "./upload/UploadProgress";
import { useQuery } from "@tanstack/react-query";

interface PlantUploadProps {
  onUploadSuccess: (plantData: any) => void;
}

// Cache key for rate limiting
const RATE_LIMIT_KEY = 'plant_upload_rate_limit';
const RATE_LIMIT_DURATION = 60000; // 1 minute
const MAX_REQUESTS = 5; // 5 requests per minute

export const PlantUpload = ({ onUploadSuccess }: PlantUploadProps) => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const { interactionCount, trackInteraction } = useAnonymousInteractions();
  const FREE_SCANS_LIMIT = 3;
  const [currentLanguage, setCurrentLanguage] = useState("en");

  // Cache translations using React Query
  const { data: cachedTranslations } = useQuery({
    queryKey: ['translations', currentLanguage],
    queryFn: async () => {
      const stored = localStorage.getItem(`translations_${currentLanguage}`);
      if (stored) return JSON.parse(stored);
      return null;
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  // Rate limiting check
  const checkRateLimit = useCallback(() => {
    const now = Date.now();
    const stored = localStorage.getItem(RATE_LIMIT_KEY);
    let requests = stored ? JSON.parse(stored) : [];
    
    // Remove old requests
    requests = requests.filter((time: number) => now - time < RATE_LIMIT_DURATION);
    
    if (requests.length >= MAX_REQUESTS) {
      return false;
    }
    
    requests.push(now);
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(requests));
    return true;
  }, []);

  // Image optimization
  const optimizeImage = async (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      img.onload = () => {
        // Max dimensions
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;
        
        let width = img.width;
        let height = img.height;
        
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        ctx?.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            }));
          } else {
            reject(new Error('Image optimization failed'));
          }
        }, 'image/jpeg', 0.8); // 80% quality
      };
      
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  };

  const translatePlantData = async (plantData: any, targetLanguage: string) => {
    // Check cache first
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
      
      // Cache the result
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

  const handleLanguageChange = async (language: string) => {
    setCurrentLanguage(language);
  };

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    if (!checkRateLimit()) {
      toast({
        title: "Rate limit exceeded",
        description: "Please wait a moment before trying again",
        variant: "destructive",
      });
      return;
    }

    if (interactionCount >= FREE_SCANS_LIMIT) {
      toast({
        title: "Free scan limit reached",
        description: "Upgrade to Pro for unlimited plant scans!",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      const optimizedFile = await optimizeImage(file);
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("You must be logged in to upload files");
      }

      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const base64Image = e.target?.result?.toString().split(',')[1];
          
          if (!base64Image) {
            throw new Error("Failed to process image");
          }

          console.log('Calling identify-plant function...');
          
          const { data, error } = await supabase.functions.invoke('identify-plant', {
            body: { 
              image: base64Image,
              language: currentLanguage
            }
          });

          if (error) throw error;

          if (!data || !data.suggestions || data.suggestions.length === 0) {
            throw new Error("No plant matches found");
          }

          console.log('Plant identification successful:', data);

          const plantInfo = data.suggestions[0];
          
          const fileExt = optimizedFile.name.split('.').pop();
          const fileName = `${crypto.randomUUID()}.${fileExt}`;

          const { error: uploadError, data: uploadData } = await supabase.storage
            .from('plant-images')
            .upload(fileName, optimizedFile);

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from('plant-images')
            .getPublicUrl(fileName);

          await trackInteraction('plant_scan');

          // Enhanced plant data processing with improved health benefits
          const plantData = {
            name: plantInfo.plant_name || plantInfo.common_names?.[0] || "Unknown Plant",
            scientificName: plantInfo.scientific_name || plantInfo.plant_details?.scientific_name || "Species unknown",
            description: plantInfo.plant_details?.wiki_description?.value || 
                        "This plant's detailed description is currently being researched.",
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
            healthBenefits: [
              ...(plantInfo.plant_details?.health_benefits || []),
              ...(plantInfo.plant_details?.nutritional_value || []),
              ...(plantInfo.plant_details?.medicinal_properties || []),
            ].filter(Boolean).length > 0 
              ? [
                  ...(plantInfo.plant_details?.health_benefits || []),
                  ...(plantInfo.plant_details?.nutritional_value || []),
                  ...(plantInfo.plant_details?.medicinal_properties || []),
                ].filter(Boolean)
              : ["No documented health benefits have been verified for this plant. Always consult healthcare professionals before using any plant for medicinal purposes."],
            language: currentLanguage
          };

          const translatedData = await translatePlantData(plantData, currentLanguage);
          onUploadSuccess(translatedData);

          const endTime = performance.now();
          console.log(`Upload and processing completed in ${endTime}ms`);

          toast({
            title: "Plant identified successfully!",
            description: "Scroll down to see the detailed results.",
          });
        } catch (error: any) {
          console.error("Processing error:", error);
          toast({
            title: "Failed to identify plant",
            description: error.message || "Please try again with a clearer image.",
            variant: "destructive",
          });
        }
      };

      reader.readAsDataURL(optimizedFile);
    } catch (error: any) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleUploadClick = () => {
    document.getElementById('plant-upload')?.click();
  };

  return (
    <div className="max-w-md mx-auto mb-16 p-6 bg-white rounded-lg shadow-lg">
      <UploadHeader onLanguageChange={handleLanguageChange} />
      
      <p className="text-gray-600 mb-4">
        Upload a clear photo of your plant for detailed identification
      </p>
      
      <UploadProgress 
        current={interactionCount} 
        max={FREE_SCANS_LIMIT} 
      />

      <div className="relative">
        <FileInput 
          onFileSelect={handleFileUpload}
          disabled={isUploading || interactionCount >= FREE_SCANS_LIMIT}
        />
        
        <DesktopUpload 
          isUploading={isUploading}
          onUploadClick={handleUploadClick}
          remainingScans={FREE_SCANS_LIMIT - interactionCount}
          maxScans={FREE_SCANS_LIMIT}
        />
      </div>
    </div>
  );
};
