"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SectionHeader } from "@/components/sections/section-header"

const steps = [
  { id: 1, title: "Travel Style", options: ["Culture", "Trekking", "Luxury", "Wellness"] },
  { id: 2, title: "Duration", options: ["4–6 Days", "7–10 Days", "11–14 Days", "15+ Days"] },
  { id: 3, title: "Region", options: ["Western", "Central", "Eastern", "Multiple"] },
  { id: 4, title: "Budget", options: ["Standard", "Premium", "Luxury"] },
]

export function TripBuilder() {
  const [selections, setSelections] = useState<Record<number, string>>({})

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          eyebrow={<Badge variant="secondary">Build Your Trip</Badge>}
          title="Design a journey that fits you"
          description="A quick wizard to capture your preferences. Our travel experts will personalize everything else."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-4">
          {steps.map((step) => (
            <Card key={step.id} className="border border-border/60 bg-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">{step.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {step.options.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() =>
                        setSelections((prev: Record<number, string>) => ({
                          ...prev,
                          [step.id]: option,
                        }))
                      }
                      className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                        selections[step.id] === option
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border text-foreground/80 hover:text-foreground"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center gap-3">
          <Button asChild size="lg">
            <a href="/inquiry">Continue to Trip Request</a>
          </Button>
          <p className="text-sm text-muted-foreground">Or speak to an expert to refine your itinerary.</p>
        </div>
      </div>
    </section>
  )
}
