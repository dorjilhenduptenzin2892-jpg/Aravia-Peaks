"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { getPackageImages } from "@/src/utils/getPackageImages"

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
  const [selected, setSelected] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    getPackageImages(slug).then((list) => {
      if (!isMounted) return
      const normalized = normalizeList(list)
      const fallback = normalizeList(fallbackImages)
      const merged = normalized.length ? Array.from(new Set([...normalized, ...fallback])) : fallback
      setImages(merged)
    })
    return () => {
      isMounted = false
    }
  }, [slug, fallbackImages])

  if (!images.length) {
    return (
      <div className="rounded-xl border border-border/60 bg-muted/30 p-6 text-sm text-muted-foreground">
        Gallery images will be updated soon.
      </div>
    )
  }

  return (
    <div>
      <div className="grid gap-3 sm:gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
        {images.map((src, index) => (
          <button
            key={`${src}-${index}`}
            type="button"
            onClick={() => setSelected(src)}
            className="group relative overflow-hidden rounded-xl shadow-sm"
          >
            <Image
              src={src}
              alt={`${title} gallery image ${index + 1}`}
              width={640}
              height={420}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setSelected(null)}
        >
          <div className="relative max-w-5xl w-full" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="absolute -top-10 right-0 text-white text-sm"
              onClick={() => setSelected(null)}
            >
              Close
            </button>
            <Image
              src={selected}
              alt={`${title} preview`}
              width={1600}
              height={1000}
              className="w-full h-auto rounded-2xl object-contain"
              priority
            />
          </div>
        </div>
      )}
    </div>
  )
}
