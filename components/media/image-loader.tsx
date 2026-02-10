"use client"

import Image, { type ImageProps } from "next/image"
import { useEffect, useMemo, useState } from "react"

const DEFAULT_BLUR =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjYwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iZyIgeDE9IjAiIHgyPSIxIiB5MT0iMCIgeTI9IjEiPjxzdG9wIHN0b3AtY29sb3I9IiMwZjJhNDQiIG9mZnNldD0iMCIvPjxzdG9wIHN0b3AtY29sb3I9IiNmN2Y5ZmMiIG9mZnNldD0iMSIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iNjAiIGZpbGw9InVybCgjZykiLz48L3N2Zz4="

type ImageLoaderProps = Omit<ImageProps, "src"> & {
  src: string
  fallbackSrc?: string
  fallbackSrcs?: string[]
  blurDataURL?: string
}

export function ImageLoader({
  src,
  fallbackSrc = "/images/package-bg.webp",
  fallbackSrcs = [],
  blurDataURL = DEFAULT_BLUR,
  alt,
  unoptimized,
  ...props
}: ImageLoaderProps) {
  const extensionCandidates = useMemo(() => {
    const pathVariants = new Set<string>()
    const normalized = src.startsWith("/") ? src : `/${src}`

    pathVariants.add(normalized)
    if (normalized.startsWith("/images/")) {
      pathVariants.add(normalized.replace(/^\/images/, ""))
    } else {
      pathVariants.add(`/images${normalized}`)
    }

    const extMatch = src.match(/\.(webp|jpg|jpeg|png|avif)$/i)
    if (!extMatch) return [...pathVariants, ...fallbackSrcs, fallbackSrc]

    const basePaths = Array.from(pathVariants).map((variant) => variant.replace(/\.(webp|jpg|jpeg|png|avif)$/i, ""))
    const extensions = ["webp", "jpg", "jpeg", "png", "avif"]
    return [
      ...basePaths.flatMap((base) => extensions.map((ext) => `${base}.${ext}`)),
      ...fallbackSrcs,
      fallbackSrc,
    ]
  }, [src, fallbackSrcs, fallbackSrc])

  const [imgSrc, setImgSrc] = useState(extensionCandidates[0])
  const [attemptIndex, setAttemptIndex] = useState(0)

  useEffect(() => {
    setAttemptIndex(0)
    setImgSrc(extensionCandidates[0])
  }, [extensionCandidates])

  const finalSrc = useMemo(() => (imgSrc?.trim() ? imgSrc : fallbackSrc), [imgSrc, fallbackSrc])

  return (
    <Image
      {...props}
      src={finalSrc}
      alt={alt}
      unoptimized={unoptimized ?? false}
      placeholder="blur"
      blurDataURL={blurDataURL}
      onError={() => {
        const nextIndex = attemptIndex + 1
        if (nextIndex < extensionCandidates.length) {
          setAttemptIndex(nextIndex)
          setImgSrc(extensionCandidates[nextIndex])
        } else {
          setImgSrc(fallbackSrc)
        }
      }}
    />
  )
}
