import { SectionHeader } from "@/components/sections/section-header"
import { Badge } from "@/components/ui/badge"

const steps = [
  {
    title: "Discover",
    description: "Choose your experience style, dates, and budget.",
  },
  {
    title: "Design",
    description: "We craft a personalized itinerary with local expertise.",
  },
  {
    title: "Confirm",
    description: "Secure permits, hotels, and guides with full transparency.",
  },
  {
    title: "Travel",
    description: "Enjoy Bhutan with on‑ground support and curated moments.",
  },
]

export function HowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          eyebrow={<Badge variant="secondary">How It Works</Badge>}
          title="A seamless journey from inquiry to arrival"
          description="We handle every detail so you can focus on the experience."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.title} className="rounded-2xl border border-border/60 bg-card p-6">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                {index + 1}
              </div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
