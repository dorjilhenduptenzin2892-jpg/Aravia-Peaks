import PackageDetailClient from "./package-detail-client"

// Generate static params for all package IDs at build time
export function generateStaticParams() {
  return [
    { id: "paro-tshechu" },
    { id: "cultural-heritage" },
    { id: "thimphu-tshechu" },
    { id: "punakha-drubchen" },
    { id: "jambay-lhakhang" },
    { id: "spiritual-journey" },
    { id: "eastern-bhutan" },
    { id: "western-highlights" },
    { id: "druk-path-trek" },
    { id: "jomolhari-trek" },
    { id: "snowman-trek" },
    { id: "dagala-thousand-lakes" },
    { id: "luxury-bhutan" },
    { id: "luxury-wellness" },
    { id: "photography-tour" },
    { id: "birdwatching" },
  ]
}

export default async function PackageDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <PackageDetailClient id={id} />
}
