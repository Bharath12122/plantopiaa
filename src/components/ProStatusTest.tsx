import { useProStatus } from "@/hooks/useProStatus";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { toast } from "sonner";

export const ProStatusTest = () => {
  const { isPro, isLoading, error } = useProStatus();
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  const checkSession = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error("Session check error:", error);
      toast.error("Failed to check session");
      return;
    }
    setSession(data.session);
    console.log("Current session:", data.session);
  };

  const checkProfile = async () => {
    if (!session?.user?.id) {
      toast.error("No active session");
      return;
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (error) {
      console.error("Profile check error:", error);
      toast.error("Failed to fetch profile");
      return;
    }

    setProfile(data);
    console.log("Current profile:", data);
  };

  const toggleProStatus = async () => {
    if (!session?.user?.id) {
      toast.error("No active session");
      return;
    }

    const { error } = await supabase
      .from('profiles')
      .update({ is_pro: !profile?.is_pro })
      .eq('id', session.user.id);

    if (error) {
      console.error("Toggle pro status error:", error);
      toast.error("Failed to toggle pro status");
      return;
    }

    toast.success(`Pro status ${!profile?.is_pro ? 'enabled' : 'disabled'}`);
    checkProfile();
  };

  return (
    <Card className="p-6 max-w-xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Pro Status Test Panel</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-medium">Loading:</span>
          <span>{isLoading ? "Yes" : "No"}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-medium">Pro Status:</span>
          <span>{isPro ? "Pro" : "Free"}</span>
        </div>

        {error && (
          <div className="text-red-500">
            <span className="font-medium">Error:</span>
            <span className="ml-2">{error}</span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="font-medium">Session:</span>
          <span>{session ? "Active" : "None"}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-medium">Profile:</span>
          <span>{profile ? "Found" : "None"}</span>
        </div>

        <div className="flex gap-4">
          <Button onClick={checkSession}>
            Check Session
          </Button>
          <Button onClick={checkProfile} disabled={!session}>
            Check Profile
          </Button>
          <Button 
            onClick={toggleProStatus} 
            disabled={!session || !profile}
            variant="secondary"
          >
            Toggle Pro Status
          </Button>
        </div>
      </div>
    </Card>
  );
};