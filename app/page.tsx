"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"
import { useState, type FormEvent } from "react"
import { sendContactEmail } from "@/app/actions/send-contact"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function Home() {
  const { t } = useLanguage()
  const [contactForm, setContactForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [contactReferenceNumber, setContactReferenceNumber] = useState("")

  const handleContactSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const result = await sendContactEmail(contactForm)
      if (result.success) {
        setContactReferenceNumber(result.referenceNumber || "")
        setSubmitSuccess(true)
        setContactForm({ fullName: "", email: "", phone: "", country: "", message: "" })
        setTimeout(() => {
          setSubmitSuccess(false)
          setContactReferenceNumber("")
        }, 10000)
      } else {
        setSubmitError(result.message)
      }
    } catch (error) {
      setSubmitError("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleContactChange = (field: string, value: string) => {
    setContactForm((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url('/bhutan-himalayan-mountain-landscape-kingdom-thunde.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/70" />
          </div>

          <div className="container relative z-10 px-4 text-center md:px-6">
            <Badge className="mb-6 bg-accent text-accent-foreground shadow-xl text-sm px-4 py-2" variant="secondary">
              {t("licensed_tour_operator")}
            </Badge>
            <h1
              className="font-serif text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl text-balance mb-8 leading-tight"
              style={{ textShadow: "3px 3px 12px rgba(0,0,0,0.9), 0 0 30px rgba(0,0,0,0.7)" }}
            >
              {t("hero_title")} <span className="text-accent block mt-2">{t("thunder_dragon")}</span>
            </h1>
            <p
              className="mx-auto max-w-2xl text-xl text-white md:text-2xl text-balance mb-10 leading-relaxed"
              style={{ textShadow: "2px 2px 6px rgba(0,0,0,0.95), 0 0 15px rgba(0,0,0,0.8)" }}
            >
              {t("hero_description")}
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center text-background">
              <Button
                size="default"
                className="gap-2 shadow-2xl border-2 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-300 text-base px-6 py-3 hover:scale-105 bg-gradient-to-r from-[#D9A05C] to-[#C8944D] hover:from-[#C8944D] hover:to-[#B8843D] text-white border-[#B8843D] font-bold uppercase tracking-wide"
                asChild
              >
                <Link href="/packages">{t("explore_packages")} →</Link>
              </Button>
              <Link
                href="/festivals"
                className="relative overflow-hidden inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white border-3 border-yellow-400 rounded-md shadow-[0_0_30px_rgba(249,115,22,0.8)] hover:shadow-[0_0_60px_rgba(249,115,22,1)] hover:border-yellow-300 transition-all duration-500 text-base px-6 py-3 h-auto hover:scale-105 font-bold uppercase tracking-wide animate-[pulse_2s_ease-in-out_infinite] hover:animate-none group active:scale-[0.98]"
              >
                <span className="text-xl animate-bounce group-hover:animate-spin transition-all duration-300">🎭</span>
                <span className="relative z-10">{t("festival_calendar")}</span>
                <span className="text-xl group-hover:translate-x-2 transition-transform duration-300">✨</span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose DrukVista */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-background to-muted/30">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
                {t("why_choose_drukvista")}
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground text-lg text-balance">
                {t("why_choose_description")}
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-2 hover:border-accent transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer bg-card/50 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-accent/15 text-3xl transition-all duration-300 hover:scale-110 hover:bg-accent/25 hover:rotate-6 shadow-lg">
                    🏆
                  </div>
                  <h3 className="font-semibold text-2xl mb-3">{t("licensed_trusted")}</h3>
                  <p className="text-muted-foreground leading-relaxed">{t("licensed_trusted_description")}</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-accent transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer bg-card/50 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-accent/15 text-3xl transition-all duration-300 hover:scale-110 hover:bg-accent/25 hover:rotate-6 shadow-lg">
                    ❤️
                  </div>
                  <h3 className="font-semibold text-2xl mb-3">{t("authentic_experiences")}</h3>
                  <p className="text-muted-foreground leading-relaxed">{t("authentic_experiences_description")}</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-accent transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer bg-card/50 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-accent/15 text-3xl transition-all duration-300 hover:scale-110 hover:bg-accent/25 hover:rotate-6 shadow-lg">
                    👥
                  </div>
                  <h3 className="font-semibold text-2xl mb-3">{t("expert_guides")}</h3>
                  <p className="text-muted-foreground leading-relaxed">{t("expert_guides_description")}</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-accent transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer bg-card/50 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-accent/15 text-3xl transition-all duration-300 hover:scale-110 hover:bg-accent/25 hover:rotate-6 shadow-lg">
                    🧭
                  </div>
                  <h3 className="font-semibold text-2xl mb-3">{t("tailored_itineraries")}</h3>
                  <p className="text-muted-foreground leading-relaxed">{t("tailored_itineraries_description")}</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-accent transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer bg-card/50 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-accent/15 text-3xl transition-all duration-300 hover:scale-110 hover:bg-accent/25 hover:rotate-6 shadow-lg">
                    📅
                  </div>
                  <h3 className="font-semibold text-2xl mb-3">{t("festival_access")}</h3>
                  <p className="text-muted-foreground leading-relaxed">{t("festival_access_description")}</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-accent transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer bg-card/50 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-accent/15 text-3xl transition-all duration-300 hover:scale-110 hover:bg-accent/25 hover:rotate-6 shadow-lg">
                    ⛰️
                  </div>
                  <h3 className="font-semibold text-2xl mb-3">{t("sustainable_tourism")}</h3>
                  <p className="text-muted-foreground leading-relaxed">{t("sustainable_tourism_description")}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Packages */}
        <section className="py-20 md:py-28 bg-background">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-16">
              <div>
                <h2 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-4">
                  {t("featured_packages")}
                </h2>
                <p className="text-muted-foreground text-lg">{t("featured_packages_description")}</p>
              </div>
              <Button
                variant="outline"
                asChild
                className="hidden md:flex bg-transparent shadow-md border-2 hover:shadow-xl hover:scale-105 transition-all"
              >
                <Link href="/packages">{t("view_all")}</Link>
              </Button>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Package 1 - Paro Tshechu */}
              <Link href="/packages/paro-tshechu" className="block">
                <Card className="overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-500 border-2 hover:border-accent hover:-translate-y-3 bg-card h-full">
                  <div className="relative h-72 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{
                        backgroundImage: `url('/images/tshechu.webp')`,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute top-4 right-4 animate-pulse">
                      <Badge className="bg-accent text-accent-foreground shadow-lg px-3 py-1 text-sm">Popular</Badge>
                    </div>
                  </div>
                  <CardContent className="p-7">
                    <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground font-medium">
                      <span className="text-base">📅</span>
                      <span>7 Days / 6 Nights</span>
                    </div>
                    <h3 className="font-semibold text-2xl mb-3 group-hover:text-[#623c2b] transition-colors leading-tight">
                      {t("paro_tshechu_title")}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                      {t("paro_tshechu_description")}
                    </p>
                    <div className="flex flex-col gap-3 pt-4 border-t-2">
                      <p className="text-xs text-center text-muted-foreground">
                        Contact our licensed travel agent partners for pricing
                      </p>
                      <span className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground font-medium shadow-lg border-2 border-accent/30 group-hover:shadow-xl group-hover:scale-105 transition-all">
                        {t("view_details")}{" "}
                        <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              {/* Package 2 - Cultural Heritage */}
              <Link href="/packages/cultural-heritage" className="block">
                <Card className="overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-500 border-2 hover:border-accent hover:-translate-y-3 bg-card h-full">
                  <div className="relative h-72 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{
                        backgroundImage: `url('/tigers-nest-monastery-bhutan-cliff-mountain.jpg')`,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  </div>
                  <CardContent className="p-7">
                    <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground font-medium">
                      <span className="text-base">📅</span>
                      <span>5 Days / 4 Nights</span>
                    </div>
                    <h3 className="font-semibold text-2xl mb-3 group-hover:text-[#623c2b] transition-colors leading-tight">
                      {t("cultural_heritage_title")}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                      {t("cultural_heritage_description")}
                    </p>
                    <div className="flex flex-col gap-3 pt-4 border-t-2">
                      <p className="text-xs text-center text-muted-foreground">
                        Contact our licensed travel agent partners for pricing
                      </p>
                      <span className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground font-medium shadow-lg border-2 border-accent/30 group-hover:shadow-xl group-hover:scale-105 transition-all">
                        {t("view_details")} <span>→</span>
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              {/* Package 3 - Druk Path Trek */}
              <Link href="/packages/druk-path-trek" className="block">
                <Card className="overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-500 border-2 hover:border-accent hover:-translate-y-3 bg-card h-full">
                  <div className="relative h-72 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{
                        backgroundImage: `url('/himalayan-trekking-adventure-mountain-landscape-bh.jpg')`,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-primary text-primary-foreground shadow-lg px-3 py-1 text-sm">
                        Adventure
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-7">
                    <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground font-medium">
                      <span className="text-base">📅</span>
                      <span>10 Days / 9 Nights</span>
                    </div>
                    <h3 className="font-semibold text-2xl mb-3 group-hover:text-[#623c2b] transition-colors leading-tight">
                      {t("trekking_title")}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{t("trekking_description")}</p>
                    <div className="flex flex-col gap-3 pt-4 border-t-2">
                      <p className="text-xs text-center text-muted-foreground">
                        Contact our licensed travel agent partners for pricing
                      </p>
                      <span className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground font-medium shadow-lg border-2 border-accent/30 group-hover:shadow-xl group-hover:scale-105 transition-all">
                        {t("view_details")} <span>→</span>
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>

            <div className="mt-8 text-center md:hidden">
              <Button
                variant="outline"
                asChild
                className="shadow-sm border-2 bg-transparent hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <Link href="/packages">{t("view_all_packages")}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* About Bhutan Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div>
                <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6 text-balance">
                  {t("experience_kingdom")}
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>{t("about_bhutan_para1")}</p>
                  <p>{t("about_bhutan_para2")}</p>
                  <p className="font-semibold text-foreground">{t("about_bhutan_para3")}</p>
                </div>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-all duration-300">
                    <Link href="/about">{t("learn_more")}</Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="shadow-md hover:shadow-lg transition-all duration-300 bg-transparent"
                  >
                    <Link href="/festivals">{t("plan_journey")}</Link>
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div
                  className="aspect-square rounded-lg bg-cover bg-center"
                  style={{
                    backgroundImage: `url('/bhutan-traditional-colorful-dzong-architecture.jpg')`,
                  }}
                />
                <div
                  className="aspect-square rounded-lg bg-cover bg-center mt-8"
                  style={{
                    backgroundImage: `url('/bhutan-buddhist-monks-prayer-ceremony-monastery.jpg')`,
                  }}
                />
                <div
                  className="aspect-square rounded-lg bg-cover bg-center -mt-8"
                  style={{
                    backgroundImage: `url('/bhutan-prayer-flags-mountain-landscape.jpg')`,
                  }}
                />
                <div
                  className="aspect-square rounded-lg bg-cover bg-center"
                  style={{
                    backgroundImage: `url('/bhutan-traditional-dress-gho-kira-people.jpg')`,
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 relative overflow-hidden">
          {/* Decorative background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "radial-gradient(circle, #D9A05C 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            ></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100 to-amber-100 rounded-full mb-4 border-2 border-orange-200">
                <span className="text-2xl">🎭</span>
                <span className="text-sm font-semibold text-orange-800 uppercase tracking-wide">
                  Bhutan Festivals 2026
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
                {t("festival_calendar")}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Experience the vibrant cultural celebrations throughout the year
              </p>
            </div>

            {/* Interactive Festival Preview Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {/* Paro Tshechu */}
              <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-orange-300 hover:-translate-y-2">
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    Popular
                  </span>
                </div>
                <div className="h-48 bg-gradient-to-br from-orange-400 to-amber-500 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-7xl opacity-20">🎭</div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-white font-bold text-xl">Paro Tshechu</h3>
                    <p className="text-orange-200 text-sm">March 30 - April 1, 2026</p>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <span className="text-orange-500">📍</span>
                    <span>Paro Dzong</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    One of the most popular festivals featuring traditional masked dances and the unveiling of the
                    sacred Thongdrel.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                      5 Days
                    </span>
                    <span className="text-xs text-gray-500">Western Region</span>
                  </div>
                </div>
              </div>

              {/* Thimphu Tshechu */}
              <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-blue-300 hover:-translate-y-2">
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    Capital
                  </span>
                </div>
                <div className="h-48 bg-gradient-to-br from-blue-400 to-indigo-500 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-7xl opacity-20">🎪</div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-white font-bold text-xl">Thimphu Tshechu</h3>
                    <p className="text-blue-200 text-sm">September 19-21, 2026</p>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <span className="text-blue-500">📍</span>
                    <span>Tashichho Dzong</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    The grandest festival in the capital city, attracting thousands of locals and visitors for religious
                    celebrations.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      3 Days
                    </span>
                    <span className="text-xs text-gray-500">Central Region</span>
                  </div>
                </div>
              </div>

              {/* Punakha Drubchen */}
              <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-purple-300 hover:-translate-y-2">
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    Historic
                  </span>
                </div>
                <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-500 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-7xl opacity-20">🏰</div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-white font-bold text-xl">Punakha Drubchen</h3>
                    <p className="text-purple-200 text-sm">February 18-20, 2026</p>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <span className="text-purple-500">📍</span>
                    <span>Punakha Dzong</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    Unique festival reenacting the 17th-century battle, featuring warriors in traditional armor and
                    weaponry.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                      3 Days
                    </span>
                    <span className="text-xs text-gray-500">Western Region</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <Button
                size="lg"
                className="gap-3 bg-gradient-to-r from-red-500 via-orange-500 via-yellow-500 via-green-500 to-blue-500 hover:from-red-600 hover:via-orange-600 hover:via-yellow-600 hover:via-green-600 hover:to-blue-600 text-white border-0 shadow-[0_15px_50px_-10px_rgba(249,115,22,0.8)] hover:shadow-[0_25px_70px_-15px_rgba(249,115,22,1)] transition-all duration-300 text-lg px-10 py-7 hover:scale-110 font-bold rounded-xl group"
                asChild
              >
                <Link href="/festivals" className="flex items-center">
                  <span className="text-2xl mr-2">📅</span>
                  View Complete Festival Calendar 2026
                  <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </Button>
              <p className="text-sm text-gray-500 mt-4">
                45+ festivals throughout the year • Plan your cultural journey
              </p>
            </div>
          </div>
        </section>

        {/* Contact Us Section */}
        <section
          id="contact"
          className="relative w-full py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
        >
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-gray-900">{t("contact_us_title")}</h2>
              <p className="text-lg text-gray-600">{t("contact_us_subtitle")}</p>
            </div>

            <div className="bg-white rounded-2xl shadow-2xl border-2 border-[#623c2b]/20 overflow-hidden">
              <div className="bg-gradient-to-r from-[#623c2b] via-[#8B5A3C] to-[#D9A05C] p-8 text-white">
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  <span className="text-3xl">✉️</span>
                  {t("get_in_touch")}
                </h3>
                <p className="mt-2 text-white/90">{t("contact_form_description")}</p>
              </div>

              <form onSubmit={handleContactSubmit} className="p-8 space-y-6">
                {submitSuccess && contactReferenceNumber && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500 rounded-lg p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">✓</span>
                      <div>
                        <p className="text-green-800 font-bold text-lg">{t("message_sent_success")}</p>
                        <p className="text-green-700 text-sm">{t("inquiry_success_description")}</p>
                      </div>
                    </div>
                    <div className="mt-4 p-4 bg-gradient-to-br from-[#623c2b] to-[#7a4d38] rounded-lg border-2 border-[#4d2f21]">
                      <p className="text-xs text-white/90 font-bold mb-2 uppercase tracking-wider">
                        {t("inquiry_reference_number")}
                      </p>
                      <p className="text-2xl md:text-3xl font-bold text-white tracking-wide font-mono">
                        {contactReferenceNumber}
                      </p>
                      <p className="text-xs text-white/80 mt-3 flex items-center gap-2">
                        <span>💾</span>
                        {t("inquiry_save_number")}
                      </p>
                    </div>
                  </div>
                )}

                {submitError && (
                  <div className="bg-red-50 border-2 border-red-500 rounded-lg p-4 flex items-center gap-3">
                    <span className="text-2xl">⚠️</span>
                    <p className="text-red-800 font-semibold">{submitError}</p>
                  </div>
                )}

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name" className="text-gray-700 font-semibold">
                      {t("inquiry_full_name")} *
                    </Label>
                    <Input
                      id="contact-name"
                      required
                      placeholder="John Smith"
                      value={contactForm.fullName}
                      onChange={(e) => handleContactChange("fullName", e.target.value)}
                      className="border-2 border-gray-300 focus:border-[#623c2b] h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-email" className="text-gray-700 font-semibold">
                      {t("inquiry_email")} *
                    </Label>
                    <Input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={contactForm.email}
                      onChange={(e) => handleContactChange("email", e.target.value)}
                      className="border-2 border-gray-300 focus:border-[#623c2b] h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-phone" className="text-gray-700 font-semibold">
                      {t("inquiry_phone")} *
                    </Label>
                    <Input
                      id="contact-phone"
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={contactForm.phone}
                      onChange={(e) => handleContactChange("phone", e.target.value)}
                      className="border-2 border-gray-300 focus:border-[#623c2b] h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-country" className="text-gray-700 font-semibold">
                      {t("inquiry_country")} *
                    </Label>
                    <Input
                      id="contact-country"
                      required
                      placeholder="United States"
                      value={contactForm.country}
                      onChange={(e) => handleContactChange("country", e.target.value)}
                      className="border-2 border-gray-300 focus:border-[#623c2b] h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-message" className="text-gray-700 font-semibold">
                    {t("your_message")} *
                  </Label>
                  <Textarea
                    id="contact-message"
                    required
                    placeholder={t("message_placeholder")}
                    value={contactForm.message}
                    onChange={(e) => handleContactChange("message", e.target.value)}
                    className="border-2 border-gray-300 focus:border-[#623c2b] min-h-[150px] resize-y"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 text-lg font-bold bg-gradient-to-r from-[#623c2b] to-[#8B5A3C] hover:from-[#4d2f21] hover:to-[#623c2b] text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin">⏳</span>
                      {t("sending")}...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      {t("send_message")}
                      <span>→</span>
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
