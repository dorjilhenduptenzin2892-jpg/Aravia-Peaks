"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { sendContactEmail } from "@/app/actions/send-contact"
import { useState } from "react"

export default function ContactPage() {
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
  const [submitError, setSubmitError] = useState("")
  const [contactReferenceNumber, setContactReferenceNumber] = useState("")

  const handleContactChange = (field: string, value: string) => {
    setContactForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError("")
    setSubmitSuccess(false)

    try {
      const result = await sendContactEmail(contactForm)

      if (result.success) {
        setSubmitSuccess(true)
        setContactReferenceNumber(result.referenceNumber)
        setContactForm({
          fullName: "",
          email: "",
          phone: "",
          country: "",
          message: "",
        })

        setTimeout(() => {
          setSubmitSuccess(false)
          setContactReferenceNumber("")
        }, 10000)
      } else {
        setSubmitError(result.error || "Failed to send message. Please try again.")
      }
    } catch (error) {
      setSubmitError("An error occurred. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="relative py-16 md:py-24 section-tint">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <Badge className="mb-4 bg-primary text-primary-foreground">{t("contact_get_in_touch")}</Badge>
              <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6 text-balance">
                {t("contact_title")}
              </h1>
              <p className="text-lg text-muted-foreground text-balance">{t("contact_description")}</p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 section-tint">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
              <Card className="card-premium glass-card text-center border border-border/60 bg-card">
                <CardContent className="pt-8 pb-8">
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary text-3xl">
                    📧
                  </div>
                  <h3 className="font-semibold text-xl mb-2">{t("contact_email_us")}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{t("contact_email_description")}</p>
                  <p className="text-foreground font-semibold">bhutanaraviapeaks@gmail.com</p>
                </CardContent>
              </Card>

              <Card className="card-premium glass-card text-center border border-border/60 bg-card">
                <CardContent className="pt-8 pb-8">
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary text-3xl">
                    📞
                  </div>
                  <h3 className="font-semibold text-xl mb-2">{t("contact_call_us")}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{t("contact_call_description")}</p>
                  <p className="text-foreground font-semibold">+975 17565604</p>
                </CardContent>
              </Card>

              <Card className="card-premium glass-card text-center border border-border/60 bg-card">
                <CardContent className="pt-8 pb-8">
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary text-3xl">
                    💬
                  </div>
                  <h3 className="font-semibold text-xl mb-2">{t("contact_whatsapp")}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{t("contact_whatsapp_description")}</p>
                  <a
                    href="https://wa.me/97517565604"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground font-semibold hover:underline"
                  >
                    {t("contact_whatsapp_chat")}
                  </a>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-12 lg:grid-cols-2">
              <Card className="relative border border-border bg-card shadow-lg overflow-hidden card-premium glass-card">
                {/* Decorative background pattern */}
                <div className="absolute inset-0 opacity-0 pointer-events-none">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-400 to-amber-400 rounded-full blur-3xl transform translate-x-32 -translate-y-32"></div>
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-yellow-400 to-orange-400 rounded-full blur-3xl transform -translate-x-32 translate-y-32"></div>
                </div>

                <CardContent className="relative p-8 md:p-10">
                  <div className="mb-8">
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-foreground px-4 py-2 rounded-full mb-4">
                      <span className="text-xl">✉️</span>
                      <span className="font-semibold text-sm tracking-wide">Quick Contact</span>
                    </div>
                    <h2 className="font-serif text-4xl font-bold mb-4 leading-tight">
                      {t("contact_send_message")}
                    </h2>
                    <p className="text-muted-foreground text-lg">{t("contact_form_description")}</p>
                  </div>

                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    {submitSuccess && contactReferenceNumber && (
                      <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-2 border-green-400 rounded-xl p-6 space-y-4 shadow-xl animate-in fade-in slide-in-from-top duration-500">
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-white text-2xl">✓</span>
                          </div>
                          <div>
                            <p className="text-green-800 font-bold text-lg">{t("message_sent_success")}</p>
                            <p className="text-green-700 text-sm">{t("inquiry_success_description")}</p>
                          </div>
                        </div>
                        <div className="mt-4 p-5 bg-foreground rounded-xl">
                          <p className="text-xs text-white/80 font-semibold mb-2 uppercase tracking-wider">
                            {t("inquiry_reference_number")}
                          </p>
                          <p className="text-3xl md:text-4xl font-bold text-white tracking-wide font-mono">
                            {contactReferenceNumber}
                          </p>
                          <p className="text-xs text-white/70 mt-3 flex items-center gap-2">
                            <span>💾</span>
                            {t("inquiry_save_number")}
                          </p>
                        </div>
                      </div>
                    )}

                    {submitError && (
                      <div className="bg-destructive/10 border border-destructive/40 rounded-xl p-4 flex items-center gap-3">
                        <div className="flex-shrink-0 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xl">⚠️</span>
                        </div>
                        <p className="text-destructive font-semibold">{submitError}</p>
                      </div>
                    )}

                    <div className="grid gap-5 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="contact-name" className="text-foreground font-semibold text-sm">
                          <span className="text-xl">👤</span>
                          {t("inquiry_full_name")} *
                        </Label>
                        <div className="relative">
                          <Input
                            id="contact-name"
                            required
                            placeholder="John Smith"
                            value={contactForm.fullName}
                            onChange={(e) => handleContactChange("fullName", e.target.value)}
                            className="h-12"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contact-email" className="text-foreground font-semibold text-sm">
                          <span className="text-xl">📧</span>
                          {t("inquiry_email")} *
                        </Label>
                        <div className="relative">
                          <Input
                            id="contact-email"
                            type="email"
                            required
                            placeholder="john@example.com"
                            value={contactForm.email}
                            onChange={(e) => handleContactChange("email", e.target.value)}
                            className="h-12"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contact-phone" className="text-foreground font-semibold text-sm">
                          <span className="text-xl">📱</span>
                          {t("inquiry_phone")} *
                        </Label>
                        <div className="relative">
                          <Input
                            id="contact-phone"
                            type="tel"
                            required
                            placeholder="+1 (555) 000-0000"
                            value={contactForm.phone}
                            onChange={(e) => handleContactChange("phone", e.target.value)}
                            className="h-12"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contact-country" className="text-foreground font-semibold text-sm">
                          <span className="text-xl">🌍</span>
                          {t("inquiry_country")} *
                        </Label>
                        <div className="relative">
                          <Input
                            id="contact-country"
                            required
                            placeholder="United States"
                            value={contactForm.country}
                            onChange={(e) => handleContactChange("country", e.target.value)}
                            className="h-12"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-message" className="text-foreground font-semibold text-sm">
                        <span className="text-xl">💬</span>
                        {t("your_message")} *
                      </Label>
                      <div className="relative">
                        <Textarea
                          id="contact-message"
                          required
                          placeholder={t("message_placeholder")}
                          value={contactForm.message}
                          onChange={(e) => handleContactChange("message", e.target.value)}
                          className="min-h-[140px] resize-y"
                        />
                      </div>
                    </div>

                    <Button type="submit" disabled={isSubmitting} className="w-full h-14 text-base font-semibold btn-premium hover-glow">
                      {isSubmitting ? (
                        <span className="flex items-center gap-3">
                          <span className="animate-spin text-xl">⏳</span>
                          <span className="text-lg">{t("sending_message")}</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-3">
                          <span className="text-xl">📨</span>
                          <span className="text-lg">{t("contact_send_message")}</span>
                        </span>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card className="card-premium glass-card border border-border/60 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary text-2xl">
                        📍
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{t("contact_our_office")}</h3>
                        <p className="text-sm text-muted-foreground">{t("contact_office_address")}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-premium glass-card border border-border/60 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary text-2xl">
                        🕐
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{t("contact_business_hours")}</h3>
                        <p className="text-sm text-muted-foreground">
                          {t("contact_hours_weekday")}
                          <br />
                          {t("contact_hours_saturday")}
                          <br />
                          {t("contact_hours_sunday")}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-premium glass-card bg-muted/40 border border-border/60 shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-3">{t("contact_why_contact")}</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex gap-2">
                        <span className="text-primary font-bold">✓</span>
                        <span>{t("contact_reason_1")}</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary font-bold">✓</span>
                        <span>{t("contact_reason_2")}</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary font-bold">✓</span>
                        <span>{t("contact_reason_3")}</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary font-bold">✓</span>
                        <span>{t("contact_reason_4")}</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary font-bold">✓</span>
                        <span>{t("contact_reason_5")}</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 section-tint">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                {t("faq_title")}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">{t("faq_description")}</p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              <Card className="card-premium border-l-4 border-l-primary hover:shadow-md transition-shadow bg-card">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{t("faq_question_1")}</h3>
                  <p className="text-sm text-muted-foreground">{t("faq_answer_1")}</p>
                </CardContent>
              </Card>

              <Card className="card-premium border-l-4 border-l-primary hover:shadow-md transition-shadow bg-card">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{t("faq_question_2")}</h3>
                  <p className="text-sm text-muted-foreground">{t("faq_answer_2")}</p>
                </CardContent>
              </Card>

              <Card className="card-premium border-l-4 border-l-primary hover:shadow-md transition-shadow bg-card">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{t("faq_question_3")}</h3>
                  <p className="text-sm text-muted-foreground">{t("faq_answer_3")}</p>
                </CardContent>
              </Card>

              <Card className="card-premium border-l-4 border-l-primary hover:shadow-md transition-shadow bg-card">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{t("faq_question_4")}</h3>
                  <p className="text-sm text-muted-foreground">{t("faq_answer_4")}</p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-8">
              <p className="text-muted-foreground mb-4">{t("faq_more_questions")}</p>
              <Button variant="outline" className="hover-glow" asChild>
                <Link href="/travel-guide">{t("faq_view_travel_guide")}</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-balance">
              {t("contact_ready_planning")}
            </h2>
            <p className="mx-auto max-w-2xl text-lg opacity-90 mb-8 text-balance">{t("contact_ready_description")}</p>
            <Button size="lg" className="btn-premium hover-glow" asChild>
              <Link href="/inquiry">{t("get_consultation")}</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
