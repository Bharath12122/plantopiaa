import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  const faqs = {
    general: [
      {
        question: "How does Plantopiaa work?",
        answer: "Plantopiaa uses advanced AI technology to identify plants from your photos. Simply upload a clear image of the plant, and our system will analyze it to provide identification, care tips, and health benefits."
      },
      {
        question: "What are the different subscription tiers?",
        answer: "We offer Free, Pro, and Premium tiers. The Free tier includes basic plant identification and care tips. Pro adds unlimited scans and detailed guides, while Premium includes expert consultation and advanced features."
      },
      {
        question: "How do I upload an image for plant identification?",
        answer: "Click the camera icon or upload button on the home page, select a clear photo of the plant you want to identify, and our system will process it immediately."
      }
    ],
    subscription: [
      {
        question: "What features are included in each tier?",
        answer: "Free: Basic plant ID and care tips. Pro: Unlimited scans, detailed guides, offline mode. Premium: Everything in Pro plus expert consultation, disease identification, and family sharing."
      },
      {
        question: "How can I upgrade or downgrade my subscription?",
        answer: "Go to your account settings, select 'Subscription', and choose your desired plan. Changes take effect at the start of your next billing cycle."
      },
      {
        question: "What payment methods are accepted?",
        answer: "We accept all major credit cards, PayPal, and Apple Pay for subscription payments."
      }
    ],
    technical: [
      {
        question: "What should I do if the plant identification doesn't work?",
        answer: "Ensure you're using a clear, well-lit photo. Try taking the picture from different angles. If issues persist, contact our support team."
      },
      {
        question: "How do I report a bug or issue?",
        answer: "Use the 'Contact Support' form in the Support section or email support@plantopiaa.com with details about the issue you're experiencing."
      }
    ]
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">General Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.general.map((faq, index) => (
              <AccordionItem key={index} value={`general-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Subscription Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.subscription.map((faq, index) => (
              <AccordionItem key={index} value={`subscription-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Technical Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.technical.map((faq, index) => (
              <AccordionItem key={index} value={`technical-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </div>
    </div>
  );
}