import { ChevronRight } from "lucide-react";

interface DonationTierProps {
  amount: number;
  description: string;
  onClick: () => void;
}

export const DonationTier = ({ amount, description, onClick }: DonationTierProps) => (
  <button
    onClick={onClick}
    className="p-6 border border-[#00B388]/20 rounded-xl hover:border-[#00B388] transition-all duration-300 bg-white/50 backdrop-blur-sm hover:shadow-lg group"
  >
    <div className="text-2xl font-bold text-[#00B388] mb-2">₹{amount}</div>
    <p className="text-gray-600 text-sm">{description}</p>
    <ChevronRight className="w-5 h-5 text-[#00B388] opacity-0 group-hover:opacity-100 transition-all duration-300 ml-auto mt-2" />
  </button>
);