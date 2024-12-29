import React from 'react';
import { Leaf } from 'lucide-react';

interface ScannerOverlayProps {
  onClose: () => void;
  onCapture: () => void;
}

export const ScannerOverlay = ({ onClose, onCapture }: ScannerOverlayProps) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
      <div className="relative h-full w-full flex flex-col items-center justify-center p-4">
        {/* Scanner Frame */}
        <div className="relative w-full max-w-sm aspect-square rounded-lg border-2 border-plant-pro animate-glow">
          {/* Corner Leaves */}
          <Leaf className="absolute -top-4 -left-4 w-8 h-8 text-plant-pro rotate-45" />
          <Leaf className="absolute -top-4 -right-4 w-8 h-8 text-plant-pro -rotate-45" />
          <Leaf className="absolute -bottom-4 -left-4 w-8 h-8 text-plant-pro rotate-[135deg]" />
          <Leaf className="absolute -bottom-4 -right-4 w-8 h-8 text-plant-pro -rotate-[135deg]" />
          
          {/* Scanning Animation */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-plant-pro to-transparent animate-scan" />
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4">
          <button
            onClick={onCapture}
            className="px-6 py-3 bg-plant-pro text-white rounded-lg font-medium hover:bg-plant-pro-dark transition-colors"
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