"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { SectionHeader } from "@/components/sections/section-header"
import type { FormEvent } from "react"

type ContactFormState = {
  fullName: string
  email: string
  phone: string
  country: string
  message: string
}

export function ContactHub({
  onSubmit,
  onChange,
  form,
  isSubmitting,
  submitSuccess,
  submitError,
  referenceNumber,
}: {
  onSubmit: (e: FormEvent) => void
  onChange: (field: keyof ContactFormState, value: string) => void
  form: ContactFormState
  isSubmitting: boolean
  submitSuccess: boolean
  submitError: string | null
  referenceNumber: string
}) {
  return (
    <section id="contact" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          title="Contact & Inquiry Hub"
          description="Tell us about your travel plans and we will respond within 24 hours."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="border border-border/60 bg-card">
              <CardContent className="p-6">
                <form onSubmit={onSubmit} className="space-y-5">
                  {submitSuccess && referenceNumber ? (
                    <div className="rounded-lg border border-primary/30 bg-primary/10 p-4 text-sm">
                      <p className="font-semibold">Message sent successfully.</p>
                      <p className="text-muted-foreground">Reference: {referenceNumber}</p>
                    </div>
                  ) : null}

                  {submitError ? (
                    <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
                      {submitError}
                    </div>
                  ) : null}

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="contact-name">Full Name</Label>
                      <Input
                        id="contact-name"
                        required
                        value={form.fullName}
                        onChange={(e) => onChange("fullName", e.target.value)}
                        placeholder="John Smith"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-email">Email</Label>
                      <Input
                        id="contact-email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => onChange("email", e.target.value)}
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-phone">Phone</Label>
                      <Input
                        id="contact-phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => onChange("phone", e.target.value)}
                        placeholder="+975 17 000 000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-country">Country</Label>
                      <Input
                        id="contact-country"
                        required
                        value={form.country}
                        onChange={(e) => onChange("country", e.target.value)}
                        placeholder="United States"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-message">Your Message</Label>
                    <Textarea
                      id="contact-message"
                      required
                      value={form.message}
                      onChange={(e) => onChange("message", e.target.value)}
                      placeholder="Tell us about your trip preferences, dates, and interests..."
                      className="min-h-[140px]"
                    />
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? "Sending..." : "Send Inquiry"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="border border-border/60 bg-card">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">Talk to an expert</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Speak directly with our Bhutan-based travel specialists.
                </p>
                <div className="space-y-2 text-sm">
                  <p>📞 +975 17565604</p>
                  <p>✉️ dorjicrypto1995@gmail.com</p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://wa.me/97517565604" target="_blank" rel="noopener noreferrer">
                      WhatsApp Chat
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border/60 bg-card">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">Need inspiration?</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Browse curated itineraries or request a custom route.
                </p>
                <Button variant="secondary" size="sm" asChild>
                  <Link href="/packages">Explore Tours</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
