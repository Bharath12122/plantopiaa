import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ProHeader } from "@/components/pro/ProHeader";
import { ProFeatureShowcase } from "@/components/pro/ProFeatureShowcase";
import { ProUpload } from "@/components/pro/ProUpload";
import { ProFeatures } from "@/components/pro/ProFeatures";
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        <ProHeader />
        <ProFeatureShowcase />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ProUpload />
          <ProFeatures />
        </div>
      </div>
      <LoginPrompt 
        open={showLoginPrompt} 
        onOpenChange={setShowLoginPrompt}
      />
    </div>
  );
};

export default ProPage;