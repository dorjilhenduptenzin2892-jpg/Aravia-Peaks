import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"
import { Badge } from "@/components/ui/badge"
import { SectionHeader } from "@/components/sections/section-header"

const trustItems = [
  {
    icon: "🏆",
    titleKey: "licensed_trusted",
    descKey: "licensed_trusted_description",
  },
  {
    icon: "❤️",
    titleKey: "authentic_experiences",
    descKey: "authentic_experiences_description",
  },
  {
    icon: "👥",
    titleKey: "expert_guides",
    descKey: "expert_guides_description",
  },
  {
    icon: "🧭",
    titleKey: "tailored_itineraries",
    descKey: "tailored_itineraries_description",
  },
  {
    icon: "📅",
    titleKey: "festival_access",
    descKey: "festival_access_description",
  },
  {
    icon: "⛰️",
    titleKey: "sustainable_tourism",
    descKey: "sustainable_tourism_description",
  },
]

export function WhyUs() {
  const { t } = useLanguage()

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          eyebrow={<Badge variant="secondary">Trusted Bhutan Experts</Badge>}
          title={t("why_choose_drukvista")}
          description={t("why_choose_description")}
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {trustItems.map((item) => (
            <Card key={item.titleKey} className="border border-border/60 bg-card">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20 text-2xl">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{t(item.titleKey)}</h3>
                <p className="text-muted-foreground">{t(item.descKey)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
