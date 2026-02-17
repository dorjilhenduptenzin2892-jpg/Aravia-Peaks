import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { ADMIN_SESSION_COOKIE, createSessionToken, getAdminCredentials } from "@/lib/admin-auth"

export async function POST(request: Request) {
  const body = (await request.json()) as { username?: string; password?: string }
  const { username, password } = getAdminCredentials()

  const inputUsername = body.username?.trim() ?? ""
  const inputPassword = body.password?.trim() ?? ""

  if (inputUsername !== username || inputPassword !== password) {
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
