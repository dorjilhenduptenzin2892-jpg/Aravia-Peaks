"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { SectionHeader } from "@/components/sections/section-header"

const testimonials = [
  {
    name: "Emma R.",
    country: "United Kingdom",
    rating: 5,
    quote: "Flawless organization and deeply authentic experiences. The guides were outstanding.",
  },
  {
    name: "Michael T.",
    country: "USA",
    rating: 5,
    quote: "Every detail was handled with care. We felt safe, inspired, and truly welcomed.",
  },
  {
    name: "Sofia M.",
    country: "Spain",
    rating: 5,
    quote: "A perfect blend of culture and luxury. Bhutan Aravia Peaks is world‑class.",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-16 md:py-24 section-tint">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          eyebrow={<Badge variant="secondary">Testimonials</Badge>}
          title="Trusted by travelers worldwide"
          description="Real reviews from guests who explored Bhutan with us."
        />

        <div className="mt-10 relative">
          <Carousel opts={{ align: "start", loop: true }}>
            <CarouselContent>
              {testimonials.map((item) => (
                <CarouselItem key={item.name} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="card-premium border border-border/60 bg-card h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <span>{"★".repeat(item.rating)}</span>
                        <span>{item.country}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">“{item.quote}”</p>
                      <p className="text-sm font-semibold">{item.name}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-6" />
            <CarouselNext className="-right-6" />
          </Carousel>
        </div>
      </div>
    </section>
  )
}
