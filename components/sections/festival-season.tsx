import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SectionHeader } from "@/components/sections/section-header"

const seasons = [
  { season: "Spring", months: "Mar–May", note: "Clear skies & festivals" },
  { season: "Summer", months: "Jun–Aug", note: "Lush valleys & wellness" },
  { season: "Autumn", months: "Sep–Nov", note: "Peak trekking & tshechus" },
  { season: "Winter", months: "Dec–Feb", note: "Quiet luxury & cranes" },
]

export function FestivalSeason() {
  return (
    <section className="py-16 md:py-24 section-tint">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          eyebrow={<Badge variant="secondary">Festival & Seasonal Travel</Badge>}
          title="Plan your journey around Bhutan’s calendar"
          description="Festivals follow the lunar calendar and are the heart of Bhutanese culture. We help you plan the perfect season."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {seasons.map((item) => (
            <Card key={item.season} className="card-premium border border-border/60 bg-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-1">{item.season}</h3>
                <p className="text-sm text-muted-foreground mb-2">{item.months}</p>
                <p className="text-sm text-muted-foreground">{item.note}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button asChild>
            <Link href="/festivals">View Festival Calendar</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
