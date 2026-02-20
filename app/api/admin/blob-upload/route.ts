import { NextResponse } from "next/server"
import { put } from "@vercel/blob"
import { ADMIN_SESSION_COOKIE, isValidSession } from "@/lib/admin-auth"

export const runtime = "nodejs"

const getCookie = (request: Request, name: string) => {
  const cookieHeader = request.headers.get("cookie")
  if (!cookieHeader) return null
  const cookies = cookieHeader.split(";").map((part) => part.trim())
  const target = cookies.find((item) => item.startsWith(`${name}=`))
  if (!target) return null
  return decodeURIComponent(target.slice(name.length + 1))
}

export async function POST(request: Request) {
  try {
    const token = getCookie(request, ADMIN_SESSION_COOKIE)
    const authenticated = await isValidSession(token)
    if (!authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json({ error: "Missing blob token" }, { status: 500 })
    }

    const formData = await request.formData()
    const file = formData.get("file")
    const packageKey = String(formData.get("packageKey") || "general")

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Invalid file" }, { status: 400 })
    }

    const fileName = `${packageKey}/${Date.now()}-${file.name}`
    const blob = await put(fileName, file, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    })

    return NextResponse.json({ url: blob.url })
  } catch (error) {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
