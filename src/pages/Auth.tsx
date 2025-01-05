import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Leaf } from "lucide-react";

// Floating Leaf Component
const FloatingLeaf = ({ delay = "0s", x = "0", y = "0" }: { delay?: string; x?: string; y?: string }) => (
  <div
    className="absolute animate-particle-float"
    style={{
      "--tx": x,
      "--ty": y,
      animationDelay: delay,
    } as React.CSSProperties}
  >
    <Leaf className="text-plant-pro/30 h-6 w-6" />
  </div>
);

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
    <div 
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-plant-free via-white to-plant-pro/10"
      style={{
        backgroundImage: `url('/lovable-uploads/bd6e0da7-ea3c-40c6-a3e8-b865ce8ecc65.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(162,217,110,0.1),rgba(255,255,255,0.1))]" />
      <div className="absolute inset-0 backdrop-blur-[2px]" />
      
      {/* Floating Leaves */}
      <FloatingLeaf delay="0s" x="-100px" y="-100px" />
      <FloatingLeaf delay="2s" x="100px" y="-150px" />
      <FloatingLeaf delay="4s" x="-150px" y="-200px" />
      <FloatingLeaf delay="1s" x="150px" y="-250px" />
      <FloatingLeaf delay="3s" x="-200px" y="-300px" />

      {/* Main Content */}
      <div className="relative flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          {/* Logo and Title */}
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <Leaf className="h-12 w-12 animate-float text-plant-pro" />
            </div>
            <h1 className="mb-2 bg-gradient-to-r from-plant-pro to-plant-premium bg-clip-text text-3xl font-bold text-transparent">
              Plantopiaa
            </h1>
            <p className="text-gray-600">
              Your AI-Powered Plant Care Assistant
            </p>
          </div>

          {/* Auth Form Container */}
          <div className="relative rounded-xl border border-plant-pro/20 bg-white/80 p-8 shadow-xl backdrop-blur-sm animate-glow">
            {/* Growing Vine Effect */}
            <div className="absolute inset-0 overflow-hidden rounded-xl">
              <div className="absolute inset-0 animate-scan bg-gradient-to-b from-transparent via-plant-pro/10 to-transparent" />
            </div>

            <SupabaseAuth 
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#a2d96e',
                      brandAccent: '#8bc952',
                      inputBackground: 'white',
                      inputText: '#1a1a1a',
                    }
                  }
                },
                style: {
                  button: {
                    borderRadius: '0.75rem',
                    padding: '10px 15px',
                    transition: 'all 0.2s ease',
                    background: 'linear-gradient(to right, #a2d96e, #8bc952)',
                    transform: 'translateY(0)',
                    '&:hover': {
                      opacity: 0.9,
                      transform: 'translateY(-1px)',
                    }
                  },
                  input: {
                    borderRadius: '0.75rem',
                    border: '1px solid #e2e8f0',
                    padding: '10px 15px',
                    background: 'white',
                    transition: 'all 0.2s ease',
                    transform: 'translateY(0)',
                    '&:hover': {
                      transform: 'translateY(-1px)',
                    },
                    '&:focus': {
                      borderColor: '#a2d96e',
                      boxShadow: '0 0 0 2px rgba(162, 217, 110, 0.2)',
                      transform: 'translateY(-1px)',
                    }
                  },
                  message: {
                    borderRadius: '0.75rem',
                    padding: '12px',
                    marginBottom: '12px',
                    fontSize: '0.875rem',
                  },
                  anchor: {
                    color: '#8bc952',
                    transition: 'color 0.2s ease',
                    '&:hover': {
                      color: '#a2d96e',
                    }
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
    </div>
  );
};

export default Auth;