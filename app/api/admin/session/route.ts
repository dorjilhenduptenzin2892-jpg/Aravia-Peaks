import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { ADMIN_SESSION_COOKIE, isValidSession } from "@/lib/admin-auth"

export async function GET() {
  const token = cookies().get(ADMIN_SESSION_COOKIE)?.value ?? null
  const authenticated = await isValidSession(token)
  return NextResponse.json({ authenticated })
}
