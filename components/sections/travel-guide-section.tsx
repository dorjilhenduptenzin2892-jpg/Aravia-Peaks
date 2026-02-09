import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SectionHeader } from "@/components/sections/section-header"

const articles = [
  {
    title: "Best time to visit Bhutan",
    description: "Seasonal guidance for festivals, skies, and trekking conditions.",
    href: "/travel-guide",
  },
  {
    title: "Bhutan cultural guide",
    description: "Understand etiquette, sacred sites, and living traditions.",
    href: "/travel-guide",
  },
  {
    title: "Hidden gems of Bhutan",
    description: "Quiet valleys and local encounters beyond the usual paths.",
    href: "/travel-guide",
  },
  {
    title: "Himalayan adventure stories",
    description: "Inspiration from trails, passes, and high-altitude journeys.",
    href: "/travel-guide",
  },
]

export function TravelGuideSection() {
  return (
    <section className="py-16 md:py-24 section-tint">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          eyebrow={<Badge variant="secondary">Travel Inspiration</Badge>}
          title="Stories and insights to shape your journey"
          description="Curated knowledge from Bhutan-based experts and local storytellers."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {articles.map((article) => (
            <Card key={article.title} className="card-premium border border-border/60 bg-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{article.description}</p>
                <Button variant="outline" size="sm" className="hover-glow" asChild>
                  <Link href={article.href}>Read More</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
