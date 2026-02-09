import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SectionHeader } from "@/components/sections/section-header"

const featuredTours = [
  {
    id: "paro-tshechu",
    title: "Paro Tshechu Festival Tour",
    description: "Witness sacred mask dances and Bhutan’s most iconic cultural celebrations.",
    duration: "7 Days / 6 Nights",
    region: "Paro",
    difficulty: "Easy",
    highlights: ["Sacred festivals", "Tiger’s Nest", "Cultural immersion"],
    image: "/paro-tshechu-festival-bhutan-colorful-masks-dancin.jpg",
  },
  {
    id: "druk-path-trek",
    title: "Druk Path Trek",
    description: "A classic Himalayan crossing with alpine lakes and panoramic passes.",
    duration: "8 Days / 7 Nights",
    region: "Paro–Thimphu",
    difficulty: "Moderate",
    highlights: ["High passes", "Sacred lakes", "Remote camps"],
    image: "/druk-path-trek-alpine-lakes-mountains-bhutan.jpg",
  },
  {
    id: "luxury-bhutan",
    title: "Luxury Bhutan Experience",
    description: "Refined stays, private guiding, and serene wellness rituals.",
    duration: "7 Days / 6 Nights",
    region: "Western Bhutan",
    difficulty: "Easy",
    highlights: ["Boutique lodges", "Wellness", "Private experiences"],
    image: "/luxury-resort-bhutan-mountains-spa-five-star-hotel.jpg",
  },
]

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
            <Card key={tour.id} className="card-premium overflow-hidden border border-border/60 bg-card">
              <div className="relative h-56">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{tour.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{tour.description}</p>
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-4">
                  <Badge variant="outline">{tour.duration}</Badge>
                  <Badge variant="outline">{tour.region}</Badge>
                  <Badge variant="outline">{tour.difficulty}</Badge>
                </div>
                <div className="flex flex-wrap gap-2 text-xs mb-5">
                  {tour.highlights.map((item) => (
                    <Badge key={item} className="bg-accent/10 text-accent border border-accent/30">
                      {item}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <Button size="sm" variant="outline" className="hover-glow" asChild>
                    <Link href={`/packages/${tour.id}`}>View Itinerary</Link>
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
