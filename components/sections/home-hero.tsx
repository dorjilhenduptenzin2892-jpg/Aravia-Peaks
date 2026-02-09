"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/language-context"

export function HomeHero() {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/bhutan-himalayan-mountain-landscape-kingdom-thunde.jpg"
          alt="Bhutan Himalayas"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center animate-fade-in-up">
        <Badge className="mb-6 bg-accent text-accent-foreground shadow-sm" variant="secondary">
          {t("licensed_tour_operator")}
        </Badge>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white text-balance mb-6">
          {t("hero_title")} <span className="text-gradient block mt-2">{t("thunder_dragon")}</span>
        </h1>
        <p className="mx-auto max-w-3xl text-lg md:text-xl text-white/90 text-balance mb-10">
          {t("hero_description")}
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button size="lg" className="btn-premium hover-glow" asChild>
            <Link href="/packages">Explore Bhutan Tours</Link>
          </Button>
          <Button size="lg" variant="secondary" className="hover-glow" asChild>
            <Link href="/inquiry">Plan Your Trip</Link>
          </Button>
          <Button size="lg" variant="outline" className="hover-glow" asChild>
            <Link href="/contact">Talk to Expert</Link>
          </Button>
        </div>

        <div className="mt-12 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-white/80">
            <span className="text-xs uppercase tracking-[0.25em]">Scroll</span>
            <div className="h-10 w-[2px] rounded-full bg-white/40 overflow-hidden">
              <div className="h-4 w-full bg-white animate-floaty" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
