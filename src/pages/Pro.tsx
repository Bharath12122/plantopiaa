import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ProHeader } from "@/components/pro/header/ProHeader";
import { ProFeatureShowcase } from "@/components/pro/features/ProFeatureShowcase";
import { ProUpload } from "@/components/pro/upload/ProUpload";
import { useAnonymousInteractions } from "@/hooks/useAnonymousInteractions";
import { LoginPrompt } from "@/components/LoginPrompt";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const ProPage = () => {
  const navigate = useNavigate();
  const { showLoginPrompt, setShowLoginPrompt, trackInteraction } = useAnonymousInteractions();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        setIsLoading(true);
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          throw sessionError;
        }

        if (!session) {
          await trackInteraction("pro_page_view");
        }
      } catch (error: any) {
        console.error('Session check error:', error);
        setError(error.message || 'Failed to check session');
        toast.error('There was an error checking your session. Please try logging in again.');
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, [trackInteraction]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#9b87f5]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-12">
        {error && (
          <Alert variant="destructive" className="mb-8">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
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