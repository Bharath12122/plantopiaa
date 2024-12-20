import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        toast.success("Successfully signed in!");
        navigate("/");
      } else if (event === "SIGNED_OUT") {
        toast.info("Signed out");
      } else if (event === "USER_UPDATED") {
        console.log("User updated:", session);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-plant-free flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-plant-premium to-plant-premium-accent bg-clip-text text-transparent">
          Plant Care Assistant
        </h1>
        <SupabaseAuth 
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#8B5CF6',
                  brandAccent: '#7C3AED'
                }
              }
            },
            style: {
              button: {
                borderRadius: '0.5rem',
                padding: '10px 15px',
              },
              input: {
                borderRadius: '0.5rem',
              },
              message: {
                borderRadius: '0.5rem',
                padding: '10px',
                marginBottom: '10px',
              }
            }
          }}
          providers={[]}
          redirectTo={window.location.origin}
          localization={{
            variables: {
              sign_in: {
                email_label: "Email",
                password_label: "Password",
                email_input_placeholder: "Your email",
                password_input_placeholder: "Your password",
                button_label: "Sign in",
                loading_button_label: "Signing in ...",
              },
              sign_up: {
                email_label: "Email",
                password_label: "Password",
                email_input_placeholder: "Your email",
                password_input_placeholder: "Your password",
                button_label: "Sign up",
                loading_button_label: "Signing up ...",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Auth;