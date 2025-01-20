import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import Premium from "@/pages/Premium";
import ProLanding from "@/pages/ProLanding";
import Support from "@/pages/Support";
import FAQ from "@/pages/FAQ";
import Legal from "@/pages/Legal";
import ProFeatures from "@/pages/ProFeatures";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/premium" element={<Premium />} />
        <Route path="/pro" element={<ProLanding />} />
        <Route path="/pro/features" element={<ProFeatures />} />
        <Route path="/support" element={<Support />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/legal" element={<Legal />} />
      </Routes>
    </Router>
  );
}

export default App;