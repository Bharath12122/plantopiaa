import { useState } from "react";
import { TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { YieldEstimationForm } from "./YieldEstimationForm";

export const YieldEstimation = () => {
  const [estimationResult, setEstimationResult] = useState<any>(null);

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
        <YieldEstimationForm onEstimationComplete={setEstimationResult} />
      </Card>

      {estimationResult && (
        <Card className="p-6 mt-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-green-600">
              <TrendingUp className="h-5 w-5" />
              <h4 className="text-lg font-semibold">Estimation Results</h4>
            </div>
            <pre className="bg-gray-50 p-4 rounded-md overflow-auto">
              {JSON.stringify(estimationResult, null, 2)}
            </pre>
          </div>
        </Card>
      )}
    </div>
  );
};