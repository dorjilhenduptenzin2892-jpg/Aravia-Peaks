import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SectionHeader } from "@/components/sections/section-header"

const articles = [
  {
    title: "Best time to visit Bhutan",
    description: "Seasonal insights for festivals, trekking, and cultural tours.",
    href: "/travel-guide",
  },
  {
    title: "Visa & SDF requirements",
    description: "What you need to know before you travel.",
    href: "/travel-guide",
  },
  {
    title: "Cultural etiquette",
    description: "Respectful travel tips from local experts.",
    href: "/travel-guide",
  },
]

export function TravelGuideSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          eyebrow={<Badge variant="secondary">Travel Guide & Blog</Badge>}
          title="Plan with confidence"
          description="Practical guidance and insider tips from Bhutan-based experts."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Card key={article.title} className="border border-border/60 bg-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{article.description}</p>
                <Button variant="outline" size="sm" asChild>
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
