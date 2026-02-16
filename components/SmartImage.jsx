import Image from "next/image"
import { useEffect, useState } from "react"
import { resolveImagePath } from "@/src/utils/imageResolver"

export default function SmartImage({
  src,
  alt,
  className,
  fallback = "/images/package-bg.webp",
  loading = "lazy",
  ...props
}) {
  const [currentSrc, setCurrentSrc] = useState(fallback)
  const shouldFill = props.fill ?? (!props.width && !props.height)

  useEffect(() => {
    let isActive = true

    resolveImagePath(src, fallback).then((resolved) => {
      if (isActive) {
        setCurrentSrc(resolved)
      }
    })

    return () => {
      isActive = false
    }
  }, [src, fallback])

  return (
    <Image
      src={currentSrc}
      alt={alt}
      loading={loading}
      className={className}
      fill={shouldFill}
      sizes={props.sizes ?? (shouldFill ? "100vw" : undefined)}
      onError={() => setCurrentSrc(fallback)}
      {...props}
    />
  )
}
