import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Footer } from "@/components/Footer";
import { TermsOfService } from "@/components/legal/TermsOfService";
import { PrivacyPolicy } from "@/components/legal/PrivacyPolicy";
import { CookiePolicy } from "@/components/legal/CookiePolicy";

export default function Legal() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-[#00B388]">
          Legal Information
        </h1>

        <Tabs defaultValue="terms" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="terms">Terms of Service</TabsTrigger>
            <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
            <TabsTrigger value="cookies">Cookie Policy</TabsTrigger>
          </TabsList>

          <TabsContent value="terms">
            <TermsOfService />
          </TabsContent>

          <TabsContent value="privacy">
            <PrivacyPolicy />
          </TabsContent>

          <TabsContent value="cookies">
            <CookiePolicy />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}