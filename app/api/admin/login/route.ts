import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { ADMIN_SESSION_COOKIE, createSessionToken, getAdminCredentials } from "@/lib/admin-auth"

export const runtime = "nodejs"

export async function POST(request: Request) {
  try {
    let body: { username?: string; password?: string } = {}
    try {
      body = (await request.json()) as { username?: string; password?: string }
    } catch {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 })
    }
    const { username, password } = getAdminCredentials()

    const inputUsername = body.username?.trim() ?? ""
    const inputPassword = body.password?.trim() ?? ""

    const usernameOk = inputUsername === username || inputUsername.length === 0
    const passwordOk = inputPassword === password

    if (!usernameOk || !passwordOk) {
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
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
