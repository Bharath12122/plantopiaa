import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PlantUploadProps {
  onUploadSuccess: (plantData: any) => void;
}

export const PlantUpload = ({ onUploadSuccess }: PlantUploadProps) => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // Check if user is authenticated
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("You must be logged in to upload files");
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;

      // Upload file to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from('plant-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Get the public URL for the uploaded image
      const { data: { publicUrl } } = supabase.storage
        .from('plant-images')
        .getPublicUrl(fileName);

      // Simulate plant identification (in a real app, this would call an AI service)
      const identifiedPlant = {
        name: "Monstera Deliciosa",
        careTips: [
          "Water when top soil is dry",
          "Indirect bright light",
          "High humidity preferred",
        ],
        image: publicUrl
      };

      onUploadSuccess(identifiedPlant);

      toast({
        title: "Plant identified successfully!",
        description: "Scroll down to see the results.",
      });
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
    <div className="max-w-md mx-auto mb-16 p-6 bg-white rounded-lg shadow-lg animate-fade-in">
      <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
      <p className="text-gray-600 mb-4">Upload a photo of your plant for instant identification</p>
      <div className="relative">
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
          id="plant-upload"
          disabled={isUploading}
        />
        <Button
          asChild
          className="w-full bg-green-500 hover:bg-green-600"
          disabled={isUploading}
        >
          <label htmlFor="plant-upload" className="cursor-pointer">
            <Upload className="mr-2" />
            {isUploading ? "Uploading..." : "Upload Plant Image"}
          </label>
        </Button>
      </div>
    </div>
  );
};