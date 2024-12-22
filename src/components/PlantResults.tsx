interface PlantResultsProps {
  plant: {
    name: string;
    careTips: string[];
    image: string;
  };
}

export const PlantResults = ({ plant }: PlantResultsProps) => {
  if (!plant) return null;

  return (
    <div className="max-w-2xl mx-auto mb-16 p-6 bg-white rounded-lg shadow-lg animate-fade-in">
      <h2 className="text-2xl font-semibold mb-4">Your Plant</h2>
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={plant.image}
          alt={plant.name}
          className="w-full md:w-1/2 rounded-lg object-cover"
        />
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2">{plant.name}</h3>
          <h4 className="text-lg font-medium mb-2">Care Tips:</h4>
          <ul className="list-disc list-inside text-gray-600">
            {plant.careTips.map((tip: string, index: number) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};