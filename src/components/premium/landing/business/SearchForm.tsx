import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SearchFormProps {
  onSearch: (keyword: string) => Promise<void>;
  loading: boolean;
  searchesRemaining: number | null;
}

export const SearchForm = ({ onSearch, loading, searchesRemaining }: SearchFormProps) => {
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchKeyword);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Type a business or plant-related topic"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="border-[#2A3B1D]/20 focus:border-[#2A3B1D] focus:ring-[#2A3B1D] bg-white/80"
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="w-5 h-5 text-[#2A3B1D] cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Limited to 5 searches per day</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {searchesRemaining !== null && (
        <p className="text-sm text-[#2A3B1D]">
          {searchesRemaining} searches remaining today
        </p>
      )}
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-[#2A3B1D] hover:bg-[#2A3B1D]/90 text-white transition-all duration-300 hover:shadow-lg"
      >
        {loading ? "Generating Insight..." : "Generate Business Insight"}
      </Button>
    </form>
  );
};