import React, { useEffect } from 'react';
import { Leaf, Flower, Droplets } from 'lucide-react';
import { cn } from "@/lib/utils";

interface FloraLensScannerProps {
  onClose: () => void;
  onCapture: () => void;
}

export const FloraLensScanner = ({ onClose, onCapture }: FloraLensScannerProps) => {
  useEffect(() => {
    // Play ambient nature sound
    const audio = new Audio('/sounds/leaves-rustling.mp3');
    audio.volume = 0.2;
    audio.play().catch(() => {
      // Silently fail if audio autoplay is blocked
      console.log('Audio autoplay was prevented');
    });
    
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-green-900/40 via-emerald-800/30 to-blue-900/40 backdrop-blur-lg">
      <div className="relative h-full w-full flex flex-col items-center justify-center p-4">
        {/* Scanner Frame */}
        <div className={cn(
          "relative w-full max-w-sm aspect-square rounded-lg",
          "border-2 border-[#a2d96e] animate-glow",
          "bg-gradient-to-b from-[#F2FCE2]/10 to-transparent",
          "overflow-hidden"
        )}>
          {/* Dynamic Vein Patterns */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute inset-0 opacity-0 animate-vein-flow"
                style={{
                  animationDelay: `${i * 0.6}s`,
                  background: `linear-gradient(${i * 72}deg, transparent, rgba(162, 217, 110, 0.2), transparent)`
                }}
              />
            ))}
          </div>

          {/* Floating Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(12)].map((_, i) => {
              const ParticleIcon = i % 3 === 0 ? Leaf : i % 3 === 1 ? Flower : Droplets;
              const size = Math.random() * 16 + 8;
              const tx = (Math.random() - 0.5) * 200;
              const ty = -Math.random() * 200;
              
              return (
                <ParticleIcon
                  key={i}
                  className="absolute text-[#FEF7CD]/40 animate-particle-float"
                  style={{
                    '--tx': `${tx}px`,
                    '--ty': `${ty}px`,
                    width: size,
                    height: size,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.3}s`
                  } as React.CSSProperties}
                />
              );
            })}
          </div>

          {/* Scanning Animation */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#a2d96e] to-transparent animate-scan" />
          
          {/* Progress Vine */}
          <div className="absolute bottom-0 left-0 w-full h-1.5 bg-black/10 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#a2d96e] to-[#ffd700] animate-grow-vine" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4">
          <button
            onClick={onCapture}
            className="px-6 py-3 bg-[#a2d96e] text-white rounded-lg font-medium hover:bg-[#8bc952] transition-all shadow-lg hover:shadow-xl hover:scale-105"
          >
            Take Photo
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-600/80 text-white rounded-lg font-medium hover:bg-gray-700 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};