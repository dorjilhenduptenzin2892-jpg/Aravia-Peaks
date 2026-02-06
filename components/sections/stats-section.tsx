import { SectionHeader } from "@/components/sections/section-header"
import { Badge } from "@/components/ui/badge"

const stats = [
  { value: "15+", label: "Years of local expertise" },
  { value: "2,500+", label: "Happy international travelers" },
  { value: "98%", label: "Five‑star satisfaction" },
  { value: "120+", label: "Custom itineraries each year" },
]

export function StatsSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          eyebrow={<Badge variant="secondary">Global Standard Service</Badge>}
          title="Experience Bhutan with confidence"
          description="Local expertise, international service standards, and trusted partnerships."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="rounded-2xl border border-border/60 bg-card p-6 text-center">
              <p className="text-3xl font-bold text-foreground mb-2">{item.value}</p>
              <p className="text-sm text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
