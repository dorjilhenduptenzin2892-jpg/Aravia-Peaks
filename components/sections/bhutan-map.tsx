import Image from "next/image"
import Link from "next/link"
import { SectionHeader } from "@/components/sections/section-header"

const regions = [
  { name: "Paro", description: "Tiger’s Nest & heritage", region: "western" },
  { name: "Thimphu", description: "Capital culture & arts", region: "western" },
  { name: "Punakha", description: "Dzongs & rivers", region: "western" },
  { name: "Bumthang", description: "Spiritual heartland", region: "central" },
  { name: "Haa Valley", description: "Alpine scenery", region: "western" },
  { name: "Phobjikha", description: "Black-necked cranes", region: "central" },
]

export function BhutanMap() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          title="Interactive Bhutan Map"
          description="Explore iconic regions and discover the experiences each valley offers."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-2 items-center">
          <div className="relative h-80 md:h-[420px] rounded-2xl overflow-hidden border border-border/60 bg-card">
            <Image
              src="/bhutan-himalayan-mountains-prayer-flags-temple-scenic.jpg"
              alt="Bhutan map"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {regions.map((region) => (
              <Link
                key={region.name}
                href={`/packages?region=${region.region}`}
                className="rounded-xl border border-border/60 bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <h3 className="font-semibold text-lg">{region.name}</h3>
                <p className="text-sm text-muted-foreground">{region.description}</p>
                <span className="mt-3 inline-flex text-sm font-semibold text-primary">Explore tours →</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
