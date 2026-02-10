"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { GallerySlider } from "@/components/packages/gallery-slider"
import { PackageHighlights } from "@/components/packages/package-highlights"
import { PackageItinerary } from "@/components/packages/package-itinerary"
import { PackageInfoPanel } from "@/components/packages/package-info-panel"
import { ImageLoader } from "@/components/media/image-loader"
import { packageCategories, type TourPackage } from "@/lib/data/packages"
import { packageUi } from "@/lib/content/package-ui"

export function PackageDetails({ pkg }: { pkg: TourPackage }) {
  const categoryLabel = packageCategories.find((cat) => cat.slug === pkg.category)?.label ?? pkg.category

  return (
    <div className="flex flex-col gap-12">
      <section className="relative min-h-[55vh] overflow-hidden">
        <div className="absolute inset-0">
          <ImageLoader src={pkg.heroImage} alt={pkg.title} fill className="object-cover" priority />
          <div className="absolute inset-0 hero-gradient" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
        </div>
        <div className="container px-4 md:px-6 relative z-10 py-24">
          <div className="max-w-3xl text-white space-y-4">
            <Badge variant="secondary" className="bg-white/15 text-white border-white/20">
              {categoryLabel}
            </Badge>
            <h1 className="font-serif text-4xl md:text-5xl font-bold">{pkg.title}</h1>
            <p className="text-lg text-white/90">{pkg.description}</p>
            <div className="flex flex-wrap gap-3 text-sm text-white/90">
              <span className="rounded-full bg-white/15 px-3 py-1">{pkg.durationLabel}</span>
              <span className="rounded-full bg-white/15 px-3 py-1">{pkg.difficulty}</span>
              <span className="rounded-full bg-white/15 px-3 py-1">{pkg.region}</span>
              <span className="rounded-full bg-white/15 px-3 py-1">{pkg.comfortLevel} comfort</span>
            </div>
          </div>
        </div>
      </section>

      <section className="container px-4 md:px-6 grid gap-10 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-10">
          <Card className="card-premium border border-border/60">
            <CardContent className="p-6 space-y-4">
              <h2 className="font-serif text-2xl font-bold">{packageUi.overview}</h2>
              <p className="text-muted-foreground">{pkg.summary}</p>
              <PackageHighlights highlights={pkg.highlights} />
            </CardContent>
          </Card>

          <Card className="card-premium border border-border/60">
            <CardContent className="p-6 space-y-4">
              <h2 className="font-serif text-2xl font-bold">{packageUi.itinerary}</h2>
              <PackageItinerary itinerary={pkg.itinerary} />
            </CardContent>
          </Card>

          <Card className="card-premium border border-border/60">
            <CardContent className="p-6 space-y-4">
              <h2 className="font-serif text-2xl font-bold">{packageUi.gallery}</h2>
              <GallerySlider images={pkg.gallery} title={pkg.title} />
            </CardContent>
          </Card>

          <Card className="card-premium border border-border/60">
            <CardContent className="p-6 space-y-4">
              <h2 className="font-serif text-2xl font-bold">{packageUi.inclusions}</h2>
              <div className="grid gap-2 text-sm text-muted-foreground">
                {pkg.included.map((item) => (
                  <div key={item}>• {item}</div>
                ))}
              </div>
              {pkg.excluded.length ? (
                <div className="pt-4">
                  <h3 className="font-semibold">{packageUi.exclusions}</h3>
                  <div className="grid gap-2 text-sm text-muted-foreground">
                    {pkg.excluded.map((item) => (
                      <div key={item}>• {item}</div>
                    ))}
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>

          <Card className="card-premium border border-border/60">
            <CardContent className="p-6 space-y-4">
              <h2 className="font-serif text-2xl font-bold">{packageUi.faqs}</h2>
              <div className="space-y-3">
                {pkg.faqs.map((faq) => (
                  <div key={faq.question}>
                    <p className="font-semibold">{faq.question}</p>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <PackageInfoPanel pkg={pkg} />
          <Card className="card-premium glass-card border border-border/60">
            <CardContent className="p-6 space-y-3">
              <h3 className="text-lg font-semibold">{packageUi.map}</h3>
              <p className="text-sm text-muted-foreground">{packageUi.mapNote}</p>
              <div className="relative h-40 rounded-lg overflow-hidden">
                <ImageLoader src="/images/package-bg.webp" alt="Bhutan map" fill className="object-cover" />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
