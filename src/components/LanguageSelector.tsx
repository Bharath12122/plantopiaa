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

const languages = [
  { code: "en", name: "English" },
  { code: "kn", name: "ಕನ್ನಡ" }, // Kannada
];

export const LanguageSelector = () => {
  const [currentLanguage, setCurrentLanguage] = useState("en");

  useEffect(() => {
    const fetchUserLanguage = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('preferred_language')
          .eq('id', session.user.id)
          .single();
        
        if (profile?.preferred_language) {
          setCurrentLanguage(profile.preferred_language);
        }
      }
    };

    fetchUserLanguage();
  }, []);

  const handleLanguageChange = async (langCode: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      const { error } = await supabase
        .from('profiles')
        .update({ preferred_language: langCode })
        .eq('id', session.user.id);

      if (!error) {
        setCurrentLanguage(langCode);
      }
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
      <DropdownMenuContent align="end">
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