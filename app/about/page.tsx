"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
  const { t } = useLanguage()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-32 md:py-40 overflow-hidden">
          <Image
            src="/bhutan-traditional-colorful-dzong-fortress-archite.jpg"
            alt="Bhutan Traditional Architecture"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
          <div className="container px-4 md:px-6 relative z-10 max-w-7xl mx-auto">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xl md:text-2xl text-white font-medium text-balance mb-6 drop-shadow-lg">
                {t("about_welcome")}
              </p>
              <p className="text-base md:text-lg text-white/95 text-balance drop-shadow-md">{t("about_intro")}</p>
            </div>
          </div>
        </section>

        {/* Who We Are */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="relative h-96 rounded-lg overflow-hidden order-2 lg:order-1">
                <Image
                  src="/bhutan-local-bhutanese-guides-traditional-dress-mo.jpg"
                  alt="Bhutanese Landscape"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl mb-6">{t("who_we_are")}</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>{t("who_we_are_text")}</p>
                  <p className="text-foreground font-semibold text-lg">{t("who_we_are_tagline")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl mb-6">{t("our_mission")}</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{t("our_mission_text")}</p>
          </div>
        </section>

        {/* What Makes Us Different */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                {t("what_makes_different")}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">{t("what_makes_different_subtitle")}</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-2xl">
                    🏠
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{t("locally_owned")}</h3>
                  <p className="text-muted-foreground">{t("locally_owned_text")}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-2xl">
                    ✨
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{t("authentic_experiences")}</h3>
                  <p className="text-muted-foreground">{t("about_authentic_text")}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-2xl">
                    🎯
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{t("personalized_journeys")}</h3>
                  <p className="text-muted-foreground">{t("personalized_journeys_text")}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-2xl">
                    🛡️
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{t("licensed_trusted")}</h3>
                  <p className="text-muted-foreground">{t("about_trusted_text")}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Discover Bhutan With Heart */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">{t("discover_with_heart")}</h2>
              <p className="text-lg text-muted-foreground">{t("discover_with_heart_text")}</p>
              <div className="pt-4">
                <p className="text-xl font-semibold text-foreground mb-2">{t("discover_tagline")}</p>
                <p className="text-lg text-muted-foreground italic">{t("discover_subtitle")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-balance">
              {t("ready_adventure")}
            </h2>
            <p className="mx-auto max-w-2xl text-lg opacity-90 mb-8 text-balance">{t("ready_adventure_description")}</p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/inquiry">{t("plan_journey")}</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
