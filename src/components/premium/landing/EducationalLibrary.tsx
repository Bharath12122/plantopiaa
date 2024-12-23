import { BookOpen, Video, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export const EducationalLibrary = () => {
  const { toast } = useToast();

  return (
    <section className="grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent">
          Educational Resources
        </h2>
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Video className="w-8 h-8 text-[#9b87f5]" />
            <p className="text-gray-700">Expert video tutorials</p>
          </div>
          <div className="flex items-center space-x-4">
            <BookOpen className="w-8 h-8 text-[#9b87f5]" />
            <p className="text-gray-700">Comprehensive guides</p>
          </div>
          <div className="flex items-center space-x-4">
            <FileText className="w-8 h-8 text-[#9b87f5]" />
            <p className="text-gray-700">Business strategy templates</p>
          </div>
          <Button
            onClick={() => {
              toast({
                title: "Coming Soon!",
                description: "Educational resources will be available shortly.",
              });
            }}
            className="w-full md:w-auto bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:opacity-90 text-white"
          >
            Browse Library
          </Button>
        </div>
      </div>
      <Card className="p-6 bg-white/5 backdrop-blur-sm border-[#9b87f5]/20">
        <div className="aspect-video rounded-lg bg-gradient-to-br from-[#9b87f5]/20 to-[#7E69AB]/20 flex items-center justify-center">
          <BookOpen className="w-16 h-16 text-[#9b87f5] animate-pulse" />
        </div>
      </Card>
    </section>
  );
};