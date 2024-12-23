import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface PlantResultsProps {
  plant: {
    name: string;
    scientificName: string;
    description: string;
    careTips: string[];
    image: string;
    uses: string[];
  };
}

export const PlantResults = ({ plant }: PlantResultsProps) => {
  const navigate = useNavigate();
  
  if (!plant) return null;

  return (
    <div className="max-w-2xl mx-auto mb-16 space-y-6 animate-fade-in">
      <Card className="p-6 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={plant.image}
            alt={plant.name}
            className="w-full md:w-1/2 rounded-lg object-cover h-[300px]"
          />
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-2xl font-semibold mb-1">{plant.name}</h3>
              <p className="text-gray-500 italic">{plant.scientificName}</p>
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-2">Description</h4>
              <p className="text-gray-600">{plant.description}</p>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h4 className="text-lg font-medium mb-4">Care Tips</h4>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            {plant.careTips.map((tip: string, index: number) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </Card>

        <Card className="p-6">
          <h4 className="text-lg font-medium mb-4">Uses</h4>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            {plant.uses.map((use: string, index: number) => (
              <li key={index}>{use}</li>
            ))}
          </ul>
        </Card>
      </div>

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