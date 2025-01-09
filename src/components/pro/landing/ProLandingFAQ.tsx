import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What's included in the Pro subscription?",
    answer: "Pro includes unlimited plant identifications, advanced care guides, offline mode, ad-free experience, priority support, and unlimited plant collection storage.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes, you can cancel your Pro subscription at any time. You'll continue to have access to Pro features until the end of your billing period.",
  },
  {
    question: "How does the unlimited identification work?",
    answer: "With Pro, you can identify as many plants as you want, whenever you want. Simply take a photo of any plant, and our AI will provide instant identification and care information.",
  },
  {
    question: "What makes the care guides 'advanced'?",
    answer: "Pro care guides include detailed information about optimal growing conditions, seasonal care requirements, pest management, propagation techniques, and personalized recommendations based on your climate.",
  },
  {
    question: "How does offline mode work?",
    answer: "Offline mode allows you to access your saved plant information, care guides, and identification history even without an internet connection. Perfect for garden work!",
  },
];

export const ProLandingFAQ = () => {
  return (
    <div className="mb-20">
      <h2 className="text-4xl font-bold text-center mb-12 text-white">
        Frequently Asked Questions
      </h2>
      
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="border-b border-[#9b87f5]/20"
            >
              <AccordionTrigger className="text-white hover:text-[#9b87f5] transition-colors py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};