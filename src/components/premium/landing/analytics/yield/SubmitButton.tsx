import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";

interface SubmitButtonProps {
  loading: boolean;
}

export const SubmitButton = ({ loading }: SubmitButtonProps) => {
  return (
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
          <Calculator />
          Calculate Yield
        </span>
      )}
    </Button>
  );
};