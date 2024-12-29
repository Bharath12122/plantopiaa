import React from 'react';
import { Upload, Loader2, Leaf } from 'lucide-react';
import { cn } from "@/lib/utils";

interface DesktopUploadProps {
  isUploading: boolean;
  onUploadClick: () => void;
  remainingScans: number;
  maxScans: number;
}

export const DesktopUpload = ({ 
  isUploading, 
  onUploadClick,
  remainingScans,
  maxScans 
}: DesktopUploadProps) => {
  return (
    <div className={cn(
      "relative w-full p-8 rounded-xl border-2 border-dashed",
      "border-[#a2d96e]/50 hover:border-[#a2d96e]",
      "bg-[#F2FCE2]/10 backdrop-blur-sm transition-colors"
    )}>
      <div className="text-center">
        {isUploading ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-16 h-16 text-[#a2d96e] animate-spin" />
            <p className="text-gray-600">Processing your image...</p>
          </div>
        ) : (
          <>
            {/* Floating Leaves Animation */}
            {[...Array(3)].map((_, i) => (
              <Leaf
                key={i}
                className={cn(
                  "absolute w-6 h-6 text-[#a2d96e]/30",
                  "animate-float",
                  i === 0 && "top-4 left-4",
                  i === 1 && "top-4 right-4",
                  i === 2 && "bottom-4 left-1/2"
                )}
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            ))}
            
            <Upload className="w-16 h-16 text-[#a2d96e] mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Upload Plant Image</h2>
            <p className="text-gray-600 mb-6">
              Drag and drop your image here or click to browse
            </p>
            <button
              onClick={onUploadClick}
              className={cn(
                "bg-[#a2d96e] text-white px-6 py-3 rounded-lg",
                "font-semibold hover:bg-[#8bc952] transition-all",
                "inline-flex items-center gap-2"
              )}
            >
              Select Image <Upload className="w-5 h-5" />
            </button>
            <p className="text-sm text-gray-500 mt-4">
              {remainingScans} of {maxScans} free scans remaining
            </p>
          </>
        )}
      </div>
    </div>
  );
};