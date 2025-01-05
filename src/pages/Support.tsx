import React from "react";
import { MessageSquare, HelpCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function Support() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent successfully! We'll get back to you soon.");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Contact & Support</h1>
      
      {/* Support Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
          <MessageSquare className="h-8 w-8 mb-4 text-plant-primary" />
          <h3 className="font-semibold mb-2">Live Chat</h3>
          <p className="text-gray-600 mb-4">Get instant help from our team</p>
          <Button variant="outline">Start Chat</Button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
          <HelpCircle className="h-8 w-8 mb-4 text-plant-primary" />
          <h3 className="font-semibold mb-2">Help Center</h3>
          <p className="text-gray-600 mb-4">Browse our knowledge base</p>
          <Button variant="outline">Visit Help Center</Button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
          <Mail className="h-8 w-8 mb-4 text-plant-primary" />
          <h3 className="font-semibold mb-2">Email Support</h3>
          <p className="text-gray-600 mb-4">support@plantopiaa.com</p>
          <Button variant="outline">Send Email</Button>
        </div>
      </div>

      {/* Contact Form */}
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md mb-12">
        <h2 className="text-2xl font-semibold mb-6">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
            <Input id="name" required />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
            <Input type="email" id="email" required />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
            <Input id="subject" required />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
            <Textarea id="message" required className="min-h-[150px]" />
          </div>
          <Button type="submit" className="w-full">Send Message</Button>
        </form>
      </div>

      {/* Support Hours */}
      <div className="text-center mb-12">
        <h2 className="text-2xl font-semibold mb-4">Support Hours</h2>
        <p className="text-gray-600">
          Monday - Friday: 9:00 AM - 6:00 PM (EST)<br />
          Saturday: 10:00 AM - 4:00 PM (EST)<br />
          Sunday: Closed
        </p>
      </div>
    </div>
  );
}