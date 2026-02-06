import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SectionHeader } from "@/components/sections/section-header"

const experiences = [
  {
    title: "Culture & Heritage",
    description: "Temples, dzongs, villages, and living traditions.",
    image: "/bhutan-traditional-colorful-dzong-architecture.jpg",
    href: "/packages",
  },
  {
    title: "Trekking & Adventure",
    description: "High-altitude trails, lakes, and sacred peaks.",
    image: "/druk-path-trek-alpine-lakes-mountains-bhutan.jpg",
    href: "/packages",
  },
  {
    title: "Luxury & Wellness",
    description: "Resorts, hot-stone baths, and mindful escapes.",
    image: "/luxury-resort-bhutan-mountains-spa-five-star-hotel.jpg",
    href: "/packages",
  },
  {
    title: "Festivals & Events",
    description: "Tshechus, mask dances, and spiritual ceremonies.",
    image: "/bhutan-festival-masked-dancers-colorful-costumes-c.jpg",
    href: "/festivals",
  },
  {
    title: "Nature & Wildlife",
    description: "Cranes, valleys, and pristine Himalayan landscapes.",
    image: "/bhutan-himalayan-birds-black-necked-crane-colorful.jpg",
    href: "/travel-guide",
  },
  {
    title: "Community Homestays",
    description: "Authentic village stays hosted by local families.",
    image: "/bhutan-bumthang-farmhouse-countryside.jpg",
    href: "/bhutan/farmhouses-homestays",
  },
]

export function ExperienceGrid() {
  return (
    <section id="experiences" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          eyebrow={<Badge variant="secondary">Explore Bhutan by Experience</Badge>}
          title="Curated journeys for every traveler"
          description="Choose the experience that fits your travel style and let us craft the rest."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {experiences.map((item) => (
            <Link key={item.title} href={item.href} className="group block">
              <Card className="overflow-hidden border border-border/60 bg-card transition-all duration-300 hover:shadow-xl">
                <div className="relative h-48">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
