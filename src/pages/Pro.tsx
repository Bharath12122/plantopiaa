import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ProHeader } from "@/components/pro/ProHeader";
import { ProUpload } from "@/components/pro/ProUpload";
import { ProFeatures } from "@/components/pro/ProFeatures";

const ProFeatures = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
      }
    };
    checkSession();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-12">
        <ProHeader />
        <ProUpload />
        <ProFeatures />
      </div>
    </div>
  );
};

export default ProFeatures;