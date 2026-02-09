import Link from "next/link"
import { Button } from "@/components/ui/button"

export function StrongCTA() {
  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-balance">
          Begin Your Bhutan Journey with Aravia Peaks
        </h2>
        <p className="mx-auto max-w-2xl text-lg opacity-90 mb-8 text-balance">
          Speak with Bhutanese experts to design a journey that feels personal, immersive, and unforgettable.
        </p>
        <Button size="lg" className="btn-premium hover-glow" asChild>
          <Link href="/contact">Contact Our Experts</Link>
        </Button>
      </div>
    </section>
  )
}
