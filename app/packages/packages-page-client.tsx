"use client"

import { useMemo, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/input"
import packages from "@/data/packages"
import PackageCard from "@/components/PackageCard"
import SmartImage from "@/components/SmartImage"

export default function PackagesPageClient() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPackages = useMemo(() => {
    return packages.filter((pkg) => {
      const searchMatch =
        !searchTerm ||
        [pkg.title, pkg.description, ...pkg.highlights].some((value) =>
          value.toLowerCase().includes(searchTerm.toLowerCase()),
        )

      return searchMatch
    })
  }, [packages, searchTerm])

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
            <div className="max-w-2xl">
              <Input
                placeholder="Search by region, theme, or experience"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
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
