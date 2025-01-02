import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface PlantSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const PlantSelector = ({ value, onChange }: PlantSelectorProps) => {
  const { data: plants, isLoading, error } = useQuery({
    queryKey: ['plants'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('plants')
        .select('id, name')
        .order('name');
      
      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-gray-500">
        <Loader2 className="w-4 h-4 animate-spin" />
        Loading plants...
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error loading plants</div>;
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Select Plant
      </label>
      <Select
        value={value}
        onValueChange={onChange}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a plant" />
        </SelectTrigger>
        <SelectContent>
          {plants?.map((plant) => (
            <SelectItem key={plant.id} value={plant.id}>
              {plant.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};