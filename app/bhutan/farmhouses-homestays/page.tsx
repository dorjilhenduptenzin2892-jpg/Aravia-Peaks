"use client"

import { useLanguage } from "@/lib/language-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"

export default function FarmhousesHomestaysPage() {
  const { t } = useLanguage()

  const homestays = [
    {
      name: "Paro Valley View Homestay",
      location: "Paro",
      image: "/bhutan-traditional-farmhouse-paro-valley.jpg",
      description:
        "Experience authentic Bhutanese hospitality in a traditional farmhouse nestled in the heart of Dzongdrakha village. Enjoy organic farm-to-table meals, participate in daily farming activities, and unwind with a traditional hot stone bath while taking in breathtaking valley views.",
      highlights: ["Organic farming", "Traditional hot stone bath", "Valley views", "Home-cooked meals"],
    },
    {
      name: "Punakha Heritage Homestay",
      location: "Punakha",
      image: "/bhutan-punakha-farmhouse-dzong-view.jpg",
      description:
        "Nestled in the hills overlooking the majestic Punakha Dzong, this serene homestay offers a blend of tradition and comfort. Stay in charming villas, experience authentic Bhutanese farming life, and enjoy fresh produce from the family's paddy fields and orchard.",
      highlights: ["Dzong views", "Fresh produce", "Traditional villas", "Cultural immersion"],
    },
    {
      name: "Thimphu Valley Farmhouse",
      location: "Thimphu",
      image: "/bhutan-thimphu-traditional-farmhouse-mountains.jpg",
      description:
        "A 400-year-old ancestral home carefully preserved over generations, featuring a sacred altar, warm guest spaces, and a living museum of treasured artifacts. Experience traditional hot stone baths and archery sessions with your hosts.",
      highlights: ["400-year-old heritage", "Archery sessions", "Sacred altar", "Living museum"],
    },
    {
      name: "Bumthang Countryside Retreat",
      location: "Bumthang",
      image: "/bhutan-bumthang-farmhouse-countryside.jpg",
      description:
        "Immerse yourself in the tranquil countryside of Bumthang, staying in a traditional farmhouse surrounded by apple orchards and buckwheat fields. Participate in cheese-making, butter tea preparation, and traditional weaving demonstrations.",
      highlights: ["Apple orchards", "Cheese-making", "Weaving demos", "Peaceful setting"],
    },
    {
      name: "Haa Valley Traditional Home",
      location: "Haa Valley",
      image: "/bhutan-haa-valley-traditional-stone-house.jpg",
      description:
        "Experience the unspoiled beauty of Haa Valley in a century-old stone farmhouse. This remote homestay offers spectacular mountain views, traditional yak herding experiences, and authentic Haap cuisine prepared with locally sourced ingredients.",
      highlights: ["Mountain views", "Yak herding", "Stone architecture", "Remote location"],
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-primary/5 to-accent/10">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <Badge className="mb-4 bg-accent text-accent-foreground">{t("farmhouse_badge")}</Badge>
              <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6 text-balance">
                {t("farmhouse_title")} <span className="text-accent">Bhutan</span>
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl text-balance mb-8">{t("farmhouse_description")}</p>
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl mb-12 text-center">
              {t("farmhouse_why_choose")}
            </h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16">
              <Card className="border-2 hover:border-accent transition-colors">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-2xl">
                    🏡
                  </div>
                  <h3 className="font-semibold text-xl mb-2">{t("farmhouse_benefit_1_title")}</h3>
                  <p className="text-muted-foreground text-sm">{t("farmhouse_benefit_1_text")}</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-accent transition-colors">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-2xl">
                    🏛️
                  </div>
                  <h3 className="font-semibold text-xl mb-2">{t("farmhouse_benefit_2_title")}</h3>
                  <p className="text-muted-foreground text-sm">{t("farmhouse_benefit_2_text")}</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-accent transition-colors">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-2xl">
                    ❤️
                  </div>
                  <h3 className="font-semibold text-xl mb-2">{t("farmhouse_benefit_3_title")}</h3>
                  <p className="text-muted-foreground text-sm">{t("farmhouse_benefit_3_text")}</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-accent transition-colors">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-2xl">
                    🍲
                  </div>
                  <h3 className="font-semibold text-xl mb-2">{t("farmhouse_benefit_4_title")}</h3>
                  <p className="text-muted-foreground text-sm">{t("farmhouse_benefit_4_text")}</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-accent transition-colors">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-2xl">
                    ⛰️
                  </div>
                  <h3 className="font-semibold text-xl mb-2">{t("farmhouse_benefit_5_title")}</h3>
                  <p className="text-muted-foreground text-sm">{t("farmhouse_benefit_5_text")}</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-accent transition-colors">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-2xl">
                    🧘
                  </div>
                  <h3 className="font-semibold text-xl mb-2">{t("farmhouse_benefit_6_title")}</h3>
                  <p className="text-muted-foreground text-sm">{t("farmhouse_benefit_6_text")}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Homestays Listings */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-6">
            <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl mb-12 text-center">
              {t("farmhouse_featured_title")}
            </h2>

            <div className="space-y-8">
              {homestays.map((homestay, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative h-80 md:h-auto overflow-hidden">
                      <Image
                        src={homestay.image}
                        alt={homestay.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                        {homestay.location}
                      </Badge>
                    </div>
                    <CardContent className="p-8 flex flex-col justify-between">
                      <div>
                        <h3 className="font-serif text-2xl font-bold mb-3">{homestay.name}</h3>
                        <p className="text-muted-foreground mb-6">{homestay.description}</p>

                        <div className="mb-6">
                          <h4 className="font-semibold mb-2">{t("farmhouse_highlights")}</h4>
                          <div className="flex flex-wrap gap-2">
                            {homestay.highlights.map((highlight, i) => (
                              <Badge key={i} variant="outline" className="border-accent/30">
                                {highlight}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button asChild className="px-6 py-3 text-sm font-semibold">
                          <Link href="/inquiry" className="flex items-center gap-2">
                            {t("farmhouse_book_now")}
                            <span className="inline-block">→</span>
                          </Link>
                        </Button>
                        <Button asChild variant="outline" className="shadow-sm border-2 bg-transparent">
                          <Link href="/inquiry">{t("farmhouse_learn_more")}</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-balance">
              {t("farmhouse_cta_title")}
            </h2>
            <p className="mx-auto max-w-2xl text-lg opacity-90 mb-8 text-balance">{t("farmhouse_cta_description")}</p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" variant="secondary" className="gap-2 shadow-lg border-2 border-white/20" asChild>
                <Link href="/inquiry">{t("farmhouse_cta_button_plan")}</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 border-primary-foreground/20 bg-primary-foreground/10 hover:bg-primary-foreground/20 shadow-md"
                asChild
              >
                <Link href="/contact">{t("contact_us")}</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
