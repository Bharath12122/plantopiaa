import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ProHeader } from "@/components/pro/header/ProHeader";
import { ProFeatureShowcase } from "@/components/pro/features/ProFeatureShowcase";
import { ProUpload } from "@/components/pro/upload/ProUpload";
import { useAnonymousInteractions } from "@/hooks/useAnonymousInteractions";
import { LoginPrompt } from "@/components/LoginPrompt";

const ProPage = () => {
  const navigate = useNavigate();
  const { showLoginPrompt, setShowLoginPrompt, trackInteraction } = useAnonymousInteractions();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        await trackInteraction("pro_page_view");
      }
    };
    checkSession();
  }, [trackInteraction]);

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-12">
        <ProHeader />
        <ProUpload />
        <ProFeatureShowcase />
      </div>
      <LoginPrompt 
        open={showLoginPrompt} 
        onOpenChange={setShowLoginPrompt}
      />
    </div>
  );
};

export default ProPage;