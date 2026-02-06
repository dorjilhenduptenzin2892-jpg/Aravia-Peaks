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
        <section className="relative py-16 md:py-24 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <Badge className="mb-4 bg-[#623c2b] text-white hover:bg-[#4d2f21]">{t("contact_get_in_touch")}</Badge>
              <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6 text-balance text-gray-900">
                {t("contact_title")}
              </h1>
              <p className="text-lg text-gray-600 text-balance">{t("contact_description")}</p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
              <Card className="text-center hover:shadow-lg transition-shadow border">
                <CardContent className="pt-8 pb-8">
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#623c2b] text-white text-3xl">
                    📧
                  </div>
                  <h3 className="font-semibold text-xl mb-2 text-gray-900">{t("contact_email_us")}</h3>
                  <p className="text-sm text-gray-600 mb-4">{t("contact_email_description")}</p>
                  <p className="text-[#623c2b] font-semibold">dorjicrypto1995@gmail.com</p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow border">
                <CardContent className="pt-8 pb-8">
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#623c2b] text-white text-3xl">
                    📞
                  </div>
                  <h3 className="font-semibold text-xl mb-2 text-gray-900">{t("contact_call_us")}</h3>
                  <p className="text-sm text-gray-600 mb-4">{t("contact_call_description")}</p>
                  <p className="text-[#623c2b] font-semibold">+975 17565604</p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow border">
                <CardContent className="pt-8 pb-8">
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#623c2b] text-white text-3xl">
                    💬
                  </div>
                  <h3 className="font-semibold text-xl mb-2 text-gray-900">{t("contact_whatsapp")}</h3>
                  <p className="text-sm text-gray-600 mb-4">{t("contact_whatsapp_description")}</p>
                  <a
                    href="https://wa.me/97517565604"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#623c2b] hover:text-[#4d2f21] font-semibold hover:underline"
                  >
                    {t("contact_whatsapp_chat")}
                  </a>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-12 lg:grid-cols-2">
              <Card className="relative border-0 bg-gradient-to-br from-orange-100 via-amber-100 to-yellow-100 shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden">
                {/* Decorative background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-400 to-amber-400 rounded-full blur-3xl transform translate-x-32 -translate-y-32"></div>
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-yellow-400 to-orange-400 rounded-full blur-3xl transform -translate-x-32 translate-y-32"></div>
                </div>

                <CardContent className="relative p-8 md:p-10">
                  <div className="mb-8">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-white px-5 py-2.5 rounded-full mb-4 shadow-lg transform hover:scale-105 transition-transform">
                      <span className="text-xl">✉️</span>
                      <span className="font-bold text-sm tracking-wide">Quick Contact</span>
                    </div>
                    <h2 className="font-serif text-4xl font-bold mb-4 bg-gradient-to-r from-[#623c2b] via-[#8B5A3C] to-[#A67C52] bg-clip-text text-transparent leading-tight">
                      {t("contact_send_message")}
                    </h2>
                    <p className="text-gray-700 text-lg">{t("contact_form_description")}</p>
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
                        <div className="mt-4 p-5 bg-gradient-to-br from-[#623c2b] via-[#7a4d38] to-[#8B5A3C] rounded-xl border-2 border-[#4d2f21] shadow-lg">
                          <p className="text-xs text-white/90 font-bold mb-2 uppercase tracking-wider">
                            {t("inquiry_reference_number")}
                          </p>
                          <p className="text-3xl md:text-4xl font-bold text-white tracking-wide font-mono">
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
                      <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-400 rounded-xl p-4 flex items-center gap-3 shadow-lg animate-in fade-in slide-in-from-top duration-300">
                        <div className="flex-shrink-0 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xl">⚠️</span>
                        </div>
                        <p className="text-red-800 font-semibold">{submitError}</p>
                      </div>
                    )}

                    <div className="grid gap-5 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label
                          htmlFor="contact-name"
                          className="text-gray-800 font-bold flex items-center gap-2 text-sm"
                        >
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
                            className="border-2 border-amber-300 focus:border-amber-500 focus:ring-4 focus:ring-amber-200 bg-white shadow-md hover:shadow-lg transition-all rounded-lg h-12 pl-4"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="contact-email"
                          className="text-gray-800 font-bold flex items-center gap-2 text-sm"
                        >
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
                            className="border-2 border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 bg-white shadow-md hover:shadow-lg transition-all rounded-lg h-12 pl-4"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="contact-phone"
                          className="text-gray-800 font-bold flex items-center gap-2 text-sm"
                        >
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
                            className="border-2 border-green-300 focus:border-green-500 focus:ring-4 focus:ring-green-200 bg-white shadow-md hover:shadow-lg transition-all rounded-lg h-12 pl-4"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="contact-country"
                          className="text-gray-800 font-bold flex items-center gap-2 text-sm"
                        >
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
                            className="border-2 border-purple-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 bg-white shadow-md hover:shadow-lg transition-all rounded-lg h-12 pl-4"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="contact-message"
                        className="text-gray-800 font-bold flex items-center gap-2 text-sm"
                      >
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
                          className="border-2 border-pink-300 focus:border-pink-500 focus:ring-4 focus:ring-pink-200 bg-white min-h-[140px] resize-y shadow-md hover:shadow-lg transition-all rounded-lg p-4"
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-14 text-base font-bold bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 hover:from-orange-600 hover:via-amber-600 hover:to-yellow-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] rounded-xl border-2 border-orange-600"
                    >
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
                <Card className="border shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#623c2b] text-white text-2xl">
                        📍
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2 text-gray-900">{t("contact_our_office")}</h3>
                        <p className="text-sm text-gray-600">{t("contact_office_address")}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#623c2b] text-white text-2xl">
                        🕐
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2 text-gray-900">{t("contact_business_hours")}</h3>
                        <p className="text-sm text-gray-600">
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

                <Card className="bg-gray-50 border shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-3 text-gray-900">{t("contact_why_contact")}</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex gap-2">
                        <span className="text-[#623c2b] font-bold">✓</span>
                        <span>{t("contact_reason_1")}</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-[#623c2b] font-bold">✓</span>
                        <span>{t("contact_reason_2")}</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-[#623c2b] font-bold">✓</span>
                        <span>{t("contact_reason_3")}</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-[#623c2b] font-bold">✓</span>
                        <span>{t("contact_reason_4")}</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-[#623c2b] font-bold">✓</span>
                        <span>{t("contact_reason_5")}</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-gray-900">
                {t("faq_title")}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">{t("faq_description")}</p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              <Card className="border-l-4 border-l-[#623c2b] hover:shadow-md transition-shadow bg-white">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2 text-gray-900">{t("faq_question_1")}</h3>
                  <p className="text-sm text-gray-600">{t("faq_answer_1")}</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-[#623c2b] hover:shadow-md transition-shadow bg-white">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2 text-gray-900">{t("faq_question_2")}</h3>
                  <p className="text-sm text-gray-600">{t("faq_answer_2")}</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-[#623c2b] hover:shadow-md transition-shadow bg-white">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2 text-gray-900">{t("faq_question_3")}</h3>
                  <p className="text-sm text-gray-600">{t("faq_answer_3")}</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-[#623c2b] hover:shadow-md transition-shadow bg-white">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2 text-gray-900">{t("faq_question_4")}</h3>
                  <p className="text-sm text-gray-600">{t("faq_answer_4")}</p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-8">
              <p className="text-gray-600 mb-4">{t("faq_more_questions")}</p>
              <Button
                variant="outline"
                className="border-2 border-[#623c2b] text-[#623c2b] hover:bg-[#623c2b] hover:text-white bg-transparent"
                asChild
              >
                <Link href="/travel-guide">{t("faq_view_travel_guide")}</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-[#623c2b] text-white">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-balance">
              {t("contact_ready_planning")}
            </h2>
            <p className="mx-auto max-w-2xl text-lg opacity-90 mb-8 text-balance">{t("contact_ready_description")}</p>
            <Button
              size="lg"
              className="bg-white text-[#623c2b] hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all font-semibold"
              asChild
            >
              <Link href="/inquiry">{t("get_consultation")}</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
