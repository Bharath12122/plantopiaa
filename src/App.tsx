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
          
          // Handle malformed URL errors
          if (error.message?.includes("failed to call url") && error.status === 404) {
            console.error("Invalid URL format detected");
            toast.error("Configuration error. Please contact support.");
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

        // Only set authenticated if we have both a session and a valid access token
        setIsAuthenticated(!!session?.access_token);
      } catch (error: any) {
        console.error("Auth check failed:", error);
        
        // Handle network and URL-related errors
        if (error.message?.includes("failed to call url")) {
          console.error("Network or URL error:", error);
          toast.error("Network configuration error. Please try again later.");
        } else {
          toast.error("Authentication error. Please try again.");
        }
        
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
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
          // For all other events, check if we have a valid session
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
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;