"use client"

import Image, { type ImageProps } from "next/image"
import { useEffect, useMemo, useState } from "react"
import { resolveImagePath } from "@/src/utils/imageResolver"

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
  quality = 75,
  unoptimized,
  ...props
}: ImageLoaderProps) {
  const preferredFallback = useMemo(
    () => (fallbackSrcs.length ? fallbackSrcs[0] : fallbackSrc),
    [fallbackSrcs, fallbackSrc],
  )

  const [imgSrc, setImgSrc] = useState(preferredFallback)

  useEffect(() => {
    let isActive = true

    resolveImagePath(src, preferredFallback).then((resolved) => {
      if (isActive) {
        setImgSrc(resolved)
      }
    })

    return () => {
      isActive = false
    }
  }, [src, preferredFallback])

  const finalSrc = useMemo(() => (imgSrc?.trim() ? imgSrc : fallbackSrc), [imgSrc, fallbackSrc])

  return (
    <Image
      {...props}
      src={finalSrc}
      alt={alt}
      quality={quality}
      unoptimized={unoptimized ?? false}
      placeholder="blur"
      blurDataURL={blurDataURL}
      onError={() => setImgSrc(fallbackSrc)}
    />
  )
}
