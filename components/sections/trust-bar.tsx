import { Badge } from "@/components/ui/badge"

const trustItems = [
  { label: "Licensed Bhutan Tour Operator" },
  { label: "Government Approved" },
  { label: "Visa & Mastercard Accepted" },
  { label: "Sustainable Tourism" },
  { label: "24/7 Local Support" },
]

export function TrustBar() {
  return (
    <section className="py-10 bg-background border-y">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {trustItems.map((item) => (
            <Badge key={item.label} variant="secondary" className="px-4 py-2 text-sm">
              {item.label}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  )
}
