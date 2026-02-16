import Image from "next/image"
import { useEffect, useMemo, useState } from "react"

export default function SmartImage({
  src,
  alt,
  className,
  fallback = "/images/package-bg.webp",
  loading = "lazy",
  ...props
}) {
  const candidatePaths = useMemo(() => {
    if (!src) return [fallback]
    const normalized = src.startsWith("/") ? src : `/${src}`
    const variants = new Set([normalized])

    if (normalized.startsWith("/images/")) {
      variants.add(normalized.replace(/^\/images/, ""))
    } else {
      variants.add(`/images${normalized}`)
    }

    variants.add(fallback)
    return Array.from(variants)
  }, [src, fallback])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentSrc, setCurrentSrc] = useState(candidatePaths[0])
  const shouldFill = props.fill ?? (!props.width && !props.height)

  useEffect(() => {
    setCurrentIndex(0)
    setCurrentSrc(candidatePaths[0])
  }, [candidatePaths])

  return (
    <Image
      src={currentSrc}
      alt={alt}
      loading={loading}
      className={className}
      fill={shouldFill}
      sizes={props.sizes ?? (shouldFill ? "100vw" : undefined)}
      onError={() => {
        const nextIndex = currentIndex + 1
        if (nextIndex < candidatePaths.length) {
          setCurrentIndex(nextIndex)
          setCurrentSrc(candidatePaths[nextIndex])
        }
      }}
      {...props}
    />
  )
}
