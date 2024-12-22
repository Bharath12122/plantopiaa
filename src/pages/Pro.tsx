import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Leaf, Book, Video, Calendar, Shield, Upload, GraduationCap, ArrowRight, Star } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const ProFeatures = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
      }
    };
    checkSession();
  }, [navigate]);

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive"
      });
      return;
    }

    setPreviewImage(URL.createObjectURL(file));
    toast({
      title: "Processing image",
      description: "Your plant image is being analyzed...",
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
      title: "Treatment Applications",
      description: "Explore medicinal properties and practical applications",
    },
    {
      icon: <Calendar className="w-12 h-12 text-plant-pro animate-float" />,
      title: "Growth Tips",
      description: "Tailored advice on optimal temperature and care schedules",
    },
    {
      icon: <Shield className="w-12 h-12 text-plant-pro animate-float" />,
      title: "Personalized Care",
      description: "Custom recommendations based on your environment",
    }
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "Botanical Researcher",
      content: "The Pro features have revolutionized my research workflow. The detailed plant analysis is incredibly accurate.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Herbal Medicine Practitioner",
      content: "This tool has become indispensable in my practice. The medicinal insights are particularly valuable.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Header Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-plant-pro to-[#ffa99f] bg-clip-text text-transparent">
            Discover the Power of Advanced Plant Insights
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Unlock the knowledge behind medicinal plants and grow your expertise
          </p>
        </div>

        {/* Upload Section */}
        <div 
          className={cn(
            "w-full max-w-2xl mx-auto mb-16 p-8 rounded-xl border-2 border-dashed",
            "border-plant-pro/50 hover:border-plant-pro transition-colors",
            "bg-gray-900/50 backdrop-blur-sm"
          )}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <div className="text-center">
            <Upload className="w-16 h-16 text-plant-pro mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Upload Plant Image</h2>
            <p className="text-gray-300 mb-6">
              Drag and drop your image here or click to browse
            </p>
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
            />
            <Button
              onClick={() => document.getElementById('file-upload')?.click()}
              className="bg-gradient-to-r from-plant-pro to-plant-pro-dark text-white hover:opacity-90"
            >
              Select Image <ArrowRight className="ml-2" />
            </Button>
            
            {previewImage && (
              <div className="mt-6 rounded-lg overflow-hidden shadow-xl">
                <img 
                  src={previewImage} 
                  alt="Preview" 
                  className="max-w-full h-auto"
                />
              </div>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gray-800/80 backdrop-blur-sm border-plant-pro/20"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">
            What Pro Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 bg-gray-800/80 backdrop-blur-sm border-plant-pro/20">
                <div className="flex flex-col">
                  <div className="flex mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-gray-300 italic mb-4">"{testimonial.content}"</p>
                  <div className="mt-auto">
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Educational Resources */}
        <div className="text-center">
          <Button 
            className="bg-gradient-to-r from-plant-pro to-plant-pro-dark text-white hover:opacity-90"
            onClick={() => setActiveTab("resources")}
          >
            Explore Pro Resources <GraduationCap className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProFeatures;