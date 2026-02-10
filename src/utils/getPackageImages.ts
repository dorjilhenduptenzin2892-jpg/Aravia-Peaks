const manifestCandidates = (slug: string) => [
  `/packages/${slug}/manifest.json`,
  `/images/packages/${slug}/manifest.json`,
]

type Manifest = {
  images: string[]
}

const normalizeImages = (base: string, images: string[]) =>
  images.map((img) => (img.startsWith("/") ? img : `${base}/${img}`))

export async function getPackageImages(slug: string): Promise<string[]> {
  for (const manifestUrl of manifestCandidates(slug)) {
    try {
      const res = await fetch(manifestUrl, { cache: "no-store" })
      if (!res.ok) continue
      const data = (await res.json()) as string[] | Manifest
      const images = Array.isArray(data) ? data : data.images
      if (images?.length) {
        const base = manifestUrl.replace(/\/manifest\.json$/, "")
        return normalizeImages(base, images)
      }
    } catch {
      // ignore and fall through
    }
  }

  return []
}
