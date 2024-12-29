import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";

interface FileInputProps {
  onFileSelect: (file: File) => void;
  disabled: boolean;
}

export const FileInput = ({ onFileSelect, disabled }: FileInputProps) => {
  const isMobile = useIsMobile();

  return (
    <Input
      type="file"
      accept="image/*"
      capture={isMobile ? "environment" : undefined}
      onChange={(e) => e.target.files?.[0] && onFileSelect(e.target.files[0])}
      className="hidden"
      id="plant-upload"
      disabled={disabled}
    />
  );
};