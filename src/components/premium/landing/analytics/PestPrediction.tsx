import { useState } from "react";
import { Upload, AlertCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";

export const PestPrediction = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [prediction, setPrediction] = useState<any>(null);

  const handleImageUpload = async (file: File) => {
    try {
      setIsAnalyzing(true);
      
      // Upload image to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('plant-images')
        .upload(`pest-analysis/${Date.now()}-${file.name}`, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('plant-images')
        .getPublicUrl(uploadData.path);

      // Call pest prediction function
      const { data, error } = await supabase.functions.invoke('analyze-plant-health', {
        body: { imageUrl: publicUrl }
      });

      if (error) throw error;

      setPrediction(data);
      toast.success("Analysis complete!");

    } catch (error: any) {
      console.error('Error analyzing image:', error);
      toast.error(error.message || "Failed to analyze image");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-[#2A3B1D] mb-2">
          Pest & Disease Detection
        </h3>
        <p className="text-gray-600">
          Upload plant images for instant pest and disease analysis
        </p>
      </div>

      <Card className="p-6 relative">
        <input
          type="file"
          id="pest-image-upload"
          className="hidden"
          accept="image/*"
          onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
          disabled={isAnalyzing}
        />

        <div className="text-center">
          {isAnalyzing ? (
            <div className="flex flex-col items-center justify-center space-y-4">
              <Loader2 className="w-12 h-12 text-green-500 animate-spin" />
              <p className="text-gray-600">Analyzing your plant...</p>
            </div>
          ) : (
            <>
              <Upload className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <button
                onClick={() => document.getElementById('pest-image-upload')?.click()}
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
              >
                Upload Plant Image
              </button>
            </>
          )}
        </div>

        {prediction && (
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-green-600 mt-1" />
              <div>
                <h4 className="font-semibold text-green-800">Analysis Results</h4>
                <p className="text-green-700 mt-1">{prediction.diagnosis}</p>
                {prediction.recommendations && (
                  <ul className="mt-2 space-y-1 text-sm text-green-600">
                    {prediction.recommendations.map((rec: string, i: number) => (
                      <li key={i}>• {rec}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};