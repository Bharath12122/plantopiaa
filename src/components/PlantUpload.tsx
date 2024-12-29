import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAnonymousInteractions } from "@/hooks/useAnonymousInteractions";
import { LanguageSelector } from "./LanguageSelector";
import { useIsMobile } from "@/hooks/use-mobile";
import { FloraLensScanner } from "./upload/FloraLensScanner";
import { DesktopUpload } from "./upload/DesktopUpload";
import { UploadProgress } from "./upload/UploadProgress";

interface PlantUploadProps {
  onUploadSuccess: (plantData: any) => void;
}

export const PlantUpload = ({ onUploadSuccess }: PlantUploadProps) => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const { interactionCount, trackInteraction } = useAnonymousInteractions();
  const FREE_SCANS_LIMIT = 3;
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const isMobile = useIsMobile();

  const translatePlantData = async (plantData: any, targetLanguage: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('translate-plant-data', {
        body: { 
          plantData,
          targetLanguage
        }
      });

      if (error) throw error;
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
          
          const fileExt = file.name.split('.').pop();
          const fileName = `${crypto.randomUUID()}.${fileExt}`;

          const { error: uploadError, data: uploadData } = await supabase.storage
            .from('plant-images')
            .upload(fileName, file);

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from('plant-images')
            .getPublicUrl(fileName);

          await trackInteraction('plant_scan');

          const plantData = {
            name: plantInfo.plant_name,
            scientificName: plantInfo.scientific_name || plantInfo.plant_details?.scientific_name,
            description: plantInfo.plant_details?.wiki_description?.value || "No description available",
            careTips: [
              "Water when top soil is dry",
              "Provide adequate light",
              "Maintain proper humidity",
              ...(plantInfo.plant_details?.propagation_methods || []),
            ],
            image: publicUrl,
            uses: plantInfo.plant_details?.edible_parts || ["Decorative"],
            language: currentLanguage
          };

          const translatedData = await translatePlantData(plantData, currentLanguage);
          onUploadSuccess(translatedData);

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

      reader.readAsDataURL(file);
    } catch (error: any) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setShowScanner(false);
    }
  };

  const handleUploadClick = () => {
    if (isMobile) {
      setShowScanner(true);
    } else {
      document.getElementById('plant-upload')?.click();
    }
  };

  const handleCapture = () => {
    document.getElementById('plant-upload')?.click();
  };

  return (
    <div className="max-w-md mx-auto mb-16 p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Get Started</h2>
        <LanguageSelector onLanguageChange={handleLanguageChange} />
      </div>
      
      <p className="text-gray-600 mb-4">
        Upload a clear photo of your plant for detailed identification
      </p>
      
      <UploadProgress 
        current={interactionCount} 
        max={FREE_SCANS_LIMIT} 
      />

      <div className="relative">
        <Input
          type="file"
          accept="image/*"
          capture={isMobile ? "environment" : undefined}
          onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
          className="hidden"
          id="plant-upload"
          disabled={isUploading || interactionCount >= FREE_SCANS_LIMIT}
        />
        
        <DesktopUpload 
          isUploading={isUploading}
          onUploadClick={handleUploadClick}
          remainingScans={FREE_SCANS_LIMIT - interactionCount}
          maxScans={FREE_SCANS_LIMIT}
        />
      </div>

      {showScanner && (
        <FloraLensScanner
          onClose={() => setShowScanner(false)}
          onCapture={handleCapture}
        />
      )}
    </div>
  );
};
