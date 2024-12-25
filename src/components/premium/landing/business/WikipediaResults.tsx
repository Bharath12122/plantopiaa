import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

interface WikipediaResult {
  title: string;
  snippet: string;
  pageid: number;
}

interface WikipediaResultsProps {
  results: WikipediaResult[];
}

export const WikipediaResults = ({ results }: WikipediaResultsProps) => {
  const createMarkup = (html: string) => {
    return { __html: html };
  };

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm border-[#9b87f5]/20 rounded-2xl hover:shadow-lg transition-all duration-300">
      <h3 className="text-xl font-semibold mb-4 text-[#7E69AB]">Related Information</h3>
      <div className="space-y-4">
        {results.slice(0, 3).map((result) => (
          <div key={result.pageid} className="p-4 bg-[#9b87f5]/5 rounded-lg border border-[#9b87f5]/20">
            <h4 className="font-medium text-[#7E69AB] mb-2">{result.title}</h4>
            <p 
              className="text-gray-700 mb-2 text-sm"
              dangerouslySetInnerHTML={createMarkup(result.snippet)}
            />
            <a
              href={`https://en.wikipedia.org/?curid=${result.pageid}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-[#9b87f5] hover:text-[#7E69AB] text-sm transition-colors"
            >
              Read More
              <ExternalLink className="w-4 h-4 ml-1" />
            </a>
          </div>
        ))}
      </div>
    </Card>
  );
};