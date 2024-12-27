import { useState } from "react";
import { Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAnonymousInteractions } from "@/hooks/useAnonymousInteractions";
import { LanguageSelector } from "./LanguageSelector";

interface PlantUploadProps {
  onUploadSuccess: (plantData: any) => void;
}

export const PlantUpload = ({ onUploadSuccess }: PlantUploadProps) => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const { interactionCount, trackInteraction } = useAnonymousInteractions();
  const FREE_SCANS_LIMIT = 3;

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
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

      // Get user's language preference
      const { data: profile } = await supabase
        .from('profiles')
        .select('preferred_language')
        .eq('id', session.user.id)
        .single();

      const language = profile?.preferred_language || 'en';

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
              language: language // Pass language preference to the function
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
            language: language
          };

          onUploadSuccess(plantData);

          toast({
            title: "Plant identified successfully!",
            description: "Scroll down to see the results.",
          });
        } catch (error: any) {
          console.error("Processing error:", error);
          toast({
            title: "Failed to identify plant",
            description: error.message || "Please try again later.",
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
    }
  };

  return (
    <div className="max-w-md mx-auto mb-16 p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Get Started</h2>
        <LanguageSelector />
      </div>
      <p className="text-gray-600 mb-4">Upload a photo of your plant for instant identification</p>
      
      <div className="mb-4">
        <Progress 
          value={(interactionCount / FREE_SCANS_LIMIT) * 100} 
          className="h-2"
        />
        <p className="text-sm text-gray-500 mt-2">
          {FREE_SCANS_LIMIT - interactionCount} free scans remaining
        </p>
      </div>

      <div className="relative">
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
          id="plant-upload"
          disabled={isUploading || interactionCount >= FREE_SCANS_LIMIT}
        />
        <Button
          asChild
          className="w-full bg-green-500 hover:bg-green-600"
          disabled={isUploading || interactionCount >= FREE_SCANS_LIMIT}
        >
          <label htmlFor="plant-upload" className="cursor-pointer flex items-center justify-center">
            {isUploading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Upload className="mr-2 h-4 w-4" />
            )}
            {isUploading ? "Processing..." : "Upload Plant Image"}
          </label>
        </Button>
      </div>
    </div>
  );
};