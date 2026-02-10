import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SectionHeader } from "@/components/sections/section-header"
import SmartImage from "@/components/SmartImage"
import { getPackageBySlug, getPackagePath, type TourPackage } from "@/lib/data/packages"

const featuredTours = [
  getPackageBySlug("paro-tshechu"),
  getPackageBySlug("druk-path-trek"),
  getPackageBySlug("luxury-bhutan"),
].filter((tour): tour is TourPackage => Boolean(tour))

export function FeaturedTours() {
  return (
    <section className="py-16 md:py-24 section-tint">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          eyebrow={<Badge variant="secondary">Featured Journeys</Badge>}
          title="Handpicked journeys designed for depth"
          description="Immersive itineraries that reveal Bhutan beyond the expected."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredTours.map((tour) => (
            <Card key={tour.slug} className="card-premium overflow-hidden border border-border/60 bg-card">
              <div className="relative h-56">
                <SmartImage src={tour.heroImage} alt={tour.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{tour.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{tour.summary}</p>
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-4">
                  <Badge variant="outline">{tour.durationLabel}</Badge>
                  <Badge variant="outline">{tour.region}</Badge>
                  <Badge variant="outline">{tour.difficulty}</Badge>
                </div>
                <div className="flex flex-wrap gap-2 text-xs mb-5">
                  {tour.highlights.slice(0, 3).map((item) => (
                    <Badge key={item} className="bg-accent/10 text-accent border border-accent/30">
                      {item}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <Button size="sm" variant="outline" className="hover-glow" asChild>
                    <Link href={getPackagePath(tour)}>View Itinerary</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button asChild>
            <Link href="/packages">Explore All Tours</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
