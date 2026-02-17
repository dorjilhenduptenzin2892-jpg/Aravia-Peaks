import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { packageCategories, type TourPackage } from "@/lib/data/packages"
import { PackageItineraryAccordion } from "@/components/packages/package-itinerary-accordion"
import { PackageGalleryLightbox } from "@/components/packages/package-gallery-lightbox"
import { PackageInquiryCard } from "@/components/packages/package-inquiry-card"

const DEFAULT_HERO = "/images/package-bg.webp"

const DEFAULT_HIGHLIGHTS = [
  "Guided by licensed Bhutanese experts",
  "Handpicked stays and seamless logistics",
  "Flexible pacing tailored to your group",
]

const DEFAULT_INCLUSIONS = [
  "All ground transfers with private vehicle",
  "Licensed guide and daily support",
  "Accommodation in trusted hotels",
  "Breakfasts and selected meals",
]

const DEFAULT_FAQS = [
  {
    question: "When is the best time to visit Bhutan?",
    answer: "Spring (Mar–May) and autumn (Sep–Nov) offer the clearest skies and festival seasons.",
  },
  {
    question: "Do I need a visa to travel to Bhutan?",
    answer: "Yes. We handle the visa process once your itinerary is confirmed and payment is received.",
  },
  {
    question: "Is Bhutan suitable for families?",
    answer: "Absolutely. We tailor pacing, accommodations, and activities for all ages.",
  },
  {
    question: "Can the itinerary be customized?",
    answer: "Yes. Every journey can be adjusted to match your interests and travel style.",
  },
]

const formatCurrency = (value?: number) => {
  if (!value) return null
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value)
}

const safeArray = <T,>(value?: T[]) => (Array.isArray(value) ? value.filter(Boolean) : [])

export function PackageDetails({ pkg }: { pkg: TourPackage }) {
  const categoryLabel = packageCategories.find((cat) => cat.slug === pkg.category)?.label ?? pkg.category
  const heroImage = pkg.heroImage || DEFAULT_HERO
  const gallery = safeArray(pkg.gallery)
  const galleryImages = gallery.length ? gallery : [heroImage]

  const itineraryHighlights = safeArray(pkg.itinerary)
    .slice(0, 3)
    .map((item) => item.title)
    .filter(Boolean)

  const highlights = safeArray(pkg.highlights)
  const highlightList = highlights.length ? highlights : itineraryHighlights.length ? itineraryHighlights : DEFAULT_HIGHLIGHTS

  const inclusions = safeArray(pkg.included)
  const exclusions = safeArray(pkg.excluded)
  const faqList = safeArray(pkg.faqs).length ? safeArray(pkg.faqs) : DEFAULT_FAQS

  const quickFacts = [
    { label: "Duration", value: pkg.durationLabel || (pkg.durationDays ? `${pkg.durationDays} days` : null) },
    { label: "Best season", value: pkg.bestTime },
    { label: "From", value: formatCurrency(pkg.startingFrom) },
    { label: "Difficulty", value: pkg.difficulty },
    { label: "Region", value: pkg.region },
    { label: "Group size", value: pkg.groupSize },
  ].filter((fact) => Boolean(fact.value))

  return (
    <div className="flex flex-col bg-background">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src={heroImage} alt={pkg.title} fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 hero-gradient" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-background" />
        </div>
        <div className="relative z-10 container px-4 md:px-6 py-16 md:py-24 text-white">
          <nav className="text-xs uppercase tracking-[0.2em] text-white/70">
            <div className="flex flex-wrap items-center gap-2">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <Link href="/packages" className="hover:text-white">Packages</Link>
              <span>/</span>
              <Link href={`/packages/${pkg.category}`} className="hover:text-white">{categoryLabel}</Link>
              <span>/</span>
              <span className="text-white">{pkg.title}</span>
            </div>
          </nav>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="space-y-6">
              <Badge variant="secondary" className="bg-white/15 text-white border-white/20">
                {categoryLabel}
              </Badge>
              <h1 className="font-serif text-4xl md:text-6xl font-bold text-balance">{pkg.title}</h1>
              <p className="text-lg md:text-xl text-white/90 text-balance">{pkg.summary || pkg.description}</p>
            </div>
            {quickFacts.length ? (
              <div className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">Journey Facts</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {quickFacts.map((fact) => (
                    <div key={fact.label} className="rounded-2xl bg-white/10 px-4 py-3">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/60">{fact.label}</p>
                      <p className="mt-1 text-base font-semibold text-white">{fact.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/30" />
        <div className="relative container mx-auto max-w-6xl px-4 md:px-6 py-12">
          <div className="grid gap-10 md:grid-cols-[1fr_360px]">
            <div className="space-y-8">
              <Card className="card-premium border border-border/60 bg-card/90">
                <CardContent className="p-6 md:p-8 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Journey Overview</p>
                      <h2 className="font-serif text-2xl font-bold">Curated for immersive Bhutan travel</h2>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/inquiry">Request a quote</Link>
                    </Button>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{pkg.description || pkg.summary}</p>
                  {pkg.keywords?.length ? (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {pkg.keywords.slice(0, 8).map((keyword) => (
                        <Badge key={keyword} variant="outline" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  ) : null}
                </CardContent>
              </Card>

              {highlightList.length ? (
                <Card className="card-premium border border-border/60 bg-card/90">
                  <CardContent className="p-6 md:p-8 space-y-5">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Signature Moments</p>
                      <h2 className="font-serif text-2xl font-bold">Highlights tailored to this journey</h2>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {highlightList.map((item, index) => (
                        <div key={`${item}-${index}`} className="rounded-2xl border border-border/60 bg-background p-4">
                          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                            {index + 1}
                          </div>
                          <p className="text-sm font-semibold text-foreground">{item}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ) : null}

              <Card className="card-premium border border-border/60 bg-card/90">
                <CardContent className="p-6 md:p-8 space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Day by Day</p>
                      <h2 className="font-serif text-2xl font-bold">Immersive itinerary flow</h2>
                    </div>
                    {pkg.itinerary?.length ? (
                      <Button variant="outline" size="sm" asChild>
                        <a href="#itinerary">View details</a>
                      </Button>
                    ) : null}
                  </div>
                  <div id="itinerary">
                    <PackageItineraryAccordion
                      itinerary={safeArray(pkg.itinerary)}
                      durationDays={pkg.durationDays}
                      highlights={safeArray(pkg.highlights)}
                      packageTitle={pkg.title}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="card-premium border border-border/60 bg-card/90">
                <CardContent className="p-6 md:p-8 space-y-6">
                  <div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">What's included</p>
                      <h2 className="font-serif text-2xl font-bold">Inclusions</h2>
                    </div>
                    <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
                      {(inclusions.length ? inclusions : DEFAULT_INCLUSIONS).map((item, index) => (
                        <li key={`${item}-${index}`} className="flex gap-2">
                          <span className="mt-1 size-2 rounded-full bg-primary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {exclusions.length ? (
                    <div>
                      <h3 className="font-semibold">Exclusions</h3>
                      <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
                        {exclusions.map((item, index) => (
                          <li key={`${item}-${index}`} className="flex gap-2">
                            <span className="mt-1 size-2 rounded-full bg-muted-foreground/40" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </CardContent>
              </Card>

              <Card className="card-premium border border-border/60 bg-card/90">
                <CardContent className="p-6 md:p-8 space-y-5">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Know before you go</p>
                    <h2 className="font-serif text-2xl font-bold">FAQs</h2>
                  </div>
                  <div className="grid gap-4 text-sm text-muted-foreground">
                    {faqList.map((faq, index) => (
                      <div key={`${faq.question}-${index}`}>
                        <p className="font-semibold text-foreground">{faq.question}</p>
                        <p className="mt-1">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="card-premium border border-border/60 bg-card/90">
                <CardContent className="p-6 md:p-8 space-y-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Visual story</p>
                    <h2 className="font-serif text-2xl font-bold">Gallery</h2>
                  </div>
                  <PackageGalleryLightbox images={galleryImages} title={pkg.title} />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <div className="sticky top-24">
                <PackageInquiryCard packageTitle={pkg.title} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
