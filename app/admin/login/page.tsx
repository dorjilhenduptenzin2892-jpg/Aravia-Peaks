"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { LockIcon } from "@/components/icons"

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    const checkSession = async () => {
      try {
        const res = await fetch("/api/admin/session")
        if (!mounted) return
        if (res.ok) {
          const data = (await res.json()) as { authenticated: boolean }
          if (data.authenticated) {
            router.replace("/admin/packages")
          }
        }
      } catch {
        // no-op
      }
    }

    checkSession()
    return () => {
      mounted = false
    }
  }, [router])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      if (!res.ok) {
        const data = (await res.json()) as { error?: string }
        throw new Error(data.error || "Invalid credentials")
      }

      router.replace("/admin/packages")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl items-center justify-center">
      <Card className="w-full">
        <CardHeader className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
              <LockIcon className="h-4 w-4" />
            </span>
            Admin Console
          </div>
          <CardTitle className="text-2xl">Sign in to manage images</CardTitle>
          <CardDescription>Upload hero, gallery, and itinerary day photos for each package.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="admin"
                autoComplete="username"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
            </div>
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
            <div className="text-center text-xs text-muted-foreground">
              <Link href="/" className="underline">
                Return to site
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
