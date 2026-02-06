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
    duration: "7 Days / 6 Nights",
    region: "Paro",
    difficulty: "Easy",
    price: "Premium",
    image: "/paro-tshechu-festival-bhutan-colorful-masks-dancin.jpg",
  },
  {
    id: "druk-path-trek",
    title: "Druk Path Trek",
    duration: "8 Days / 7 Nights",
    region: "Paro–Thimphu",
    difficulty: "Moderate",
    price: "Adventure",
    image: "/druk-path-trek-alpine-lakes-mountains-bhutan.jpg",
  },
  {
    id: "luxury-bhutan",
    title: "Luxury Bhutan Experience",
    duration: "7 Days / 6 Nights",
    region: "Western Bhutan",
    difficulty: "Easy",
    price: "Luxury",
    image: "/luxury-resort-bhutan-mountains-spa-five-star-hotel.jpg",
  },
]

export function FeaturedTours() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          eyebrow={<Badge variant="secondary">Featured Tours</Badge>}
          title="Our most loved journeys"
          description="Handpicked experiences with the best balance of culture, comfort, and authenticity."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredTours.map((tour) => (
            <Card key={tour.id} className="overflow-hidden border border-border/60 bg-card">
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
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-4">
                  <Badge variant="outline">{tour.duration}</Badge>
                  <Badge variant="outline">{tour.region}</Badge>
                  <Badge variant="outline">{tour.difficulty}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-primary">{tour.price}</span>
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/packages/${tour.id}`}>View Details</Link>
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
