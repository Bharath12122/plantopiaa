import React, { useState } from "react";
import { useProStatus } from "@/hooks/useProStatus";
import { ProFeatures } from "@/components/pro/ProFeatures";
import { ProOnboarding } from "@/components/pro/onboarding/ProOnboarding";
import { PlantUpload } from "@/components/PlantUpload";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Pro = () => {
  const navigate = useNavigate();
  const { isPro, isLoading, error } = useProStatus();
  const [identifiedPlant, setIdentifiedPlant] = useState<any>(null);

  if (error) {
    toast.error("Failed to verify Pro status. Please try again.");
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            There was an error loading your Pro status. Please refresh the page or contact support.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-plant-premium"></div>
      </div>
    );
  }

  if (!isPro) {
    return (
      <div className="min-h-screen bg-[#1A1F2C] py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">
            Upgrade to Pro
          </h1>
          <ProOnboarding />
        </div>
      </div>
    );
  }

  const handleUploadSuccess = (plantData: any) => {
    setIdentifiedPlant(plantData);
    toast.success("Plant identified successfully!");
  };

  return (
    <div className="min-h-screen bg-[#1A1F2C] py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Pro Plant Identification
        </h1>
        
        {/* Plant Upload Section */}
        <div className="mb-16">
          <PlantUpload onUploadSuccess={handleUploadSuccess} />
        </div>

        {/* Pro Features Section */}
        <ProFeatures />
      </div>
    </div>
  );
};

export default Pro;