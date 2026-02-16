import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type ThankYouSearchParams = {
  [key: string]: string | string[] | undefined
}

export const metadata: Metadata = {
  title: "Inquiry Received | Bhutan Aravia Peaks",
  description: "Thanks for your inquiry. Our travel specialists will respond within 24 hours.",
}

const getStringValue = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] ?? "" : value ?? ""

export default function ThankYouPage({ searchParams }: { searchParams?: ThankYouSearchParams }) {
  const params = searchParams ?? {}
  const referenceNumber = getStringValue(params.ref)
  const name = getStringValue(params.name)

  return (
    <div>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-background to-muted/40 pt-24 pb-16">
        <div className="container px-4 mx-auto max-w-2xl">
          <Card className="card-premium glass-card border border-border/60 shadow-xl">
            <CardHeader className="text-center bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-b">
              <div className="mx-auto mb-4 w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-4xl">
                <span aria-hidden="true">✓</span>
              </div>
              <CardTitle className="text-3xl">Thank you{name ? `, ${name}` : ""}!</CardTitle>
              <CardDescription className="text-lg">
                Your inquiry has been received. A Bhutan specialist will reach out within 24 hours.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-8">
              {referenceNumber && (
                <div className="p-8 bg-gradient-to-br from-primary via-primary/90 to-secondary rounded-xl border border-primary/40 shadow-2xl">
                  <p className="text-sm text-white/90 font-bold mb-3 uppercase tracking-wider">Inquiry reference</p>
                  <p className="text-4xl md:text-5xl font-bold text-white tracking-wide">{referenceNumber}</p>
                  <p className="text-sm text-white/80 mt-4 flex items-center gap-2">
                    <span className="text-xl">💾</span>
                    Save this number for your records.
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button asChild variant="outline" className="gap-2 hover-glow">
                  <Link href="/">
                    <span aria-hidden="true">←</span> Back home
                  </Link>
                </Button>
                <Button asChild className="gap-2 btn-premium hover-glow">
                  <Link href="/packages">
                    Explore packages <span aria-hidden="true">→</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
