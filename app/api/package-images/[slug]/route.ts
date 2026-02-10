import { NextResponse } from "next/server"
import path from "path"
import { promises as fs } from "fs"

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".svg", ".gif"])

const isImageFile = (fileName: string) => {
  const ext = path.extname(fileName).toLowerCase()
  return IMAGE_EXTENSIONS.has(ext)
}

const readImageDir = async (dirPath: string, baseUrl: string) => {
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true })
    return entries
      .filter((entry) => entry.isFile() && isImageFile(entry.name))
      .map((entry) => `${baseUrl}/${entry.name}`)
      .sort()
  } catch {
    return []
  }
}

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const { slug } = params
  const publicRoot = path.join(process.cwd(), "public")

  const candidates = [
    { dir: path.join(publicRoot, "images", "packages", slug), base: `/images/packages/${slug}` },
    { dir: path.join(publicRoot, "packages", slug), base: `/packages/${slug}` },
    { dir: path.join(publicRoot, "images", slug), base: `/images/${slug}` },
  ]

  const lists = await Promise.all(candidates.map((candidate) => readImageDir(candidate.dir, candidate.base)))
  const images = Array.from(new Set(lists.flat()))

  return NextResponse.json(images)
}
