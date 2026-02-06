import Image from "next/image"
import { SectionHeader } from "@/components/sections/section-header"
import { Badge } from "@/components/ui/badge"

const logos = [
  { name: "Travel + Leisure", src: "/placeholder-logo.svg" },
  { name: "Condé Nast Traveler", src: "/placeholder-logo.svg" },
  { name: "National Geographic", src: "/placeholder-logo.svg" },
  { name: "Lonely Planet", src: "/placeholder-logo.svg" },
]

export function PressLogos() {
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          eyebrow={<Badge variant="secondary">As Seen In</Badge>}
          title="Trusted by global travelers"
          description="Our Bhutan journeys align with global luxury and adventure standards."
        />

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="flex items-center justify-center rounded-xl border border-border/60 bg-card p-4"
            >
              <Image src={logo.src} alt={logo.name} width={140} height={48} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
