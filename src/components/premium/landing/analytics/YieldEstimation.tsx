import { useState } from "react";
import { Calculator, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";

export const YieldEstimation = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    plantId: '',
    plantType: '',
    area: '',
    soilType: '',
    irrigationType: ''
  });

  // Fetch user's plants
  const { data: plants } = useQuery({
    queryKey: ['plants'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('plants')
        .select('id, name');
      if (error) throw error;
      return data;
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.plantId) {
      toast.error("Please select a plant");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('estimate-yield', {
        body: formData
      });

      if (error) throw error;

      // Store the estimation in the database
      const { error: dbError } = await supabase.from('yield_estimations').insert({
        user_id: (await supabase.auth.getUser()).data.user?.id,
        plant_id: formData.plantId, // Include the plant_id
        growing_conditions: {
          area: parseFloat(formData.area),
          soil_type: formData.soilType,
          irrigation_type: formData.irrigationType
        },
        recommendations: [data.analysis]
      });

      if (dbError) throw dbError;

      toast.success("Yield estimation complete!");
      // Handle the estimation data...

    } catch (error: any) {
      console.error('Error estimating yield:', error);
      toast.error(error.message || "Failed to estimate yield");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-[#2A3B1D] mb-2">
          Yield Estimation
        </h3>
        <p className="text-gray-600">
          Get accurate crop yield predictions and optimization tips
        </p>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Plant
            </label>
            <select
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              value={formData.plantId}
              onChange={(e) => setFormData(prev => ({ ...prev, plantId: e.target.value }))}
              required
            >
              <option value="">Select a plant</option>
              {plants?.map((plant) => (
                <option key={plant.id} value={plant.id}>
                  {plant.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Plant Type
            </label>
            <Input
              type="text"
              value={formData.plantType}
              onChange={(e) => setFormData(prev => ({ ...prev, plantType: e.target.value }))}
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
              value={formData.area}
              onChange={(e) => setFormData(prev => ({ ...prev, area: e.target.value }))}
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
              value={formData.soilType}
              onChange={(e) => setFormData(prev => ({ ...prev, soilType: e.target.value }))}
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
              value={formData.irrigationType}
              onChange={(e) => setFormData(prev => ({ ...prev, irrigationType: e.target.value }))}
              placeholder="e.g., Drip irrigation"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Calculator className="animate-spin" />
                Calculating...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <TrendingUp />
                Calculate Yield
              </span>
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
};