import { Sun, Droplet, Leaf } from "lucide-react";

export const Features = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <Sun className="h-8 w-8 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Smart Care Tips</h3>
        <p className="text-gray-600">Get personalized care recommendations</p>
      </div>
      <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <Droplet className="h-8 w-8 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Watering Guide</h3>
        <p className="text-gray-600">Learn optimal watering schedules</p>
      </div>
      <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <Leaf className="h-8 w-8 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Plant ID</h3>
        <p className="text-gray-600">Instant plant identification</p>
      </div>
    </div>
  );
};