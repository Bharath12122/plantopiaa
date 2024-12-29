import React from 'react';
import { Progress } from "@/components/ui/progress";

interface UploadProgressProps {
  current: number;
  max: number;
}

export const UploadProgress = ({ current, max }: UploadProgressProps) => {
  return (
    <div className="mb-4">
      <Progress 
        value={(current / max) * 100} 
        className="h-2"
      />
      <p className="text-sm text-gray-500 mt-2">
        {max - current} free scans remaining
      </p>
    </div>
  );
};