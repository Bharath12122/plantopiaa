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
      className="min-h-screen w-full flex items-center justify-center p-3 sm:p-4"
      style={{
        background: 'linear-gradient(135deg, #E3F4E1 0%, #D1E9CB 25%, #A8E6CF 50%, #7FB069 100%)',
      }}
    >
      <div className="w-full max-w-[85%] sm:max-w-[380px] mx-auto">
        <div className="backdrop-blur-md bg-white/90 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-xl border border-green-100 relative overflow-hidden">
          {/* Logo and Title */}
          <div className="text-center mb-4 sm:mb-6 relative z-10">
            <div className="flex justify-center items-center gap-1.5 mb-2">
              <Leaf className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 animate-float" />
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                Plantopiaa
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-gray-600">Your personal plant care assistant</p>
          </div>

          {/* Floating Leaves */}
          <div className="absolute -top-3 -left-3 text-green-200/30">
            <Leaf className="h-8 w-8 sm:h-10 sm:w-10 animate-float" style={{ animationDelay: '0.5s' }} />
          </div>
          <div className="absolute -bottom-3 -right-3 text-green-200/30">
            <Leaf className="h-8 w-8 sm:h-10 sm:w-10 animate-float" style={{ animationDelay: '1s' }} />
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
                  gap: '0.75rem',
                },
                button: {
                  padding: '0.625rem 1rem',
                  borderRadius: '0.625rem',
                  backgroundColor: '#059669',
                  color: 'white',
                  fontWeight: '500',
                  transition: 'all 150ms ease',
                  '&:hover': {
                    backgroundColor: '#047857',
                    transform: 'translateY(-1px)',
                  } as React.CSSProperties,
                },
                input: {
                  borderRadius: '0.625rem',
                  padding: '0.625rem 1rem',
                  backgroundColor: 'white',
                  border: '1px solid #d1d5db',
                  transition: 'all 150ms ease',
                  '&:hover': {
                    borderColor: '#059669',
                  } as React.CSSProperties,
                  '&:focus': {
                    borderColor: '#059669',
                    boxShadow: '0 0 0 2px rgba(5, 150, 105, 0.1)',
                  } as React.CSSProperties,
                },
                label: {
                  color: '#4b5563',
                  marginBottom: '0.25rem',
                  fontSize: '0.813rem',
                },
                message: {
                  borderRadius: '0.625rem',
                  padding: '0.625rem 1rem',
                  marginBottom: '0.75rem',
                  fontSize: '0.813rem',
                  backgroundColor: 'rgba(5, 150, 105, 0.1)',
                  color: '#059669',
                },
                anchor: {
                  color: '#059669',
                  fontSize: '0.813rem',
                  textDecoration: 'none',
                  transition: 'color 150ms ease',
                  '&:hover': {
                    color: '#047857',
                    textDecoration: 'underline',
                  } as React.CSSProperties,
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