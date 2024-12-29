import React from 'react';
import { Leaf } from 'lucide-react';
import { cn } from "@/lib/utils";

interface FloraLensScannerProps {
  onClose: () => void;
  onCapture: () => void;
}

export const FloraLensScanner = ({ onClose, onCapture }: FloraLensScannerProps) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md">
      <div className="relative h-full w-full flex flex-col items-center justify-center p-4">
        {/* Scanner Frame with Pulsating Border */}
        <div className={cn(
          "relative w-full max-w-sm aspect-square rounded-lg",
          "border-2 border-[#a2d96e] animate-glow",
          "bg-gradient-to-b from-[#F2FCE2]/10 to-transparent",
          "overflow-hidden"
        )}>
          {/* Floating Particles */}
          <div className="absolute inset-0">
            {[...Array(6)].map((_, i) => (
              <Leaf
                key={i}
                className={cn(
                  "absolute w-4 h-4 text-[#FEF7CD]/40",
                  "animate-float",
                  i % 2 === 0 ? "top-1/4" : "bottom-1/4",
                  i % 3 === 0 ? "left-1/4" : "right-1/4"
                )}
                style={{ animationDelay: `${i * 0.5}s` }}
              />
            ))}
          </div>

          {/* Corner Decorations */}
          <Leaf className="absolute -top-4 -left-4 w-8 h-8 text-[#a2d96e] rotate-45" />
          <Leaf className="absolute -top-4 -right-4 w-8 h-8 text-[#a2d96e] -rotate-45" />
          <Leaf className="absolute -bottom-4 -left-4 w-8 h-8 text-[#a2d96e] rotate-[135deg]" />
          <Leaf className="absolute -bottom-4 -right-4 w-8 h-8 text-[#a2d96e] -rotate-[135deg]" />
          
          {/* Scanning Animation */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#a2d96e] to-transparent animate-scan" />
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4">
          <button
            onClick={onCapture}
            className="px-6 py-3 bg-[#a2d96e] text-white rounded-lg font-medium hover:bg-[#8bc952] transition-colors"
          >
            Take Photo
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};