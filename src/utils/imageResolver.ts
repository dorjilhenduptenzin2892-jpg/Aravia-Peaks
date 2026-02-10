const DEFAULT_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".svg", ".gif"]
export const DEFAULT_IMAGE_FALLBACK = "/images/placeholder.jpg"

// Cache resolved paths to avoid repeated existence checks.
const cache = new Map<string, string>()

const normalizeInput = (input: string) => (input.startsWith("/") ? input : `/${input}`)

const hasExtension = (value: string) => /\.[a-z0-9]+$/i.test(value)

// Build a prioritized list of candidate paths across /public and /public/images.
const buildCandidates = (input: string) => {
  const normalized = normalizeInput(input)
  const raw = normalized.replace(/^\//, "")
  const base = raw.replace(/\.(jpg|jpeg|png|webp|svg|gif)$/i, "")

  const candidates: string[] = []

  if (normalized.startsWith("/images/")) {
    if (hasExtension(normalized)) {
      candidates.push(normalized)
    } else {
      candidates.push(...DEFAULT_EXTENSIONS.map((ext) => `/images/${base}${ext}`))
    }
    return candidates
  }

  if (hasExtension(normalized)) {
    candidates.push(`/${raw}`)
    candidates.push(`/images/${raw}`)
    return candidates
  }

  DEFAULT_EXTENSIONS.forEach((ext) => {
    candidates.push(`/${base}${ext}`)
    candidates.push(`/images/${base}${ext}`)
  })

  return candidates
}

// Check if a candidate exists in /public (server via fs, client via HEAD).
const existsOnPublic = async (candidate: string) => {
  if (typeof window === "undefined") {
    try {
      const fs = await import("fs/promises")
      const path = await import("path")
      const resolved = path.join(process.cwd(), "public", candidate.replace(/^\//, ""))
      await fs.access(resolved)
      return true
    } catch {
      return false
    }
  }

  try {
    const res = await fetch(candidate, { method: "HEAD", cache: "no-store" })
    return res.ok
  } catch {
    return false
  }
}

export const resolveImagePath = async (
  input?: string | null,
  fallback: string = DEFAULT_IMAGE_FALLBACK,
): Promise<string> => {
  if (!input) return fallback
  if (input.startsWith("http")) return input

  const cached = cache.get(input)
  if (cached) return cached

  const candidates = buildCandidates(input)
  for (const candidate of candidates) {
    if (await existsOnPublic(candidate)) {
      cache.set(input, candidate)
      return candidate
    }
  }

  cache.set(input, fallback)
  return fallback
}

export const resolveImageList = async (
  list: string[],
  fallback: string = DEFAULT_IMAGE_FALLBACK,
): Promise<string[]> => {
  const resolved = await Promise.all(list.map((item) => resolveImagePath(item, fallback)))
  return Array.from(new Set(resolved.filter(Boolean)))
}
