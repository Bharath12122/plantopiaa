import { Upload, Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

export const ProUpload = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { toast } = useToast();

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    setPreviewImage(URL.createObjectURL(file));
    
    try {
      toast({
        title: "Processing image",
        description: "Your plant image is being analyzed...",
      });
      
      // Simulate processing time (remove in production)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    } catch (error) {
      toast({
        title: "Error processing image",
        description: "Please try again",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div 
      className={cn(
        "w-full max-w-2xl mx-auto mb-16 p-8 rounded-xl border-2 border-dashed",
        "border-[#9b87f5]/50 hover:border-[#9b87f5] transition-colors",
        "bg-[#1A1F2C] backdrop-blur-sm"
      )}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className="text-center">
        {isProcessing ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-16 h-16 text-[#9b87f5] animate-processing" />
            <p className="text-gray-300">Processing your image...</p>
          </div>
        ) : (
          <>
            <Upload className="w-16 h-16 text-[#9b87f5] mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Upload Plant Image</h2>
            <p className="text-gray-400 mb-6">
              Drag and drop your image here or click to browse
            </p>
          </>
        )}
        
        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept="image/*"
          onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
          disabled={isProcessing}
        />
        
        {!isProcessing && (
          <button
            onClick={() => document.getElementById('file-upload')?.click()}
            className="bg-[#9b87f5] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#7E69AB] transition-all inline-flex items-center gap-2"
            disabled={isProcessing}
          >
            Select Image <Upload className="w-5 h-5" />
          </button>
        )}
        
        {previewImage && !isProcessing && (
          <div className="mt-6 rounded-lg overflow-hidden shadow-xl">
            <img 
              src={previewImage} 
              alt="Preview" 
              className="max-w-full h-auto"
            />
          </div>
        )}
      </div>
    </div>
  );
};