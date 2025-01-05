import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Legal() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Legal Information</h1>

      <Tabs defaultValue="about" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="about">About Us</TabsTrigger>
          <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
          <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
        </TabsList>

        <TabsContent value="about">
          <ScrollArea className="h-[600px] w-full rounded-md border p-6">
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-4">Welcome to Plantopiaa!</h2>
                <p className="mb-6">
                  At Plantopiaa, we believe that connecting with nature should be accessible to everyone. 
                  Our mission is to empower plant enthusiasts, gardeners, and nature lovers with the 
                  knowledge and tools they need to thrive in their plant care journey.
                </p>
                
                <p className="mb-6">
                  Founded by a passionate team dedicated to promoting the benefits of plants, Plantopiaa 
                  is an AI-powered plant identification and care assistant application. We leverage 
                  cutting-edge technology to help users identify plants, discover their health benefits, 
                  and provide personalized care tips, making plant care enjoyable and effortless.
                </p>

                <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
                <p className="mb-6">
                  We envision a world where everyone can experience the joy of nurturing plants, whether 
                  in their homes, gardens, or communities. Through education, support, and innovative 
                  solutions, we aim to inspire a new generation of plant lovers who appreciate the beauty 
                  and benefits of greenery.
                </p>

                <h3 className="text-xl font-semibold mb-3">Our Features</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>
                    <span className="font-semibold">AI-Powered Identification:</span> Quickly and accurately 
                    identify plants using just a photo, thanks to our partnership with the Plant.id API.
                  </li>
                  <li>
                    <span className="font-semibold">Health Benefits Insights:</span> Discover the medicinal 
                    uses and health benefits of various plants through our integration with the OpenAI API.
                  </li>
                  <li>
                    <span className="font-semibold">Personalized Care Tips:</span> Access tailored advice 
                    on caring for your plants, from watering schedules to optimal growing conditions.
                  </li>
                  <li>
                    <span className="font-semibold">Community Support:</span> Join our community of plant 
                    enthusiasts to share experiences, ask questions, and learn together.
                  </li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">Join Us on Our Journey</h3>
                <p className="mb-4">
                  Whether you're a seasoned gardener or just starting, Plantopiaa is here to guide you 
                  every step of the way. Together, let's cultivate a greener, healthier world—one plant 
                  at a time!
                </p>
              </section>
            </div>
          </ScrollArea>
        </TabsContent>

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