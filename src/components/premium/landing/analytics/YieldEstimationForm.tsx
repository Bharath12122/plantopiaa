import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { PlantSelector } from "./yield/PlantSelector";
import { GrowingConditionsForm } from "./yield/GrowingConditionsForm";
import { SubmitButton } from "./yield/SubmitButton";

interface FormData {
  plantId: string;
  plantType: string;
  area: string;
  soilType: string;
  irrigationType: string;
}

interface YieldEstimationFormProps {
  onEstimationComplete: (data: any) => void;
}

export const YieldEstimationForm = ({ onEstimationComplete }: YieldEstimationFormProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    plantId: '',
    plantType: '',
    area: '',
    soilType: '',
    irrigationType: ''
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

      const { error: dbError } = await supabase.from('yield_estimations').insert({
        user_id: (await supabase.auth.getUser()).data.user?.id,
        plant_id: formData.plantId,
        growing_conditions: {
          area: parseFloat(formData.area),
          soil_type: formData.soilType,
          irrigation_type: formData.irrigationType
        },
        recommendations: [data.analysis]
      });

      if (dbError) throw dbError;

      toast.success("Yield estimation complete!");
      onEstimationComplete(data);

    } catch (error: any) {
      console.error('Error estimating yield:', error);
      toast.error(error.message || "Failed to estimate yield");
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PlantSelector
        value={formData.plantId}
        onChange={(value) => handleFieldChange('plantId', value)}
      />
      
      <GrowingConditionsForm
        plantType={formData.plantType}
        area={formData.area}
        soilType={formData.soilType}
        irrigationType={formData.irrigationType}
        onChange={handleFieldChange}
      />

      <SubmitButton loading={loading} />
    </form>
  );
};