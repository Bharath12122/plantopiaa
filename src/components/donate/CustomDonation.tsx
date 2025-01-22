import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface CustomDonationProps {
  amount: number[];
  onAmountChange: (value: number[]) => void;
  onDonate: () => void;
  isProcessing: boolean;
}

export const CustomDonation = ({ 
  amount, 
  onAmountChange, 
  onDonate, 
  isProcessing 
}: CustomDonationProps) => (
  <div className="bg-white/50 backdrop-blur-sm p-6 rounded-xl border border-[#00B388]/20">
    <h3 className="text-xl font-semibold mb-4">Custom Amount</h3>
    <div className="space-y-4">
      <Slider
        value={amount}
        onValueChange={onAmountChange}
        max={10000}
        step={100}
        className="py-4"
      />
      <div className="flex justify-between items-center">
        <input
          type="number"
          value={amount[0]}
          onChange={(e) => onAmountChange([Number(e.target.value)])}
          className="text-2xl font-bold text-[#00B388] bg-transparent border-b border-[#00B388]/20 w-32 focus:outline-none focus:border-[#00B388]"
          min={100}
          max={10000}
        />
        <Button
          onClick={onDonate}
          disabled={isProcessing}
          className="bg-[#00B388] hover:bg-[#00B388]/90 text-white"
        >
          {isProcessing ? "Processing..." : "Donate Custom Amount"}
        </Button>
      </div>
    </div>
  </div>
);