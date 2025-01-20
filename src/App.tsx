import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import ProLanding from "./pages/ProLanding";
import PremiumLanding from "./pages/PremiumLanding";
import Premium from "./pages/Premium";
import Support from "./pages/Support";
import FAQ from "./pages/FAQ";
import Legal from "./pages/Legal";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/pro/landing" element={<ProLanding />} />
        <Route path="/premium/landing" element={<PremiumLanding />} />
        <Route path="/premium" element={<Premium />} />
        <Route path="/support" element={<Support />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/legal" element={<Legal />} />
      </Routes>
    </Router>
  );
}

export default App;