import { NextResponse } from "next/server"
import { put } from "@vercel/blob"
import { cookies } from "next/headers"
import { ADMIN_SESSION_COOKIE, isValidSession } from "@/lib/admin-auth"

export async function POST(request: Request) {
  const token = cookies().get(ADMIN_SESSION_COOKIE)?.value ?? null
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
}
