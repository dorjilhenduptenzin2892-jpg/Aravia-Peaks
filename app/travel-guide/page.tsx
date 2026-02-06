"use client"

import { useLanguage } from "@/lib/language-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export default function TravelGuidePage() {
  const { t } = useLanguage()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/bhutan-himalayan-mountains-prayer-flags-temple-scenic.jpg"
              alt="Bhutan travel guide"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
          </div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              <Badge className="mb-4 bg-accent text-accent-foreground">{t("guide_badge")}</Badge>
              <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6 text-balance text-white">
                {t("guide_title")}
              </h1>
              <p className="text-lg text-white/90 text-balance">{t("guide_subtitle")}</p>
            </div>
          </div>
        </section>

        {/* Quick Facts */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-xl">
                    📄
                  </div>
                  <CardTitle>{t("guide_visa_title")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{t("guide_visa_description")}</p>
                  <div className="text-sm">
                    <strong>{t("guide_visa_processing")}</strong> {t("guide_visa_time")}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-xl">
                    💵
                  </div>
                  <CardTitle>{t("guide_sdf_title")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{t("guide_sdf_description")}</p>
                  <div className="text-sm">
                    <strong>{t("guide_sdf_included")}</strong> {t("guide_sdf_packages")}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-xl">
                    📅
                  </div>
                  <CardTitle>{t("guide_best_time_title")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{t("guide_best_time_description")}</p>
                  <div className="text-sm">
                    <strong>{t("guide_peak_season")}</strong> {t("guide_peak_months")}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-xl">
                    ✈️
                  </div>
                  <CardTitle>{t("guide_getting_there_title")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{t("guide_getting_there_description")}</p>
                  <div className="text-sm">
                    <strong>{t("guide_flight_duration")}</strong> {t("guide_flight_time")}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-xl">
                    💼
                  </div>
                  <CardTitle>{t("guide_included_title")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{t("guide_included_description")}</p>
                  <div className="text-sm">
                    <strong>{t("guide_tour_operator_required")}</strong> {t("guide_tour_operator_mandatory")}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-xl">
                    ⛰️
                  </div>
                  <CardTitle>{t("guide_altitude_climate_title")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{t("guide_altitude_climate_description")}</p>
                  <div className="text-sm">
                    <strong>{t("guide_pack")}</strong> {t("guide_layers")}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Dos and Don'ts */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-6">
            <h2 className="font-serif text-3xl font-bold text-center mb-12">{t("guide_dos_donts")}</h2>
            <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">✓ {t("guide_dos")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <span className="text-green-600 text-xl shrink-0">✓</span>
                      <span>{t("guide_do_1")}</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-green-600 text-xl shrink-0">✓</span>
                      <span>{t("guide_do_2")}</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-green-600 text-xl shrink-0">✓</span>
                      <span>{t("guide_do_3")}</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-green-600 text-xl shrink-0">✓</span>
                      <span>{t("guide_do_4")}</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-green-600 text-xl shrink-0">✓</span>
                      <span>{t("guide_do_5")}</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-green-600 text-xl shrink-0">✓</span>
                      <span>{t("guide_do_6")}</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600">✗ {t("guide_donts")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <span className="text-red-600 text-xl shrink-0">✗</span>
                      <span>{t("guide_dont_1")}</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-red-600 text-xl shrink-0">✗</span>
                      <span>{t("guide_dont_2")}</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-red-600 text-xl shrink-0">✗</span>
                      <span>{t("guide_dont_3")}</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-red-600 text-xl shrink-0">✗</span>
                      <span>{t("guide_dont_4")}</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-red-600 text-xl shrink-0">✗</span>
                      <span>{t("guide_dont_5")}</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-red-600 text-xl shrink-0">✗</span>
                      <span>{t("guide_dont_6")}</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Top Attractions */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <h2 className="font-serif text-3xl font-bold text-center mb-4">{t("guide_attractions_title")}</h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
              {t("guide_attractions_subtitle")}
            </p>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Tiger's Nest Monastery",
                  location: "Paro",
                  description: "Iconic cliffside monastery and Bhutan's most famous landmark",
                  image: "/tigers-nest-monastery-bhutan-cliff-mountain.jpg",
                },
                {
                  name: "Punakha Dzong",
                  location: "Punakha",
                  description: "Majestic fortress at the confluence of two rivers",
                  image: "/bhutan-punakha-dzong-fortress-rivers-mountains.jpg",
                },
                {
                  name: "Buddha Dordenma",
                  location: "Thimphu",
                  description: "Giant golden Buddha statue overlooking Thimphu valley",
                  image: "/bhutan-buddha-dordenma-giant-golden-statue-thimphu.jpg",
                },
                {
                  name: "Dochula Pass",
                  location: "Thimphu-Punakha",
                  description: "Mountain pass with 108 chortens and panoramic Himalayan views",
                  image: "/bhutan-dochula-pass-108-chortens-himalayan-mountain.jpg",
                },
                {
                  name: "Phobjikha Valley",
                  location: "Wangdue",
                  description: "Glacial valley and winter home to black-necked cranes",
                  image: "/phobjikha-valley-glacial-bhutan-black-necked-crane.jpg",
                },
                {
                  name: "Bumthang Valley",
                  location: "Central Bhutan",
                  description: "Spiritual heartland with ancient temples and monasteries",
                  image: "/bhutan-bumthang-valley-ancient-temples-monasteries.jpg",
                },
              ].map((attraction) => (
                <Card key={attraction.name} className="overflow-hidden border border-border/60">
                  <div className="relative h-48">
                    <Image
                      src={attraction.image}
                      alt={attraction.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <Badge variant="secondary">{attraction.location}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{attraction.name}</h3>
                    <p className="text-sm text-muted-foreground">{attraction.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
