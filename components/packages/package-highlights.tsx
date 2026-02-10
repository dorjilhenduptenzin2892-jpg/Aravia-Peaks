import { Badge } from "@/components/ui/badge"

export function PackageHighlights({ highlights }: { highlights: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {highlights.map((item) => (
        <Badge key={item} variant="outline" className="text-xs">
          {item}
        </Badge>
      ))}
    </div>
  )
}
