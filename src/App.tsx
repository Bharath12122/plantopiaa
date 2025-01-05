import React, { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Pro from "./pages/Pro";
import Premium from "./pages/Premium";
import PremiumLanding from "./pages/PremiumLanding";
import Support from "./pages/Support";
import FAQ from "./pages/FAQ";
import Legal from "./pages/Legal";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Auth check failed:", error);
          
          // Handle URL configuration errors
          if (error.message?.includes("failed to call url")) {
            console.error("URL configuration error:", error);
            toast.error("Authentication service is temporarily unavailable. Please try again later.");
            setIsAuthenticated(false);
            setIsLoading(false);
            return;
          }
          
          // Clear any stale session data
          await supabase.auth.signOut();
          setIsAuthenticated(false);
          
          if (error.message?.includes("refresh_token_not_found")) {
            toast.error("Session expired. Please sign in again.");
          } else {
            toast.error("Authentication error. Please try again.");
          }
          return;
        }

        setIsAuthenticated(!!session?.access_token);
      } catch (error: any) {
        console.error("Auth check failed:", error);
        setIsAuthenticated(false);
        toast.error("Authentication service is temporarily unavailable. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event);
      
      switch (event) {
        case 'TOKEN_REFRESHED':
          setIsAuthenticated(true);
          break;
        case 'SIGNED_OUT':
          setIsAuthenticated(false);
          queryClient.clear();
          break;
        case 'SIGNED_IN':
          setIsAuthenticated(true);
          break;
        default:
          setIsAuthenticated(!!session?.access_token);
      }
      setIsLoading(false);
    });

    // Initial auth check
    checkAuth();

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-plant-premium"></div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/auth" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/pro" element={<ProtectedRoute><Pro /></ProtectedRoute>} />
          <Route path="/premium" element={<ProtectedRoute><Premium /></ProtectedRoute>} />
          <Route path="/premium/landing" element={<PremiumLanding />} />
          <Route path="/support" element={<Support />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;