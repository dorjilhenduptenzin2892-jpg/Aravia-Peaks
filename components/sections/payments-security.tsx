import { Badge } from "@/components/ui/badge"
import { SectionHeader } from "@/components/sections/section-header"

const items = [
  "Visa / Mastercard accepted",
  "Secure payments",
  "Licensed Bhutan tour operator",
  "Sustainable tourism commitment",
]

export function PaymentsSecurity() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          eyebrow={<Badge variant="secondary">Security & Trust</Badge>}
          title="Pay securely, travel with peace of mind"
          description="We follow Bhutan tourism regulations and international booking standards."
        />
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {items.map((item) => (
            <Badge key={item} variant="secondary" className="px-4 py-2 text-sm">
              {item}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  )
}
