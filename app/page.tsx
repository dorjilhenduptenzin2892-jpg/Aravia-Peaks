"use client"

import { useState, type FormEvent } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HomeHero } from "@/components/sections/home-hero"
import { WhyUs } from "@/components/sections/why-us"
import { ExperienceGrid } from "@/components/sections/experience-grid"
import { FeaturedTours } from "@/components/sections/featured-tours"
import { BhutanMap } from "@/components/sections/bhutan-map"
import { FestivalSeason } from "@/components/sections/festival-season"
import { Testimonials } from "@/components/sections/testimonials"
import { TravelGuideSection } from "@/components/sections/travel-guide-section"
import { TripBuilder } from "@/components/sections/trip-builder"
import { Partners } from "@/components/sections/partners"
import { ContactHub } from "@/components/sections/contact-hub"
import { TrustBar } from "@/components/sections/trust-bar"
import { ExperienceGallery } from "@/components/sections/experience-gallery"
import { FAQSection } from "@/components/sections/faq-section"
import { StatsSection } from "@/components/sections/stats-section"
import { HowItWorks } from "@/components/sections/how-it-works"
import { PressLogos } from "@/components/sections/press-logos"
import { PaymentsSecurity } from "@/components/sections/payments-security"
import { Newsletter } from "@/components/sections/newsletter"
import { sendContactEmail } from "@/app/actions/send-contact"

export default function Home() {
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

  const handleContactChange = (field: keyof typeof contactForm, value: string) => {
    setContactForm((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <HomeHero />
        <TrustBar />
        <PressLogos />
        <StatsSection />
        <HowItWorks />
        <WhyUs />
        <ExperienceGrid />
        <FeaturedTours />
        <BhutanMap />
        <FestivalSeason />
        <ExperienceGallery />
        <Testimonials />
        <TravelGuideSection />
        <TripBuilder />
        <FAQSection />
        <PaymentsSecurity />
        <Newsletter />
        <Partners />
        <ContactHub
          onSubmit={handleContactSubmit}
          onChange={handleContactChange}
          form={contactForm}
          isSubmitting={isSubmitting}
          submitSuccess={submitSuccess}
          submitError={submitError}
          referenceNumber={contactReferenceNumber}
        />
      </main>

      <Footer />
    </div>
  )
}
