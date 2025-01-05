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
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center p-4"
      style={{
        backgroundImage: `url('/lovable-uploads/dd6588e4-f2ac-48f2-8efe-4cff47e8bb41.png')`,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="w-full max-w-md">
        <div className="backdrop-blur-md bg-white/80 p-8 rounded-3xl shadow-2xl border border-green-100 relative overflow-hidden">
          {/* Logo and Title */}
          <div className="text-center mb-8 relative z-10">
            <div className="flex justify-center items-center gap-2 mb-2">
              <Leaf className="h-8 w-8 text-green-600 animate-float" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                Plantopiaa
              </h1>
            </div>
            <p className="text-gray-600 text-sm">Your personal plant care assistant</p>
          </div>

          {/* Floating Leaves */}
          <div className="absolute -top-4 -left-4 text-green-200/30">
            <Leaf className="h-12 w-12 animate-float" style={{ animationDelay: '0.5s' }} />
          </div>
          <div className="absolute -bottom-4 -right-4 text-green-200/30">
            <Leaf className="h-12 w-12 animate-float" style={{ animationDelay: '1s' }} />
          </div>

          {/* Auth Form */}
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
                container: {
                  gap: '1rem',
                },
                button: {
                  padding: '0.75rem 1rem',
                  borderRadius: '0.75rem',
                  backgroundColor: '#059669',
                  color: 'white',
                  fontWeight: '500',
                  transition: 'all 150ms ease',
                  ["&:hover"]: {
                    backgroundColor: '#047857',
                    transform: 'translateY(-1px)',
                  },
                },
                input: {
                  borderRadius: '0.75rem',
                  padding: '0.75rem 1rem',
                  backgroundColor: 'white',
                  border: '1px solid #d1d5db',
                  transition: 'all 150ms ease',
                  ["&:hover"]: {
                    borderColor: '#059669',
                  },
                  ["&:focus"]: {
                    borderColor: '#059669',
                    boxShadow: '0 0 0 2px rgba(5, 150, 105, 0.1)',
                  },
                },
                label: {
                  color: '#4b5563',
                  marginBottom: '0.25rem',
                  fontSize: '0.875rem',
                },
                message: {
                  borderRadius: '0.75rem',
                  padding: '0.75rem 1rem',
                  marginBottom: '1rem',
                  fontSize: '0.875rem',
                  backgroundColor: 'rgba(5, 150, 105, 0.1)',
                  color: '#059669',
                },
                anchor: {
                  color: '#059669',
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                  transition: 'color 150ms ease',
                  ["&:hover"]: {
                    color: '#047857',
                    textDecoration: 'underline',
                  },
                }
              }
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