import Link from "next/link"
import SmartImage from "@/components/SmartImage"

export default function PackageCard({ pkg }) {
  const slug = pkg.slug || pkg.id
  const category = pkg.category
  const href = category ? `/packages/${category}/${slug}` : `/packages/${slug}`

  return (
    <Link href={href} className="group block">
      <article className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
        <div className="relative h-56 overflow-hidden">
          <SmartImage
            src={pkg.imagePath}
            alt={pkg.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between text-xs uppercase tracking-wide text-muted-foreground">
            <span>{pkg.duration}</span>
            {pkg.difficulty ? <span>{pkg.difficulty}</span> : null}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground">{pkg.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{pkg.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {pkg.highlights.map((item) => (
              return (
                <Link href={href} className="group block">
                  <article className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="relative overflow-hidden aspect-[4/3]">
                      <SmartImage
                        src={pkg.imagePath}
                        alt={pkg.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-xs uppercase tracking-widest text-white/80">
                        {pkg.duration}
                      </div>
                    </div>
                    <div className="p-6 space-y-3">
                      <div className="flex items-center justify-between text-xs uppercase tracking-wide text-muted-foreground">
                        <span>{pkg.difficulty || ""}</span>
                        <span>{pkg.category}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">{pkg.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{pkg.description}</p>
                    </div>
                  </article>
                </Link>
              )
