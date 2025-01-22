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
                  <p className="text-base">
                    Welcome to Plantopiaa! By accessing or using our platform, you agree to comply with the following terms and conditions. 
                    Please read them carefully to ensure you understand your rights and responsibilities.
                  </p>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold">1. Acceptance of Terms</h3>
                      <p>
                        By accessing or using Plantopiaa, you agree to be bound by these Terms of Service. 
                        If you do not agree, you must not use our platform.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold">2. Eligibility</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Users must be at least 18 years old or have parental consent to use the platform.</li>
                        <li>You are responsible for ensuring that your use of the platform complies with all applicable laws and regulations.</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold">3. User Accounts</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>You are required to create an account to access certain features of Plantopiaa.</li>
                        <li>You must provide accurate and complete information during registration and update your account details as needed.</li>
                        <li>You are responsible for maintaining the confidentiality of your account credentials and are liable for any activity under your account.</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold">4. Use of the Platform</h3>
                      <p>You agree to:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Use the platform only for lawful purposes.</li>
                        <li>Not engage in any activity that disrupts or interferes with the functionality of the platform.</li>
                        <li>Refrain from posting or transmitting any content that is harmful, offensive, or violates the rights of others.</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold">5. Payment and Refunds</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Payments for Pro and Premium plans are non-refundable unless explicitly stated otherwise.</li>
                        <li>All transactions are processed securely through our payment gateway.</li>
                        <li>If you experience issues with a payment, please contact us immediately.</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold">6. Intellectual Property</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>All content on the platform, including text, images, logos, and software, is the property of Plantopiaa or its licensors.</li>
                        <li>You may not copy, reproduce, distribute, or create derivative works from our content without explicit permission.</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold">7. Disclaimer of Warranties</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Plantopiaa is provided "AS IS" without warranties of any kind.</li>
                        <li>While we strive to ensure the accuracy of our content, we do not guarantee the reliability, completeness, or suitability of the information provided.</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold">8. Limitation of Liability</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Plantopiaa is not liable for any direct, indirect, incidental, or consequential damages arising from your use of the platform.</li>
                        <li>We are not responsible for any loss or damage caused by errors, interruptions, or unauthorized access to your data.</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold">9. Third-Party Links</h3>
                      <p>
                        The platform may contain links to third-party websites or services. Plantopiaa is not responsible for the content or practices of these external sites.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold">10. Changes to Terms</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>We reserve the right to update or modify these Terms of Service at any time without prior notice.</li>
                        <li>Your continued use of the platform constitutes acceptance of the updated terms.</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold">11. Governing Law and Dispute Resolution</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>These Terms are governed by the laws of India.</li>
                        <li>Any disputes will be resolved exclusively through arbitration in accordance with Indian laws.</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold">12. Termination</h3>
                      <p>
                        Plantopiaa reserves the right to terminate or suspend your account at any time for violating these Terms or engaging in unlawful activities.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold">13. Contact Us</h3>
                      <p>
                        For questions or concerns about these Terms of Service, please contact us at:
                      </p>
                      <p className="mt-2">
                        Email: support@plantopiaa.com
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="privacy">
            <ScrollArea className="h-[600px] w-full rounded-md border p-6">
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">Privacy Policy</h2>
                <p className="text-sm text-muted-foreground">Effective Date: {new Date().toLocaleDateString()}</p>

                <p className="text-base">
                  At Plantopiaa, we value your privacy and are committed to protecting your personal information. 
                  This Privacy Policy outlines how we collect, use, and safeguard your data.
                </p>

                <section className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold">1. Information We Collect</h3>
                    <p>We may collect the following types of information:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Personal Information: Name, email address, phone number, payment details.</li>
                      <li>Usage Data: IP address, browser type, pages visited, and interaction with the platform.</li>
                      <li>Cookies: To enhance your experience, we collect data through cookies and similar technologies.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold">2. How We Use Your Information</h3>
                    <p>We use your information for the following purposes:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>To provide and improve our services.</li>
                      <li>To process payments and manage subscriptions.</li>
                      <li>To personalize your experience.</li>
                      <li>To send important updates and promotional offers.</li>
                      <li>To ensure platform security and prevent fraud.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold">3. Sharing Your Information</h3>
                    <p>We do not sell or rent your personal information. However, we may share your data with:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Service Providers: For payment processing, analytics, and hosting services.</li>
                      <li>Legal Authorities: If required by law or to protect our legal rights.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold">4. Data Security</h3>
                    <p>
                      We implement advanced security measures to protect your data from unauthorized access, 
                      alteration, or disclosure. However, no method of transmission over the internet is 100% secure.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold">5. Your Rights</h3>
                    <p>You have the right to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Access, correct, or delete your personal data.</li>
                      <li>Opt-out of promotional communications.</li>
                      <li>Request a copy of the data we hold about you.</li>
                    </ul>
                    <p className="mt-2">
                      To exercise these rights, contact us at support@plantopiaa.com.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold">6. Data Retention</h3>
                    <p>
                      We retain your personal information only as long as necessary to fulfill the purposes 
                      outlined in this policy or as required by law.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold">7. Third-Party Links</h3>
                    <p>
                      Our platform may contain links to third-party websites. We are not responsible for their 
                      privacy practices or content. Please review their privacy policies before engaging.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold">8. Changes to This Privacy Policy</h3>
                    <p>
                      We may update this policy from time to time. Changes will be posted on this page with 
                      the effective date. Continued use of the platform constitutes acceptance of the updated policy.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold">9. Contact Us</h3>
                    <p>
                      If you have questions or concerns about this Privacy Policy, contact us at:
                    </p>
                    <p className="mt-2">
                      Email: support@plantopiaa.com
                    </p>
                  </div>
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