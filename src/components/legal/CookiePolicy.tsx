import { ScrollArea } from "@/components/ui/scroll-area";

export const CookiePolicy = () => {
  return (
    <ScrollArea className="h-[600px] w-full rounded-md border p-6">
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Cookie Policy</h2>
        <p className="text-sm text-muted-foreground">Effective Date: {new Date().toLocaleDateString()}</p>

        <section className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold">1. What Are Cookies?</h3>
            <p className="mt-2">
              Cookies are small text files stored on your device when you visit our platform. 
              They help us improve functionality, analyze usage, and provide a personalized experience.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">2. Types of Cookies We Use</h3>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Essential Cookies:</strong> Required for the platform to function properly.</li>
              <li><strong>Performance Cookies:</strong> Help us understand user interactions and improve the platform.</li>
              <li><strong>Functional Cookies:</strong> Enhance your experience by remembering preferences.</li>
              <li><strong>Advertising Cookies:</strong> Deliver relevant ads based on your interests.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold">3. Managing Cookies</h3>
            <p className="mt-2">
              You can manage cookie preferences through your browser settings. 
              Note that disabling cookies may affect the functionality of our platform.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">4. Third-Party Cookies</h3>
            <p className="mt-2">
              We may use third-party services like Google Analytics and payment processors 
              that set cookies on our behalf. Please review their policies for more information.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">5. Updates to the Cookie Policy</h3>
            <p className="mt-2">
              This policy may be updated periodically. Changes will be posted on this page 
              with the effective date.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">6. Contact Us</h3>
            <p className="mt-2">
              For questions about our Cookie Policy, email us at{" "}
              <a href="mailto:support@plantopiaa.com" className="text-primary hover:underline">
                support@plantopiaa.com
              </a>
            </p>
          </div>
        </section>
      </div>
    </ScrollArea>
  );
};