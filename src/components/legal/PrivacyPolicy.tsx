import { ScrollArea } from "@/components/ui/scroll-area";

export const PrivacyPolicy = () => {
  return (
    <ScrollArea className="h-[600px] w-full rounded-md border p-6">
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Privacy Policy</h2>
        <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        
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
  );
};
