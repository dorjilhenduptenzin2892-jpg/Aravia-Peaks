"use client"

import { useState, type FormEvent, type ChangeEvent } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { SectionHeader } from "@/components/sections/section-header"
import { sendInquiryEmail } from "@/app/actions/send-inquiry"

const travelTypes = ["Solo", "Couple", "Family", "Group"]
const durations = ["4–6 Days", "7–10 Days", "11–14 Days", "15+ Days"]
const interests = ["Culture", "Trekking", "Luxury", "Festivals", "Wellness", "Photography"]
const budgets = ["Standard", "Premium", "Luxury"]

export function CustomTourBuilder() {
  const [selectedType, setSelectedType] = useState("")
  const [selectedDuration, setSelectedDuration] = useState("")
  const [selectedBudget, setSelectedBudget] = useState("")
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [travelDates, setTravelDates] = useState("")
  const [groupSize, setGroupSize] = useState("")
  const [details, setDetails] = useState("")

  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [country, setCountry] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [reference, setReference] = useState("")

  const toggleInterest = (value: string) => {
    setSelectedInterests((prev: string[]) =>
      prev.includes(value) ? prev.filter((item: string) => item !== value) : [...prev, value],
    )
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setSuccess(false)

    try {
      const result = await sendInquiryEmail({
        fullName,
        email,
        phone,
        country,
        packageType: `Custom Tour - ${selectedType} / ${selectedInterests.join(", ") || "General"}`,
        travelMonth: travelDates || "Flexible",
        groupSize: groupSize || "Not specified",
        duration: selectedDuration || "Flexible",
        budget: selectedBudget || "Flexible",
        message: details || "No additional details provided",
      })

      if (result?.success) {
        setSuccess(true)
        setReference(result.referenceNumber || "")
        setFullName("")
        setEmail("")
        setPhone("")
        setCountry("")
        setSelectedType("")
        setSelectedDuration("")
        setSelectedBudget("")
        setSelectedInterests([])
        setTravelDates("")
        setGroupSize("")
        setDetails("")
      } else {
        setError(result?.message || "Could not send your request.")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="custom-tour" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          eyebrow={<Badge variant="secondary">Custom Tour Builder</Badge>}
          title="Design a bespoke Bhutan journey"
          description="Tell us your style, dates, and interests. Our experts will craft a personalized itinerary."
        />

        <form onSubmit={handleSubmit} className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-border/60 bg-card p-6 space-y-6">
            <div>
              <Label className="text-sm font-semibold">Travel Type</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {travelTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSelectedType(type)}
                    className={`rounded-full px-4 py-2 text-sm border transition-colors ${
                      selectedType === type
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border text-foreground/80 hover:text-foreground"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-sm font-semibold">Duration</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {durations.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setSelectedDuration(item)}
                    className={`rounded-full px-4 py-2 text-sm border transition-colors ${
                      selectedDuration === item
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border text-foreground/80 hover:text-foreground"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-sm font-semibold">Interests</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {interests.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleInterest(item)}
                    className={`rounded-full px-4 py-2 text-sm border transition-colors ${
                      selectedInterests.includes(item)
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border text-foreground/80 hover:text-foreground"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-sm font-semibold">Budget Range</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {budgets.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setSelectedBudget(item)}
                    className={`rounded-full px-4 py-2 text-sm border transition-colors ${
                      selectedBudget === item
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border text-foreground/80 hover:text-foreground"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="travel-dates">Preferred Travel Dates</Label>
                <Input
                  id="travel-dates"
                  placeholder="March 2026"
                  value={travelDates}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setTravelDates(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="group-size">Group Size</Label>
                <Input
                  id="group-size"
                  placeholder="2 Adults"
                  value={groupSize}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setGroupSize(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="details">Additional Details</Label>
              <Textarea
                id="details"
                placeholder="Tell us about preferences, pace, hotels, or special occasions."
                value={details}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDetails(e.target.value)}
                className="min-h-[120px]"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card p-6 space-y-5">
            <h3 className="text-lg font-semibold">Contact Details</h3>

            {success && reference ? (
              <div className="rounded-lg border border-primary/30 bg-primary/10 p-4 text-sm">
                Request sent successfully. Reference: {reference}
              </div>
            ) : null}

            {error ? (
              <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
                {error}
              </div>
            ) : null}

            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="full-name">Full Name</Label>
                <Input
                  id="full-name"
                  required
                  value={fullName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  required
                  value={phone}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  required
                  value={country}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setCountry(e.target.value)}
                />
              </div>
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Submitting..." : "Request Custom Itinerary"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}
