import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAnonymousInteractions } from "@/hooks/useAnonymousInteractions";
import { useProStatus } from "@/hooks/useProStatus";
import { UploadHeader } from "./upload/UploadHeader";
import { FileInput } from "./upload/FileInput";
import { DesktopUpload } from "./upload/DesktopUpload";
import { UploadProgress } from "./upload/UploadProgress";
import { Badge } from "@/components/ui/badge";
import { Infinity } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { processPlantData } from "@/utils/plantDataProcessing";
import { getEnhancedPlantInfo } from "@/utils/enhancePlantInfo";
import { savePlantOffline, syncOfflinePlants } from "@/utils/offlineStorage";
import { optimizeImage } from "./upload/ImageOptimizer";
import { translatePlantData } from "./upload/PlantTranslator";
import { checkRateLimit } from "./upload/RateLimit";
import { toast } from "sonner";

interface PlantUploadProps {
  onUploadSuccess: (plantData: any) => void;
}

export const PlantUpload = ({ onUploadSuccess }: PlantUploadProps) => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const { interactionCount, trackInteraction } = useAnonymousInteractions();
  const { isPro } = useProStatus();
  const FREE_SCANS_LIMIT = 10; // Updated from 3 to 10
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (isPro) {
        syncOfflinePlants().then(success => {
          if (success) {
            toast({
              title: "Plants synced successfully",
              description: "Your offline plants have been synced to your account.",
            });
          }
        });
      }
    };
    
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isPro]);

  const { data: cachedTranslations } = useQuery({
    queryKey: ['translations', currentLanguage],
    queryFn: async () => {
      const stored = localStorage.getItem(`translations_${currentLanguage}`);
      if (stored) return JSON.parse(stored);
      return null;
    },
    staleTime: 1000 * 60 * 60,
  });

  const handleLanguageChange = async (language: string) => {
    setCurrentLanguage(language);
  };

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    // Check scan limit only for non-pro users
    if (!isPro && interactionCount >= FREE_SCANS_LIMIT) {
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
      if (!session && !isPro) {
        throw new Error("You must be logged in to upload files");
      }

      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const base64Image = e.target?.result?.toString().split(',')[1];
          
          if (!base64Image) {
            throw new Error("Failed to process image");
          }

          let plantData;
          
          if (!isOnline && isPro) {
            const cachedResponse = localStorage.getItem('last_plant_response');
            if (cachedResponse) {
              plantData = JSON.parse(cachedResponse);
              toast({
                title: "Offline mode",
                description: "Using cached plant data. Will sync when online.",
              });
            } else {
              throw new Error("No cached data available offline");
            }
          } else {
            const { data, error } = await supabase.functions.invoke('identify-plant', {
              body: { 
                image: base64Image,
                language: currentLanguage
              }
            });

            if (error) throw error;
            plantData = data;
            
            if (isPro) {
              localStorage.setItem('last_plant_response', JSON.stringify(data));
            }
          }

          if (!plantData || !plantData.suggestions || plantData.suggestions.length === 0) {
            throw new Error("No plant matches found");
          }

          const plantInfo = plantData.suggestions[0];
          
          const fileExt = optimizedFile.name.split('.').pop();
          const fileName = `${crypto.randomUUID()}.${fileExt}`;

          let publicUrl = '';
          
          if (isOnline) {
            const { error: uploadError, data: uploadData } = await supabase.storage
              .from('plant-images')
              .upload(fileName, optimizedFile);

            if (uploadError) throw uploadError;

            const { data: { publicUrl: url } } = supabase.storage
              .from('plant-images')
              .getPublicUrl(fileName);
              
            publicUrl = url;
          } else {
            publicUrl = URL.createObjectURL(optimizedFile);
          }

          await trackInteraction('plant_scan');

          const basicPlantData = processPlantData(plantInfo, publicUrl);
          
          // Enhanced info for Pro users
          let healthBenefits = [];
          if (isPro) {
            healthBenefits = await getEnhancedPlantInfo(
              basicPlantData.name,
              basicPlantData.scientificName,
              basicPlantData.description
            );
          } else {
            healthBenefits = ["Upgrade to Pro to access detailed health benefits"];
          }

          const finalPlantData = {
            id: crypto.randomUUID(),
            name: basicPlantData.name,
            scientificName: basicPlantData.scientificName,
            description: basicPlantData.description,
            careTips: isPro ? basicPlantData.careTips : ["Upgrade to Pro for detailed care tips"],
            image: publicUrl,
            uses: isPro ? basicPlantData.uses : ["Upgrade to Pro for detailed uses"],
            healthBenefits
          };

          if (!isOnline && isPro) {
            await savePlantOffline(finalPlantData);
            toast({
              title: "Plant saved offline",
              description: "Will sync when internet connection is restored.",
            });
          }

          const translatedData = await translatePlantData(finalPlantData, currentLanguage);
          
          onUploadSuccess(translatedData);

          toast({
            title: "Plant identified successfully!",
            description: isOnline ? "Scroll down to see the detailed results." : "Results saved offline.",
          });

          if (isOnline && isPro) {
            const { data: collections } = await supabase
              .from('plant_collections')
              .select('id')
              .limit(1);

            if (collections && collections.length > 0) {
              await supabase
                .from('collection_entries')
                .insert([{
                  collection_id: collections[0].id,
                  plant_id: plantInfo.id,
                  category: 'Identified Plants',
                  growth_stage: 'Unknown'
                }]);
            }
          }

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
      <div className="flex justify-between items-center mb-4">
        <UploadHeader onLanguageChange={handleLanguageChange} />
        {isPro && (
          <Badge variant="secondary" className="bg-plant-pro text-white">
            <Infinity className="w-4 h-4 mr-1" />
            Pro
          </Badge>
        )}
      </div>
      
      <p className="text-gray-600 mb-4">
        Upload a clear photo of your plant for detailed identification
      </p>
      
      {!isPro && (
        <UploadProgress 
          current={interactionCount} 
          max={FREE_SCANS_LIMIT} 
        />
      )}

      <div className="relative">
        <FileInput 
          onFileSelect={handleFileUpload}
          disabled={isUploading || (!isPro && interactionCount >= FREE_SCANS_LIMIT)}
        />
        
        <DesktopUpload 
          isUploading={isUploading}
          onUploadClick={handleUploadClick}
          remainingScans={isPro ? null : FREE_SCANS_LIMIT - interactionCount}
          maxScans={FREE_SCANS_LIMIT}
        />
      </div>
    </div>
  );
};
