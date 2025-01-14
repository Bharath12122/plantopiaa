import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ProHeader } from "@/components/pro/ProHeader";
import { ProUpload } from "@/components/pro/ProUpload";
import { ProFeatures } from "@/components/pro/ProFeatures";
import { ProFeatureShowcase } from "@/components/pro/ProFeatureShowcase";
import { useProStatus } from "@/hooks/useProStatus";
import { LoginPrompt } from "@/components/LoginPrompt";
import { useAnonymousInteractions } from "@/hooks/useAnonymousInteractions";
import { toast } from "sonner";

const ProPage = () => {
  const navigate = useNavigate();
  const { isPro, isLoading } = useProStatus();
  const { showLoginPrompt, setShowLoginPrompt, trackInteraction } = useAnonymousInteractions();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        await trackInteraction("pro_page_view");
        setShowLoginPrompt(true);
      }
    };
    checkSession();
  }, [trackInteraction, setShowLoginPrompt]);

  const handleUpgradeToPro = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setShowLoginPrompt(true);
        return;
      }

      const { error } = await supabase
        .from('profiles')
        .update({ is_pro: true })
        .eq('id', session.user.id);

      if (error) throw error;

      toast.success("Successfully upgraded to Pro!");
      navigate("/pro/onboarding");
    } catch (error) {
      console.error("Error upgrading to pro:", error);
      toast.error("Failed to upgrade to Pro. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1A1F2C] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#9b87f5]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1A1F2C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProHeader onUpgrade={handleUpgradeToPro} isPro={isPro} />
        
        {/* Upload Section */}
        <div className="mb-16">
          <ProUpload />
        </div>

        {/* Features Grid */}
        <div className="space-y-16">
          <ProFeatureShowcase />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ProFeatures />
          </div>
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