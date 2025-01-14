import { useState } from "react";
import { Upload } from "lucide-react";
import { toast } from "sonner";

export const ProUpload = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    toast("Coming Soon!", {
      description: "This feature will be available soon. Stay tuned!",
    });
  };

  const handleFileUpload = async (file: File) => {
    toast("Coming Soon!", {
      description: "This feature will be available soon. Stay tuned!",
    });
  };

  return (
    <div
      className={`border-2 border-dashed border-[#9b87f5]/30 rounded-xl p-8 text-center transition-all duration-300 hover:border-[#9b87f5]/50 ${
        isProcessing ? 'bg-[#1A1F2C]/50' : ''
      }`}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className="text-center">
        <Upload className="w-16 h-16 text-[#9b87f5] mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-4">Upload Plant Image</h2>
        <p className="text-gray-400 mb-6">
          Drag and drop your image here or click to browse
        </p>
        
        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept="image/*"
          onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
          disabled={isProcessing}
        />
        
        <button
          onClick={() => {
            toast("Coming Soon!", {
              description: "This feature will be available soon. Stay tuned!",
            });
          }}
          className="bg-[#9b87f5] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#7E69AB] transition-all inline-flex items-center gap-2"
          disabled={isProcessing}
        >
          Select Image <Upload className="w-5 h-5" />
        </button>
        
        {previewImage && !isProcessing && (
          <div className="mt-6 rounded-lg overflow-hidden shadow-xl">
            <img src={previewImage} alt="Preview" className="max-w-full h-auto" />
          </div>
        )}
      </div>
    </div>
  );
};