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
          className="border-[#9b87f5]/20 focus:border-[#9b87f5] focus:ring-[#9b87f5]"
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="w-5 h-5 text-[#9b87f5] cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Limited to 5 searches per day</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {searchesRemaining !== null && (
        <p className="text-sm text-[#7E69AB]">
          {searchesRemaining} searches remaining today
        </p>
      )}
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white transition-all duration-300 hover:shadow-lg"
      >
        {loading ? "Generating Insight..." : "Generate Business Insight"}
      </Button>
    </form>
  );
};