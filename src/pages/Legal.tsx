import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Footer } from "@/components/Footer";

export default function Legal() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-[#00B388]">Legal Information</h1>

        <Tabs defaultValue="terms" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="terms">Terms of Service</TabsTrigger>
            <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
            <TabsTrigger value="cookies">Cookie Policy</TabsTrigger>
          </TabsList>

          <TabsContent value="terms">
            <ScrollArea className="h-[600px] w-full rounded-md border p-6">
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">Terms of Service</h2>
                <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
                
                <section className="space-y-4">
                  <h3 className="text-xl font-semibold">1. Acceptance of Terms</h3>
                  <p>
                    By accessing and using Plantopiaa's services, you agree to be bound by these Terms of Service. 
                    These terms apply to all visitors, users, and others who wish to access or use our service.
                  </p>

                  <h3 className="text-xl font-semibold">2. Description of Service</h3>
                  <p>
                    Plantopiaa provides an AI-powered plant identification and care platform. Our services include 
                    plant identification, care recommendations, and health monitoring features.
                  </p>

                  <h3 className="text-xl font-semibold">3. User Accounts</h3>
                  <p>
                    To access certain features of our service, you must register for an account. You agree to provide 
                    accurate information and keep it updated. You are responsible for maintaining the security of your account.
                  </p>

                  <h3 className="text-xl font-semibold">4. Content Ownership</h3>
                  <p>
                    Users retain ownership of all images and content they upload. By using our service, you grant 
                    Plantopiaa a license to use uploaded content for service improvement and research purposes.
                  </p>
                </section>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="privacy">
            <ScrollArea className="h-[600px] w-full rounded-md border p-6">
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">Privacy Policy</h2>
                <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

                <section className="space-y-4">
                  <h3 className="text-xl font-semibold">1. Information Collection</h3>
                  <p>
                    We collect information including: name, email address, uploaded plant images, and usage data 
                    to provide and improve our services.
                  </p>

                  <h3 className="text-xl font-semibold">2. Use of Information</h3>
                  <p>
                    Your data is used to: provide plant identification services, improve our AI models, 
                    personalize your experience, and communicate with you about our services.
                  </p>

                  <h3 className="text-xl font-semibold">3. Data Protection</h3>
                  <p>
                    We implement industry-standard security measures to protect your personal information 
                    from unauthorized access, disclosure, or destruction.
                  </p>
                </section>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="cookies">
            <ScrollArea className="h-[600px] w-full rounded-md border p-6">
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">Cookie Policy</h2>
                <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

                <section className="space-y-4">
                  <h3 className="text-xl font-semibold">1. What Are Cookies</h3>
                  <p>
                    Cookies are small text files that are placed on your device when you visit our website. 
                    They help us provide you with a better experience and understand how you use our service.
                  </p>

                  <h3 className="text-xl font-semibold">2. How We Use Cookies</h3>
                  <p>
                    We use cookies to: remember your preferences, understand how you interact with our service, 
                    and improve our platform based on this information.
                  </p>

                  <h3 className="text-xl font-semibold">3. Managing Cookies</h3>
                  <p>
                    You can control and/or delete cookies as you wish. You can delete all cookies that are 
                    already on your computer and you can set most browsers to prevent them from being placed.
                  </p>
                </section>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}