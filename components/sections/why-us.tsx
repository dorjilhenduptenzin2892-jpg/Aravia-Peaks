import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"
import { Badge } from "@/components/ui/badge"
import { SectionHeader } from "@/components/sections/section-header"

const trustItems = [
  {
    icon: "🇧🇹",
    title: "Local Bhutanese expertise",
    description: "Guided by locals who live the culture, landscapes, and traditions.",
  },
  {
    icon: "🧭",
    title: "Personalized itineraries",
    description: "Each journey is tailored to your pace, interests, and travel style.",
  },
  {
    icon: "🏯",
    title: "Authentic cultural immersion",
    description: "Meaningful encounters with Bhutan’s people and sacred places.",
  },
  {
    icon: "🌿",
    title: "Responsible tourism",
    description: "Sustainable practices that protect Bhutan’s environment and heritage.",
  },
  {
    icon: "✨",
    title: "Seamless travel planning",
    description: "Every detail coordinated with care from arrival to departure.",
  },
  {
    icon: "🕊️",
    title: "24/7 traveler support",
    description: "Reliable assistance before, during, and after your journey.",
  },
]

export function WhyUs() {
  const { t } = useLanguage()

  return (
    <section className="py-16 md:py-24 section-tint">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          eyebrow={<Badge variant="secondary">Why Aravia Peaks</Badge>}
          title="Crafted by Bhutanese experts"
          description="Premium service, local insight, and authentic experiences built for global travelers."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {trustItems.map((item) => (
            <Card key={item.title} className="card-premium border border-border/60 bg-card">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20 text-2xl">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
