"use client"

import { useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PackageCard } from "@/components/packages/package-card"
import { ImageLoader } from "@/components/media/image-loader"
import { getAllPackages, packageCategories } from "@/lib/data/packages"
import { packageUi } from "@/lib/content/package-ui"
import Link from "next/link"

export default function PackagesPageClient() {
  const searchParams = useSearchParams()
  const categoryParam = (searchParams.get("category") || "all").toLowerCase()
  const [activeTab, setActiveTab] = useState(
    ["all", ...packageCategories.map((cat) => cat.slug)].includes(categoryParam) ? categoryParam : "all",
  )
  const [searchTerm, setSearchTerm] = useState("")
  const [regionFilter, setRegionFilter] = useState("all")
  const [difficultyFilter, setDifficultyFilter] = useState("all")
  const [durationFilter, setDurationFilter] = useState("all")
  const [comfortFilter, setComfortFilter] = useState("all")

  const packages = getAllPackages()

  const filteredPackages = useMemo(() => {
    return packages.filter((pkg) => {
      const categoryMatch = activeTab === "all" || pkg.category === activeTab
      const regionMatch = regionFilter === "all" || pkg.region.toLowerCase().includes(regionFilter)
      const difficultyMatch = difficultyFilter === "all" || pkg.difficulty.toLowerCase() === difficultyFilter
      const comfortMatch = comfortFilter === "all" || pkg.comfortLevel.toLowerCase() === comfortFilter
      const durationMatch =
        durationFilter === "all" ||
        (durationFilter === "short" && pkg.durationDays <= 6) ||
        (durationFilter === "medium" && pkg.durationDays >= 7 && pkg.durationDays <= 10) ||
        (durationFilter === "long" && pkg.durationDays >= 11)
      const searchMatch =
        !searchTerm ||
        [pkg.title, pkg.summary, pkg.region, pkg.category].some((value) =>
          value.toLowerCase().includes(searchTerm.toLowerCase()),
        )

      return categoryMatch && regionMatch && difficultyMatch && durationMatch && comfortMatch && searchMatch
    })
  }, [packages, activeTab, regionFilter, difficultyFilter, durationFilter, comfortFilter, searchTerm])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0">
            <ImageLoader src="/images/package-bg.webp" alt="Bhutan tours" fill className="object-cover" priority />
            <div className="absolute inset-0 hero-gradient" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
          </div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="mx-auto max-w-3xl text-center text-white">
              <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6 text-balance">
                {packageUi.heroTitle}
              </h1>
              <p className="text-lg text-white/90 text-balance">{packageUi.heroDescription}</p>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 section-tint">
          <div className="container px-4 md:px-6 space-y-8">
            <div className="grid gap-4 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
              <Input
                placeholder={packageUi.searchPlaceholder}
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
              <Select value={regionFilter} onValueChange={setRegionFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="western">Western</SelectItem>
                  <SelectItem value="central">Central</SelectItem>
                  <SelectItem value="eastern">Eastern</SelectItem>
                  <SelectItem value="northern">Northern</SelectItem>
                </SelectContent>
              </Select>
              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Difficulty</SelectItem>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="challenging">Challenging</SelectItem>
                  <SelectItem value="extreme">Extreme</SelectItem>
                </SelectContent>
              </Select>
              <Select value={durationFilter} onValueChange={setDurationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Durations</SelectItem>
                  <SelectItem value="short">4–6 Days</SelectItem>
                  <SelectItem value="medium">7–10 Days</SelectItem>
                  <SelectItem value="long">11+ Days</SelectItem>
                </SelectContent>
              </Select>
              <Select value={comfortFilter} onValueChange={setComfortFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Comfort Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="essential">Essential</SelectItem>
                  <SelectItem value="comfort">Comfort</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="luxury">Luxury</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex justify-center mb-6">
                <TabsList className="grid w-full max-w-5xl grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
                  <TabsTrigger value="all">All Tours</TabsTrigger>
                  {packageCategories.map((cat) => (
                    <TabsTrigger key={cat.slug} value={cat.slug}>
                      {cat.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <TabsContent value={activeTab} className="mt-0">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredPackages.map((pkg) => (
                    <PackageCard key={`${pkg.category}-${pkg.slug}`} pkg={pkg} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <div className="rounded-2xl border border-border/60 bg-card p-8 text-center">
              <h2 className="font-serif text-2xl font-bold mb-2">{packageUi.customizeCtaTitle}</h2>
              <p className="text-muted-foreground mb-6">{packageUi.customizeCtaDescription}</p>
              <Button asChild className="btn-premium hover-glow">
                <Link href="/inquiry">{packageUi.customizeCtaButton}</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
