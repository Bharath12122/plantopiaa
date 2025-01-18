import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/toaster";
import Index from './pages/Index';
import Auth from './pages/Auth';
import ProLanding from './pages/ProLanding';
import Premium from './pages/Premium';
import PremiumLanding from './pages/PremiumLanding';
import Support from './pages/Support';
import FAQ from './pages/FAQ';
import Legal from './pages/Legal';
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/pro/landing" element={<ProLanding />} />
          <Route path="/pro" element={<Premium />} />
          <Route path="/premium/landing" element={<PremiumLanding />} />
          <Route path="/support" element={<Support />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/legal" element={<Legal />} />
        </Routes>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

export default App;