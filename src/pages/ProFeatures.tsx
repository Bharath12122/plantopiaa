import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProHeader } from "@/components/pro/header/ProHeader";
import { ProFeatureShowcase } from "@/components/pro/features/ProFeatureShowcase";
import { BusinessGuidance } from "@/components/premium/BusinessGuidance";
import { ConsultationSection } from "@/components/premium/ConsultationSection";
import { DashboardPreview } from "@/components/premium/DashboardPreview";
import { ProFeatures } from "@/components/pro/ProFeatures";
import { Footer } from "@/components/Footer";

const ProFeaturesPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
            Unlock the Full Power of Plantopiaa
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Transform your gardening journey with advanced features, expert insights,
            and personalized guidance.
          </p>
          <Button
            onClick={() => navigate("/pro")}
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-6 text-xl rounded-xl transition-all duration-300 hover:scale-105"
          >
            Get Started Now
          </Button>
        </div>

        {/* Main Features */}
        <ProFeatures />

        {/* Business Features */}
        <BusinessGuidance />

        {/* Dashboard Preview */}
        <DashboardPreview />

        {/* Consultation Section */}
        <ConsultationSection />

        {/* Call to Action */}
        <div className="text-center py-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Ready to Transform Your Plant Care?
          </h2>
          <Button
            onClick={() => navigate("/pro")}
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-6 text-xl rounded-xl transition-all duration-300 hover:scale-105"
          >
            Upgrade to Pro
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProFeaturesPage;