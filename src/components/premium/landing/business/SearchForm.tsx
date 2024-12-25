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
          placeholder="Type a business or plant-related topic (e.g., mushroom business)"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="border-[#a2d96e]/20 focus:border-[#a2d96e] focus:ring-[#a2d96e]"
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="w-5 h-5 text-[#a2d96e] cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Limited to 5 searches per day</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {searchesRemaining !== null && (
        <p className="text-sm text-[#8bc952]">
          {searchesRemaining} searches remaining today
        </p>
      )}
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-[#a2d96e] hover:bg-[#8bc952] text-white transition-all duration-300 hover:shadow-lg"
      >
        {loading ? "Generating Insight..." : "Generate Business Insight"}
      </Button>
    </form>
  );
};