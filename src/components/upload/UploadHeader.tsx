import { LanguageSelector } from "@/components/LanguageSelector";

interface UploadHeaderProps {
  onLanguageChange: (language: string) => void;
}

export const UploadHeader = ({ onLanguageChange }: UploadHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-semibold">Get Started</h2>
      <LanguageSelector onLanguageChange={onLanguageChange} />
    </div>
  );
};