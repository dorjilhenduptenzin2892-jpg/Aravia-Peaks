"use client"

import { useMemo, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import packages from "@/data/packages"
import PackageCard from "@/components/PackageCard"
import SmartImage from "@/components/SmartImage"

export default function PackagesPageClient() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [difficultyFilter, setDifficultyFilter] = useState("all")
  const [durationFilter, setDurationFilter] = useState("all")

  const filteredPackages = useMemo(() => {
    return packages.filter((pkg) => {
      const categoryMatch = categoryFilter === "all" || pkg.category === categoryFilter
      const difficultyMatch =
        difficultyFilter === "all" || (pkg.difficulty || "").toLowerCase() === difficultyFilter
      const durationMatch =
        durationFilter === "all" ||
        (durationFilter === "short" &&
          (pkg.duration.includes("4") || pkg.duration.includes("5") || pkg.duration.includes("6"))) ||
        (durationFilter === "medium" &&
          (pkg.duration.includes("7") ||
            pkg.duration.includes("8") ||
            pkg.duration.includes("9") ||
            pkg.duration.includes("10"))) ||
        (durationFilter === "long" &&
          (pkg.duration.includes("11") ||
            pkg.duration.includes("12") ||
            pkg.duration.includes("15") ||
            pkg.duration.includes("25")))
      const searchMatch =
        !searchTerm ||
        [pkg.title, pkg.description, ...pkg.highlights].some((value) =>
          value.toLowerCase().includes(searchTerm.toLowerCase()),
        )

      return categoryMatch && difficultyMatch && durationMatch && searchMatch
    })
  }, [packages, searchTerm, categoryFilter, difficultyFilter, durationFilter])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0">
            <SmartImage src="/images/package-bg.webp" alt="Bhutan tours" className="h-full w-full object-cover" />
            <div className="absolute inset-0 hero-gradient" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
          </div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="mx-auto max-w-3xl text-center text-white">
              <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6 text-balance">
                Curated Bhutan Journeys
              </h1>
              <p className="text-lg text-white/90 text-balance">
                Explore handcrafted itineraries across Bhutan’s festivals, mountains, and cultural heartland.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 section-tint">
          <div className="container px-4 md:px-6 space-y-8">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Input
                placeholder="Search by region, theme, or experience"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="festival">Festival Tours</SelectItem>
                  <SelectItem value="cultural">Cultural Tours</SelectItem>
                  <SelectItem value="trekking">Trekking Tours</SelectItem>
                  <SelectItem value="adventure">Adventure Tours</SelectItem>
                  <SelectItem value="luxury">Luxury Tours</SelectItem>
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
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPackages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
