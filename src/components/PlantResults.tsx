import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Wifi, WifiOff } from "lucide-react";
import { useProStatus } from "@/hooks/useProStatus";

interface PlantResultsProps {
  plant: {
    name: string;
    scientificName: string;
    description: string;
    careTips: string[];
    image: string;
    uses: string[];
    healthBenefits: string[];
  };
}

export const PlantResults = ({ plant }: PlantResultsProps) => {
  const navigate = useNavigate();
  const { isPro } = useProStatus();
  const isOnline = navigator.onLine;
  
  if (!plant) return null;

  return (
    <div className="max-w-2xl mx-auto mb-16 space-y-6 animate-fade-in">
      {isPro && !isOnline && (
        <div className="flex items-center justify-center gap-2 text-yellow-600 bg-yellow-50 p-2 rounded-lg">
          <WifiOff className="w-4 h-4" />
          <span>Offline Mode - Changes will sync when online</span>
        </div>
      )}
      
      <Card className="p-6 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={plant.image}
            alt={plant.name}
            className="w-full md:w-1/2 rounded-lg object-cover h-[300px]"
          />
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-2xl font-semibold mb-1">
                {plant.name} 
                <span className="text-gray-500 text-lg ml-2">
                  ({plant.scientificName})
                </span>
              </h3>
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-2">About this Plant</h4>
              <p className="text-gray-600">{plant.description}</p>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h4 className="text-lg font-medium mb-4 flex items-center">
            <span className="mr-2">🌱</span>
            Detailed Care Guide
          </h4>
          <ul className="space-y-3">
            {plant.careTips.map((tip: string, index: number) => (
              <li key={index} className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span className="text-gray-700">{tip}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6">
          <h4 className="text-lg font-medium mb-4 flex items-center">
            <span className="mr-2">🎯</span>
            Common Uses & Benefits
          </h4>
          <ul className="space-y-3">
            {plant.uses.map((use: string, index: number) => (
              <li key={index} className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span className="text-gray-700">{use}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="p-6">
        <h4 className="text-lg font-medium mb-4 flex items-center">
          <span className="mr-2">💪</span>
          Health Benefits
        </h4>
        <ul className="space-y-3">
          {plant.healthBenefits.map((benefit: string, index: number) => (
            <li key={index} className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              <span className="text-gray-700">{benefit}</span>
            </li>
          ))}
        </ul>
      </Card>

      <div className="flex justify-center">
        <Button
          onClick={() => navigate("/pro")}
          className="bg-green-500 hover:bg-green-600"
        >
          Learn More in Pro Version
        </Button>
      </div>
    </div>
  );
};
