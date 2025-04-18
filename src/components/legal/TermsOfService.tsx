import { ScrollArea } from "@/components/ui/scroll-area";

export const TermsOfService = () => {
  return (
    <ScrollArea className="h-[600px] w-full rounded-md border p-6">
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Terms of Service</h2>
        <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        
        <section className="space-y-4">
          <p className="text-base">
            Welcome to Plantopiaa! By accessing or using our platform, you agree to comply with the following terms and conditions. 
            Please read them carefully to ensure you understand your rights and responsibilities.
          </p>

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
        </section>
      </div>
    </ScrollArea>
  );
};
