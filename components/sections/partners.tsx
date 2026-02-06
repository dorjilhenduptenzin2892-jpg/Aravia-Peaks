import Image from "next/image"
import { SectionHeader } from "@/components/sections/section-header"
import { Badge } from "@/components/ui/badge"

const logos = [
  { name: "Bhutan Tourism", src: "/placeholder-logo.svg" },
  { name: "Licensed Operator", src: "/placeholder-logo.svg" },
  { name: "Hotel Partners", src: "/placeholder-logo.svg" },
  { name: "Airline Partners", src: "/placeholder-logo.svg" },
  { name: "Sustainable Travel", src: "/placeholder-logo.svg" },
]

export function Partners() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          eyebrow={<Badge variant="secondary">Trust & Certification</Badge>}
          title="Licensed Bhutan tour operator"
          description="Government-approved, safety-focused, and committed to sustainable tourism."
        />

        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 items-center">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="flex items-center justify-center rounded-xl border border-border/60 bg-card p-4"
            >
              <Image src={logo.src} alt={logo.name} width={120} height={40} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
