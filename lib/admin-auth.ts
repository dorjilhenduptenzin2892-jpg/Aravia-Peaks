import type { NextRequest } from "next/server"

export const ADMIN_SESSION_COOKIE = "admin_session"
const ADMIN_USER = "admin"
const ADMIN_PASS = "Ghost006*"

export const getAdminCredentials = () => {
  return {
    username: ADMIN_USER,
    password: ADMIN_PASS,
  }
}

const hashValue = async (value: string) => {
  if (typeof crypto !== "undefined" && crypto.subtle) {
    const data = new TextEncoder().encode(value)
    const digest = await crypto.subtle.digest("SHA-256", data)
    return Array.from(new Uint8Array(digest))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("")
  }

  const { createHash } = await import("node:crypto")
  return createHash("sha256").update(value).digest("hex")
}

export const createSessionToken = async () => {
  const { username, password } = getAdminCredentials()
  return hashValue(`${username}:${password}`)
}

export const isValidSession = async (token?: string | null) => {
  if (!token) return false
  const expected = await createSessionToken()
  return token === expected
}

export const getSessionFromRequest = (request: NextRequest) => {
  return request.cookies.get(ADMIN_SESSION_COOKIE)?.value ?? null
}
