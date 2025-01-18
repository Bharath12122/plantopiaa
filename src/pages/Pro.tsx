import { useState } from "react";
import { useProStatus } from "@/hooks/useProStatus";
import { ProFeatures } from "@/components/pro/ProFeatures";
import { ProOnboarding } from "@/components/pro/onboarding/ProOnboarding";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlantUpload } from "@/components/PlantUpload";
import { PlantResults } from "@/components/PlantResults";

const Pro = () => {
  const navigate = useNavigate();
  const { isPro, isLoading, error } = useProStatus();
  const [identifiedPlant, setIdentifiedPlant] = useState<any>(null);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1A1F2C] flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#9b87f5]"></div>
      </div>
    );
  }

  if (error) {
    toast.error("Failed to verify Pro status. Please try again later.");
    return (
      <div className="min-h-screen bg-[#1A1F2C] p-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error}
          </AlertDescription>
        </Alert>
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
          <Button 
            onClick={() => navigate("/")}
            className="mb-8 bg-[#9b87f5] hover:bg-[#7E69AB] mx-auto block"
          >
            Back to Home
          </Button>
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
        <Button 
          onClick={() => navigate("/")}
          className="mb-8 bg-[#9b87f5] hover:bg-[#7E69AB]"
        >
          Back to Home
        </Button>
        <h1 className="text-4xl font-bold text-white mb-8">
          Pro Features
        </h1>
        <div className="space-y-8">
          <PlantUpload onUploadSuccess={handleUploadSuccess} />
          {identifiedPlant && <PlantResults plant={identifiedPlant} />}
          <ProFeatures />
        </div>
      </div>
    </div>
  );
};

export default Pro;