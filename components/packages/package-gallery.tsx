"use client"

import { useEffect, useState } from "react"
import { getPackageImages } from "@/src/utils/getPackageImages"
import { GallerySlider } from "@/components/packages/gallery-slider"

const allowedExtensions = ["jpg", "jpeg", "png", "webp", "gif", "svg", "avif"]

const normalizeList = (list: string[]) => {
  const clean = list.filter(Boolean).map((item) => (item.startsWith("/") ? item : `/${item}`))
  return Array.from(
    new Set(
      clean.filter((item) => {
        const ext = item.split("?")[0]?.split(".").pop()?.toLowerCase()
        return !ext || allowedExtensions.includes(ext)
      }),
    ),
  )
}

export function PackageGallery({
  slug,
  title,
  fallbackImages = [],
}: {
  slug: string
  title: string
  fallbackImages?: string[]
}) {
  const [images, setImages] = useState<string[]>(() => normalizeList(fallbackImages))

  useEffect(() => {
    let isMounted = true

    getPackageImages(slug)
      .then((list) => {
        if (!isMounted) return
        const merged = normalizeList([...(list || []), ...fallbackImages])
        setImages(merged)
      })
      .catch(() => {
        if (!isMounted) return
        setImages(normalizeList(fallbackImages))
      })

    return () => {
      isMounted = false
    }
  }, [slug, fallbackImages])

  if (!images.length) {
    return (
      <div className="rounded-2xl border border-border/60 bg-muted/30 p-8 text-center text-muted-foreground">
        No gallery images available.
      </div>
    )
  }

  return <GallerySlider images={images} title={title} />
}
