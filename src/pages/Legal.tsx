import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Legal() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Legal Information</h1>

      <Tabs defaultValue="terms" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
          <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
        </TabsList>

        <TabsContent value="terms">
          <ScrollArea className="h-[600px] w-full rounded-md border p-6">
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-4">Terms and Conditions</h2>
                <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
                
                <h3 className="text-xl font-semibold mb-3">1. User Agreement</h3>
                <p className="mb-4">
                  By accessing and using Plantopiaa, you agree to be bound by these Terms and Conditions.
                  These terms apply to all visitors, users, and others who access or use our service.
                </p>

                <h3 className="text-xl font-semibold mb-3">2. Usage Rights</h3>
                <p className="mb-4">
                  Users retain ownership of all images they upload. By using our service, you grant
                  Plantopiaa a non-exclusive license to use uploaded content for service improvement
                  and research purposes.
                </p>

                <h3 className="text-xl font-semibold mb-3">3. Account Termination</h3>
                <p className="mb-4">
                  We reserve the right to terminate or suspend access to our service immediately,
                  without prior notice, for conduct that we believe violates these Terms or is
                  harmful to other users, us, or third parties, or for any other reason.
                </p>
              </section>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="privacy">
          <ScrollArea className="h-[600px] w-full rounded-md border p-6">
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
                <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>

                <h3 className="text-xl font-semibold mb-3">1. Data Collection</h3>
                <p className="mb-4">
                  We collect information including: name, email address, uploaded plant images,
                  and usage data to provide and improve our services.
                </p>

                <h3 className="text-xl font-semibold mb-3">2. Data Usage</h3>
                <p className="mb-4">
                  Your data is used to: provide plant identification services, improve our AI models,
                  personalize your experience, and communicate with you about our services.
                </p>

                <h3 className="text-xl font-semibold mb-3">3. User Rights</h3>
                <p className="mb-4">
                  You have the right to: access your personal data, request corrections,
                  delete your account, and export your data.
                </p>

                <h3 className="text-xl font-semibold mb-3">4. Security Measures</h3>
                <p className="mb-4">
                  We implement industry-standard security measures to protect your personal
                  information from unauthorized access, disclosure, or destruction.
                </p>
              </section>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}