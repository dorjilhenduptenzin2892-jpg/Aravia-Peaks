import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { SectionHeader } from "@/components/sections/section-header"

const faqs = [
  {
    question: "Do I need a visa to visit Bhutan?",
    answer: "Yes. All international travelers (except Indian nationals) require a visa arranged through a licensed Bhutanese tour operator.",
  },
  {
    question: "What is the Sustainable Development Fee (SDF)?",
    answer: "Bhutan charges a daily SDF to support sustainable tourism and preserve culture and environment. We include this in all packages.",
  },
  {
    question: "Can you customize a private itinerary?",
    answer: "Absolutely. We tailor itineraries by travel style, duration, interests, and budget. Use the Trip Builder or contact us directly.",
  },
  {
    question: "How early should I book for festivals?",
    answer: "Festival seasons sell out quickly. We recommend booking 6–12 months ahead for best availability.",
  },
]

export function FAQSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          eyebrow={<Badge variant="secondary">FAQ</Badge>}
          title="Everything you need to know"
          description="Quick answers to common questions about visiting Bhutan."
        />

        <div className="mt-10 max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
