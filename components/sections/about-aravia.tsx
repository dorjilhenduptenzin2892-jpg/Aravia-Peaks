import { Badge } from "@/components/ui/badge"
import { SectionHeader } from "@/components/sections/section-header"

export function AboutAravia() {
  return (
    <section className="py-16 md:py-24 section-tint">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          eyebrow={<Badge variant="secondary">About Aravia Peaks</Badge>}
          title="Bhutanese expertise, global service standards"
          description="Aravia Peaks is a Bhutan-based travel company dedicated to crafting meaningful journeys across the Kingdom of Bhutan. Combining local expertise with global service standards, we curate personalized experiences that reveal Bhutan beyond the ordinary."
        />
      </div>
    </section>
  )
}
