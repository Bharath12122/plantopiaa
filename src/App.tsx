import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import FAQ from "@/pages/FAQ";
import Legal from "@/pages/Legal";
import Premium from "@/pages/Premium";
import Support from "@/pages/Support";
import { ProLanding } from "@/pages/ProLanding";
import ProDashboard from "@/pages/ProDashboard";
import Donate from "@/pages/Donate";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/premium" element={<Premium />} />
        <Route path="/support" element={<Support />} />
        <Route path="/pro/landing" element={<ProLanding />} />
        <Route path="/pro/dashboard" element={<ProDashboard />} />
        <Route path="/donate" element={<Donate />} />
      </Routes>
    </Router>
  );
}

export default App;