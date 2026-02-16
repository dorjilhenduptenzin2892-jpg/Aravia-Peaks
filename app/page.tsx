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
import { AboutAravia } from "@/components/sections/about-aravia"
import { CustomTourBuilder } from "@/components/sections/custom-tour-builder"
import { Partners } from "@/components/sections/partners"
import { ContactHub } from "@/components/sections/contact-hub"
import { StrongCTA } from "@/components/sections/strong-cta"
import { sendContactEmail } from "@/app/actions/send-contact"

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Bhutan Aravia Peaks",
    url: "https://aravia-peaks.vercel.app",
    description:
      "Locally owned Bhutan travel specialists offering custom cultural tours, treks, and festival journeys.",
    areaServed: "Bhutan",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "bhutanaraviapeaks@gmail.com",
      telephone: "+975 17565604",
    },
  }

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="flex-1">
        <HomeHero />
        <WhyUs />
        <ExperienceGrid />
        <FeaturedTours />
        <AboutAravia />
        <BhutanMap />
        <FestivalSeason />
        <Testimonials />
        <TravelGuideSection />
        <CustomTourBuilder />
        <Partners />
        <StrongCTA />
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
