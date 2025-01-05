import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Leaf } from "lucide-react";

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
      } else if (event === "SIGNED_OUT") {
        toast.info("Signed out");
      } else if (event === "USER_UPDATED") {
        console.log("User updated:", session);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center p-4"
         style={{
           backgroundImage: `url('/lovable-uploads/dd6588e4-f2ac-48f2-8efe-4cff47e8bb41.png')`,
         }}>
      <div className="w-full max-w-md">
        <div className="backdrop-blur-md bg-white/80 p-8 rounded-3xl shadow-xl border border-green-100">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="flex justify-center items-center gap-2 mb-2">
              <Leaf className="h-6 w-6 text-green-600" />
              <h1 className="text-2xl font-semibold text-green-600">
                Plantopiaa
              </h1>
            </div>
          </div>

          {/* Auth Form */}
          <SupabaseAuth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#10b981',
                    brandAccent: '#059669',
                    inputBackground: 'white',
                    inputText: '#1f2937',
                    inputBorder: '#d1d5db',
                  },
                },
              },
              style: {
                container: {
                  gap: '1rem',
                },
                button: {
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  backgroundColor: '#10b981',
                  color: 'white',
                  fontWeight: '500',
                  transition: 'all 150ms ease',
                },
                input: {
                  borderRadius: '0.5rem',
                  padding: '0.75rem 1rem',
                  backgroundColor: 'white',
                  border: '1px solid #d1d5db',
                  transition: 'all 150ms ease',
                },
                label: {
                  color: '#4b5563',
                  marginBottom: '0.25rem',
                },
                message: {
                  borderRadius: '0.5rem',
                  padding: '0.75rem 1rem',
                  marginBottom: '1rem',
                  fontSize: '0.875rem',
                },
                anchor: {
                  color: '#10b981',
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                  transition: 'color 150ms ease',
                }
              }
            }}
            providers={[]}
            view="sign_in"
            showLinks={true}
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
    </div>
  );
};

export default Auth;