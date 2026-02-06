"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { SectionHeader } from "@/components/sections/section-header"

const gallery = [
  {
    title: "Himalayan sunrise",
    image: "/bhutan-himalayan-mountains-prayer-flags-temple-scenic.jpg",
  },
  {
    title: "Festival masks",
    image: "/bhutan-festival-masked-dancers-colorful-costumes-c.jpg",
  },
  {
    title: "Valley serenity",
    image: "/punakha-valley-bhutan-rice-fields-landscape.jpg",
  },
  {
    title: "Sacred monasteries",
    image: "/tigers-nest-monastery-bhutan-cliff-mountain.jpg",
  },
]

export function ExperienceGallery() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          eyebrow={<Badge variant="secondary">Immersive Gallery</Badge>}
          title="See Bhutan through our travelers’ eyes"
          description="Swipe through iconic moments from our curated journeys."
        />

        <div className="mt-10 relative">
          <Carousel opts={{ align: "start", loop: true }}>
            <CarouselContent>
              {gallery.map((item) => (
                <CarouselItem key={item.title} className="md:basis-1/2 lg:basis-1/3">
                  <div className="relative h-72 overflow-hidden rounded-2xl border border-border/60">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white font-semibold">{item.title}</div>
                  </div>
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
