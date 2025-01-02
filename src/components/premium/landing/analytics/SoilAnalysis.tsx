import { useState } from "react";
import { Sprout, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const SoilAnalysis = () => {
  const [loading, setLoading] = useState(false);
  const [soilData, setSoilData] = useState({
    ph: '',
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    organicMatter: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('analyze-soil', {
        body: soilData
      });

      if (error) throw error;

      // Store the analysis in the database
      const { error: dbError } = await supabase.from('soil_analysis').insert({
        user_id: (await supabase.auth.getUser()).data.user?.id,
        ph_level: parseFloat(soilData.ph),
        nitrogen_level: parseFloat(soilData.nitrogen),
        phosphorus_level: parseFloat(soilData.phosphorus),
        potassium_level: parseFloat(soilData.potassium),
        organic_matter_percentage: parseFloat(soilData.organicMatter),
        recommendations: data.recommendations
      });

      if (dbError) throw dbError;

      toast.success("Soil analysis complete!");
      // Handle the analysis data...

    } catch (error: any) {
      console.error('Error analyzing soil:', error);
      toast.error(error.message || "Failed to analyze soil data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-[#2A3B1D] mb-2">
          Soil Health Analysis
        </h3>
        <p className="text-gray-600">
          Get detailed insights and recommendations for your soil
        </p>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              pH Level
            </label>
            <Input
              type="number"
              step="0.1"
              value={soilData.ph}
              onChange={(e) => setSoilData(prev => ({ ...prev, ph: e.target.value }))}
              placeholder="e.g., 6.5"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nitrogen Level (ppm)
            </label>
            <Input
              type="number"
              value={soilData.nitrogen}
              onChange={(e) => setSoilData(prev => ({ ...prev, nitrogen: e.target.value }))}
              placeholder="e.g., 150"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phosphorus Level (ppm)
            </label>
            <Input
              type="number"
              value={soilData.phosphorus}
              onChange={(e) => setSoilData(prev => ({ ...prev, phosphorus: e.target.value }))}
              placeholder="e.g., 30"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Potassium Level (ppm)
            </label>
            <Input
              type="number"
              value={soilData.potassium}
              onChange={(e) => setSoilData(prev => ({ ...prev, potassium: e.target.value }))}
              placeholder="e.g., 200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Organic Matter (%)
            </label>
            <Input
              type="number"
              step="0.1"
              value={soilData.organicMatter}
              onChange={(e) => setSoilData(prev => ({ ...prev, organicMatter: e.target.value }))}
              placeholder="e.g., 3.5"
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
                <Loader2 className="animate-spin" />
                Analyzing...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Sprout />
                Analyze Soil
              </span>
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
};