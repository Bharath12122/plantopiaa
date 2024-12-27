import { useEffect, useState } from "react";
import { Check, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./ui/use-toast";

const languages = [
  { code: "en", name: "English" },
  { code: "kn", name: "ಕನ್ನಡ" }, // Kannada
  { code: "hi", name: "हिंदी" }, // Hindi
  { code: "te", name: "తెలుగు" }, // Telugu
  { code: "ta", name: "தமிழ்" }, // Tamil
  { code: "ml", name: "മലയാളം" }, // Malayalam
];

export const LanguageSelector = () => {
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserLanguage = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('preferred_language')
            .eq('id', session.user.id)
            .maybeSingle();
          
          if (error) {
            console.error('Error fetching language preference:', error);
            return;
          }

          if (profile?.preferred_language) {
            setCurrentLanguage(profile.preferred_language);
          }
        }
      } catch (error) {
        console.error('Error in fetchUserLanguage:', error);
      }
    };

    fetchUserLanguage();
  }, []);

  const handleLanguageChange = async (langCode: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { error } = await supabase
          .from('profiles')
          .update({ preferred_language: langCode })
          .eq('id', session.user.id);

        if (error) {
          console.error('Error updating language preference:', error);
          toast({
            title: "Error",
            description: "Failed to update language preference. Please try again.",
            variant: "destructive",
          });
          return;
        }

        setCurrentLanguage(langCode);
        toast({
          title: "Success",
          description: "Language preference updated successfully.",
        });
      }
    } catch (error) {
      console.error('Error in handleLanguageChange:', error);
      toast({
        title: "Error",
        description: "Failed to update language preference. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Languages className="h-4 w-4" />
          {languages.find(lang => lang.code === currentLanguage)?.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-h-[300px] overflow-y-auto">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className="gap-2"
          >
            {language.code === currentLanguage && (
              <Check className="h-4 w-4" />
            )}
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};