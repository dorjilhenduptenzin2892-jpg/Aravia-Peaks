import SmartImage from "@/components/SmartImage"

export default function PackageCard({ pkg }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
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
        </div>
        <div>
          <h3 className="text-xl font-semibold text-foreground">{pkg.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{pkg.description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {pkg.highlights.map((item) => (
            <span
              key={item}
              className="rounded-full border border-border/60 bg-muted/50 px-3 py-1 text-xs text-foreground"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}
