import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import AuthLogo from "@/components/auth/AuthLogo";
import AuthBackground from "@/components/auth/AuthBackground";
import { authStyles, authStylesHover } from "@/components/auth/AuthStyles";

const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/");
      }
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        toast.success("Successfully signed in!");
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center p-3 sm:p-4"
      style={{
        background: 'linear-gradient(135deg, #E3F4E1 0%, #D1E9CB 25%, #A8E6CF 50%, #7FB069 100%)',
      }}
    >
      <div className="w-full max-w-[85%] sm:max-w-[380px] mx-auto">
        <div className="backdrop-blur-md bg-white/90 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-xl border border-green-100 relative overflow-hidden">
          <AuthLogo />
          <AuthBackground />
          
          <SupabaseAuth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#059669',
                    brandAccent: '#047857',
                    inputBackground: 'white',
                    inputText: '#1f2937',
                    inputBorder: '#d1d5db',
                  },
                },
              },
              style: {
                ...authStyles,
                button: {
                  ...authStyles.button,
                  '&:hover': authStylesHover.button,
                },
                input: {
                  ...authStyles.input,
                  '&:hover': authStylesHover.input,
                  '&:focus': authStylesHover.inputFocus,
                },
                anchor: {
                  ...authStyles.anchor,
                  '&:hover': authStylesHover.anchor,
                },
              },
            }}
            providers={[]}
            view="sign_in"
            showLinks={true}
            redirectTo={window.location.origin}
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;