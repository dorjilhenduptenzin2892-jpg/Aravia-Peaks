"use client"

import { useState, useEffect, type FormEvent, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { useLanguage } from "@/lib/language-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { sendInquiryEmail } from "@/app/actions/send-inquiry"

function InquiryForm() {
  const { t } = useLanguage()
  const searchParams = useSearchParams()
  const [submitted, setSubmitted] = useState(false)
  const [referenceNumber, setReferenceNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    packageType: "",
    travelMonth: "",
    groupSize: "",
    duration: "",
    message: "",
  })

  useEffect(() => {
    const packageId = searchParams.get("package")
    const packageName = searchParams.get("name")
    const packageCategory = searchParams.get("category")
    const packageDuration = searchParams.get("duration")

    if (packageId) {
      setFormData((prev) => ({
        ...prev,
        packageType:
          packageCategory === "Festival Tour"
            ? "festival"
            : packageCategory === "Cultural Tour"
            ? "cultural"
            : packageCategory === "Trekking"
            ? "trekking"
            : packageCategory === "Luxury"
            ? "luxury"
            : prev.packageType,
        duration: packageDuration?.includes("10")
          ? "9-12"
          : packageDuration?.includes("7") || packageDuration?.includes("8")
          ? "6-8"
          : packageDuration?.includes("5")
          ? "3-5"
          : packageDuration?.includes("13-15")
          ? "13-15"
          : prev.duration,
        message: packageName ? `I am interested in the ${packageName} package.` : prev.message,
      }))
    }
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const result = await sendInquiryEmail(formData)
      if (result.success) {
        setReferenceNumber(result.referenceNumber || "")
        setSubmitted(true)
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div>
      <Header />

      {submitted ? (
        // ------------------- Submitted UI -------------------
        <main className="min-h-screen bg-gradient-to-b from-background to-muted/40 pt-24 pb-16">
          <div className="container px-4 mx-auto max-w-2xl">
            <Card className="card-premium glass-card border border-border/60 shadow-xl">
              <CardHeader className="text-center bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-b">
                <div className="mx-auto mb-4 w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-4xl">
                  <span aria-hidden="true">✓</span>
                </div>
                <CardTitle className="text-3xl">{t("inquiry_success_title")}</CardTitle>
                <CardDescription className="text-lg">{t("inquiry_success_description")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-8">
                <div className="p-8 bg-gradient-to-br from-primary via-primary/90 to-secondary rounded-xl border border-primary/40 shadow-2xl">
                  <p className="text-sm text-white/90 font-bold mb-3 uppercase tracking-wider">
                    {t("inquiry_reference_number")}
                  </p>
                  <p className="text-4xl md:text-5xl font-bold text-white tracking-wide">{referenceNumber}</p>
                  <p className="text-sm text-white/80 mt-4 flex items-center gap-2">
                    <span className="text-xl">💾</span>
                    {t("inquiry_save_number")}
                  </p>
                </div>

                <div className="flex gap-4 justify-center pt-4">
                  <Button onClick={() => (window.location.href = "/")} variant="outline" className="gap-2 hover-glow">
                    <span aria-hidden="true">←</span> {t("inquiry_back_home")}
                  </Button>
                  <Button onClick={() => (window.location.href = "/packages")} className="gap-2 btn-premium hover-glow">
                    {t("inquiry_explore_packages")} <span aria-hidden="true">→</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      ) : (
        // ------------------- Form UI -------------------
        <main className="min-h-screen bg-gradient-to-b from-background to-muted/40 pt-24 pb-16">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <Badge
                className="mb-4 bg-primary/10 text-primary border-primary/30 px-4 py-2 text-base"
                variant="outline"
              >
                🏔️ {t("inquiry_plan_journey")}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                {t("inquiry_start_adventure")}{" "}
                <span className="text-primary">{t("inquiry_bhutan_adventure")}</span>
              </h1>
              <p className="text-lg text-muted-foreground">{t("inquiry_share_dreams")}</p>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="grid gap-8 lg:grid-cols-3">
                {/* Left Column: Form */}
                <div className="lg:col-span-2">
                  <Card className="card-premium glass-card border border-border/60 shadow-xl">
                    <CardHeader className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-b border-border/60">
                      <CardTitle className="text-2xl text-primary">{t("inquiry_form_title")}</CardTitle>
                      <CardDescription className="text-muted-foreground">{t("inquiry_form_description")}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-8">
                      <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Personal Information */}
                        <div className="space-y-6">
                          <h3 className="text-lg font-semibold text-primary border-b pb-2">{t("inquiry_personal_info")}</h3>
                          <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor="fullName">{t("inquiry_full_name")} *</Label>
                              <Input
                                id="fullName"
                                placeholder={t("inquiry_full_name_placeholder")}
                                value={formData.fullName}
                                onChange={(e) => handleChange("fullName", e.target.value)}
                                required
                                className="border border-border/60 focus:border-primary"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="email">{t("inquiry_email")} *</Label>
                              <Input
                                id="email"
                                type="email"
                                placeholder={t("inquiry_email_placeholder")}
                                value={formData.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                                required
                                className="border border-border/60 focus:border-primary"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="phone">{t("inquiry_phone")}</Label>
                              <Input
                                id="phone"
                                type="tel"
                                placeholder={t("inquiry_phone_placeholder")}
                                value={formData.phone}
                                onChange={(e) => handleChange("phone", e.target.value)}
                                className="border border-border/60 focus:border-primary"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="country">{t("inquiry_country")} *</Label>
                              <Input
                                id="country"
                                placeholder={t("inquiry_country_placeholder")}
                                value={formData.country}
                                onChange={(e) => handleChange("country", e.target.value)}
                                required
                                className="border border-border/60 focus:border-primary"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Trip Details */}
                        <div className="space-y-6">
                          <h3 className="text-lg font-semibold text-primary border-b pb-2">{t("inquiry_trip_details")}</h3>
                          <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor="packageType">{t("inquiry_package_type")} *</Label>
                              <Select value={formData.packageType} onValueChange={(value) => handleChange("packageType", value)}>
                                <SelectTrigger className="border border-border/60 focus:border-primary">
                                  <SelectValue placeholder={t("inquiry_select_package")} />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="cultural">{t("inquiry_cultural_tour")}</SelectItem>
                                  <SelectItem value="festival">{t("inquiry_festival_tour")}</SelectItem>
                                  <SelectItem value="trekking">{t("inquiry_trekking")}</SelectItem>
                                  <SelectItem value="luxury">{t("inquiry_luxury")}</SelectItem>
                                  <SelectItem value="custom">{t("inquiry_custom")}</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="travelMonth">{t("inquiry_travel_month")} *</Label>
                              <Select value={formData.travelMonth} onValueChange={(value) => handleChange("travelMonth", value)}>
                                <SelectTrigger className="border border-border/60 focus:border-primary">
                                  <SelectValue placeholder={t("inquiry_select_month")} />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="jan-2026">January 2026</SelectItem>
                                  <SelectItem value="feb-2026">February 2026</SelectItem>
                                  <SelectItem value="mar-2026">March 2026</SelectItem>
                                  <SelectItem value="apr-2026">April 2026</SelectItem>
                                  <SelectItem value="may-2026">May 2026</SelectItem>
                                  <SelectItem value="jun-2026">June 2026</SelectItem>
                                  <SelectItem value="jul-2026">July 2026</SelectItem>
                                  <SelectItem value="aug-2026">August 2026</SelectItem>
                                  <SelectItem value="sep-2026">September 2026</SelectItem>
                                  <SelectItem value="oct-2026">October 2026</SelectItem>
                                  <SelectItem value="nov-2026">November 2026</SelectItem>
                                  <SelectItem value="dec-2026">December 2026</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="groupSize">{t("inquiry_group_size")} *</Label>
                              <Select value={formData.groupSize} onValueChange={(value) => handleChange("groupSize", value)}>
                                <SelectTrigger className="border border-border/60 focus:border-primary">
                                  <SelectValue placeholder={t("inquiry_select_group_size")} />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="1">1 {t("inquiry_person")}</SelectItem>
                                  <SelectItem value="2">2 {t("inquiry_people")}</SelectItem>
                                  <SelectItem value="3-4">3-4 {t("inquiry_people")}</SelectItem>
                                  <SelectItem value="5-8">5-8 {t("inquiry_people")}</SelectItem>
                                  <SelectItem value="9+">9+ {t("inquiry_people")}</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="duration">{t("inquiry_duration")} *</Label>
                              <Select value={formData.duration} onValueChange={(value) => handleChange("duration", value)}>
                                <SelectTrigger className="border border-border/60 focus:border-primary">
                                  <SelectValue placeholder={t("inquiry_select_duration")} />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="3-5">3-5 {t("inquiry_days")}</SelectItem>
                                  <SelectItem value="6-8">6-8 {t("inquiry_days")}</SelectItem>
                                  <SelectItem value="9-12">9-12 {t("inquiry_days")}</SelectItem>
                                  <SelectItem value="13-15">13-15 {t("inquiry_days")}</SelectItem>
                                  <SelectItem value="15+">15+ {t("inquiry_days")}</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>

                        {/* Additional Information */}
                        <div className="space-y-6">
                          <h3 className="text-lg font-semibold text-primary border-b pb-2">{t("inquiry_additional_info")}</h3>
                          <div className="space-y-2">
                            <Label htmlFor="message">{t("inquiry_message")}</Label>
                            <Textarea
                              id="message"
                              placeholder={t("inquiry_message_placeholder")}
                              value={formData.message}
                              onChange={(e) => handleChange("message", e.target.value)}
                              className="min-h-[120px] border border-border/60 focus:border-primary"
                            />
                          </div>
                        </div>

                        {error && (
                          <div className="p-4 bg-red-50 border-2 border-red-300 rounded-lg text-red-800 font-medium">{error}</div>
                        )}

                        <button
                          type="submit"
                          disabled={isLoading}
                          className="btn-premium hover-glow w-full h-14 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span className="inline-flex items-center gap-2">
                            {isLoading ? t("inquiry_sending") : t("inquiry_submit")}
                            {!isLoading && <span className="transition-transform duration-300" aria-hidden="true">→</span>}
                          </span>
                        </button>
                      </form>
                    </CardContent>
                  </Card>
                </div>

                {/* Right Column: Info Cards */}
                <div className="space-y-6">
                  {/* Contact Info Card */}
                  <Card className="card-premium glass-card border border-border/60 shadow-lg bg-gradient-to-br from-primary/5 to-accent/5">
                    <CardHeader>
                      <CardTitle className="flex gap-2">
                        <span>📞</span> {t("inquiry_contact_info")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <p className="font-semibold text-sm text-muted-foreground">{t("inquiry_phone")}</p>
                        <p className="text-lg font-bold">+975 17565604</p>
                      </div>
                      <div className="space-y-2">
                        <p className="font-semibold text-sm text-muted-foreground">{t("inquiry_email")}</p>
                        <p className="text-lg font-bold">bhutanaraviapeaks@gmail.com</p>
                      </div>
                      <div className="space-y-2">
                        <p className="font-semibold text-sm text-muted-foreground">{t("inquiry_office_location")}</p>
                        <p className="text-lg font-bold">Thimphu, Bhutan</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      <Footer />
    </div>
  )
}

export default function InquiryPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>}>
      <InquiryForm />
    </Suspense>
  )
}
