import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

export const Footer = () => {
  const { toast } = useToast();
  const [email, setEmail] = React.useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    toast({
      title: "Thanks for subscribing!",
      description: "You'll receive our latest updates and tips soon.",
    });
    setEmail("");
  };

  return (
    <footer className="bg-[#F2FCE2]/80 backdrop-blur-sm mt-20 py-16 px-6 border-t border-[#00B388]/20">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-[#2A3B1D]">Plantopiaa</h3>
            <p className="text-sm text-gray-600">
              Explore the wonders of plants with AI-powered insights.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                className="text-[#00B388] hover:text-[#00B388]/80 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="text-[#00B388] hover:text-[#00B388]/80 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                className="text-[#00B388] hover:text-[#00B388]/80 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-[#2A3B1D]">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-[#00B388] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-[#00B388] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-[#00B388] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-[#2A3B1D]">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/legal" className="text-sm text-gray-600 hover:text-[#00B388] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/legal" className="text-sm text-gray-600 hover:text-[#00B388] transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-[#2A3B1D]">Stay Updated</h3>
            <p className="text-sm text-gray-600">
              Subscribe to receive plant care tips and updates.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/50"
              />
              <Button 
                type="submit" 
                className="w-full bg-[#00B388] hover:bg-[#00B388]/90 text-white"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-[#00B388]/20 text-center">
          <p className="text-sm text-gray-600">
            © 2025 Plantopiaa. All Rights Reserved.
          </p>
          <p className="text-sm text-[#00B388] mt-2">
            Grow smarter, greener, and healthier with Plantopiaa!
          </p>
        </div>
      </div>
    </footer>
  );
};