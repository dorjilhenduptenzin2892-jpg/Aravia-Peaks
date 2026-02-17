"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

const WHATSAPP_NUMBER = "+97517565604"
const EMAIL_ADDRESS = "bhutanaraviapeaks@gmail.com"

export function PackageInquiryCard({ packageTitle }: { packageTitle?: string }) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Inquiry received",
        description: "We will respond within 24 hours with a personalized plan.",
      })
      event.currentTarget.reset()
    }, 500)
  }

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}?text=${encodeURIComponent(
    `Hi! I would like to know more about ${packageTitle || "a Bhutan package"}.`,
  )}`

  const emailLink = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(
    `Inquiry: ${packageTitle || "Bhutan Tour"}`,
  )}`

  return (
    <Card className="card-premium border border-border/60 shadow-xl">
      <CardContent className="p-6 space-y-6">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Plan this journey</h3>
          <p className="text-sm text-muted-foreground">
            Talk to a Bhutan expert for pricing, best travel dates, and customization.
          </p>
        </div>

        <div className="grid gap-3">
          <Button asChild className="btn-premium hover-glow">
            <a href={whatsappLink} target="_blank" rel="noreferrer">
              WhatsApp our team
            </a>
          </Button>
          <Button asChild variant="outline" className="hover-glow">
            <a href={emailLink}>Email for a quote</a>
          </Button>
        </div>

        <div className="rounded-xl border border-border/60 p-4 bg-muted/40">
          <form className="grid gap-3" onSubmit={handleSubmit}>
            <Input name="name" placeholder="Your name" required />
            <Input name="email" type="email" placeholder="Email address" required />
            <Textarea name="message" placeholder="Travel dates, interests, number of guests" rows={3} />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send inquiry"}
            </Button>
          </form>
        </div>

        <div className="grid gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span aria-hidden="true">✅</span> Licensed local guides
          </div>
          <div className="flex items-center gap-2">
            <span aria-hidden="true">✅</span> Flexible dates & custom routes
          </div>
          <div className="flex items-center gap-2">
            <span aria-hidden="true">✅</span> 24-hour response guarantee
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
