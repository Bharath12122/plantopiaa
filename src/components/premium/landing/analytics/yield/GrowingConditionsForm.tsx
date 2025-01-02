import { Input } from "@/components/ui/input";

interface GrowingConditionsFormProps {
  plantType: string;
  area: string;
  soilType: string;
  irrigationType: string;
  onChange: (field: string, value: string) => void;
}

export const GrowingConditionsForm = ({
  plantType,
  area,
  soilType,
  irrigationType,
  onChange,
}: GrowingConditionsFormProps) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Plant Type
        </label>
        <Input
          type="text"
          value={plantType}
          onChange={(e) => onChange('plantType', e.target.value)}
          placeholder="e.g., Tomatoes"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Growing Area (m²)
        </label>
        <Input
          type="number"
          value={area}
          onChange={(e) => onChange('area', e.target.value)}
          placeholder="e.g., 100"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Soil Type
        </label>
        <Input
          type="text"
          value={soilType}
          onChange={(e) => onChange('soilType', e.target.value)}
          placeholder="e.g., Clay loam"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Irrigation Type
        </label>
        <Input
          type="text"
          value={irrigationType}
          onChange={(e) => onChange('irrigationType', e.target.value)}
          placeholder="e.g., Drip irrigation"
          required
        />
      </div>
    </div>
  );
};