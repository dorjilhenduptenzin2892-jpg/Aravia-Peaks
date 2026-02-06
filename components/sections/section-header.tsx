import type React from "react"

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  align?: "left" | "center"
}) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      {eyebrow ? <div className="mb-4 inline-flex items-center gap-2">{eyebrow}</div> : null}
      <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-balance">{title}</h2>
      {description ? <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{description}</p> : null}
    </div>
  )
}
