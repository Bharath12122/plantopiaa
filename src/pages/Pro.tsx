import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Leaf, Book, Video, Calendar, Shield, Star, Upload, GraduationCap, MessageSquare } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProFeatures = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
      }
    };
    checkSession();
  }, [navigate]);

  const handleUpload = () => {
    toast({
      title: "Coming Soon",
      description: "Plant image upload feature will be available soon!",
      duration: 3000,
    });
  };

  const features = [
    {
      icon: <Leaf className="w-12 h-12 text-plant-pro animate-float" />,
      title: "Advanced Plant Identification",
      description: "Detailed medicinal plant analysis with comprehensive insights",
    },
    {
      icon: <Book className="w-12 h-12 text-plant-pro animate-float" />,
      title: "Educational Resources",
      description: "Access to exclusive articles, videos, and step-by-step guides",
    },
    {
      icon: <Video className="w-12 h-12 text-plant-pro animate-float" />,
      title: "Expert Consultation",
      description: "One-on-one video consultations with plant experts",
    },
    {
      icon: <Calendar className="w-12 h-12 text-plant-pro animate-float" />,
      title: "Personalized Care Schedules",
      description: "Custom watering and care schedules for your plants",
    },
    {
      icon: <Shield className="w-12 h-12 text-plant-pro animate-float" />,
      title: "Disease Detection",
      description: "Early detection and treatment recommendations",
    },
    {
      icon: <Star className="w-12 h-12 text-plant-pro animate-float" />,
      title: "Business Guidance",
      description: "Professional advice for plant-based businesses",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-plant-free">
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 mb-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="resources">Educational Resources</TabsTrigger>
            <TabsTrigger value="upload">Plant Upload</TabsTrigger>
            <TabsTrigger value="consultation">Consultation</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-plant-pro to-plant-pro-dark bg-clip-text text-transparent">
                Pro Dashboard
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Access all your premium features and tools in one place
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <GraduationCap className="w-12 h-12 text-plant-pro mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Video Tutorials</h3>
                  <p className="text-gray-600">Learn from expert-led video courses</p>
                  <Button className="mt-4 bg-plant-pro text-white">Watch Now</Button>
                </div>
              </Card>
              <Card className="p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <Book className="w-12 h-12 text-plant-pro mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Articles</h3>
                  <p className="text-gray-600">In-depth articles and guides</p>
                  <Button className="mt-4 bg-plant-pro text-white">Read More</Button>
                </div>
              </Card>
              <Card className="p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <MessageSquare className="w-12 h-12 text-plant-pro mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Community</h3>
                  <p className="text-gray-600">Connect with other plant enthusiasts</p>
                  <Button className="mt-4 bg-plant-pro text-white">Join Now</Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="upload" className="space-y-8">
            <Card className="p-8">
              <div className="text-center">
                <Upload className="w-16 h-16 text-plant-pro mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-4">Upload Plant Images</h2>
                <p className="text-gray-600 mb-6">
                  Upload images of your plants for detailed analysis and care recommendations
                </p>
                <Button
                  onClick={handleUpload}
                  className="bg-plant-pro text-white hover:bg-plant-pro-dark"
                >
                  Upload Image
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="consultation" className="space-y-8">
            <Card className="p-8">
              <div className="text-center">
                <Video className="w-16 h-16 text-plant-pro mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-4">Expert Consultation</h2>
                <p className="text-gray-600 mb-6">
                  Schedule one-on-one video consultations with plant experts
                </p>
                <Button
                  onClick={() => toast({
                    title: "Coming Soon",
                    description: "Video consultation feature will be available soon!",
                    duration: 3000,
                  })}
                  className="bg-plant-pro text-white hover:bg-plant-pro-dark"
                >
                  Schedule Consultation
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProFeatures;