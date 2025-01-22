import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Footer } from "@/components/Footer";
import { Mail, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8 text-[#2A3B1D]">Contact Us</h1>
        
        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-[#2A3B1D]">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                <Input id="name" placeholder="Your name" required />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                <Input type="email" id="email" placeholder="your.email@example.com" required />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                <Input id="subject" placeholder="How can we help?" required />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <Textarea 
                  id="message" 
                  placeholder="Tell us more about your inquiry..." 
                  className="min-h-[150px]"
                  required 
                />
              </div>
              <Button 
                type="submit"
                className="w-full bg-[#00B388] hover:bg-[#00B388]/90 text-white"
              >
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-lg shadow-md mb-8">
              <h2 className="text-2xl font-semibold mb-6 text-[#2A3B1D]">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-[#00B388] mt-1" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-gray-600">support@plantopiaa.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <MessageSquare className="w-6 h-6 text-[#00B388] mt-1" />
                  <div>
                    <h3 className="font-medium">Live Chat</h3>
                    <p className="text-gray-600">Available Monday to Friday<br />9:00 AM - 6:00 PM EST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Link */}
            <div className="bg-[#F2FCE2] p-6 rounded-lg text-center">
              <h3 className="font-semibold mb-2">Have questions?</h3>
              <p className="text-gray-600 mb-4">Check out our frequently asked questions</p>
              <Button 
                variant="outline" 
                className="bg-white hover:bg-gray-50"
                onClick={() => window.location.href = '/faq'}
              >
                Visit FAQ
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}