import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { ADMIN_SESSION_COOKIE, createSessionToken, getAdminCredentials } from "@/lib/admin-auth"

export async function POST(request: Request) {
  const body = (await request.json()) as { username?: string; password?: string }
  const { username, password } = getAdminCredentials()

  if (body.username !== username || body.password !== password) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }

  const token = await createSessionToken()
  cookies().set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  })

  return NextResponse.json({ success: true })
}
