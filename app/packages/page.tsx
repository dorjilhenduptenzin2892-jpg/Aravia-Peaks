import { Suspense } from "react"
import PackagesPageClient from "./packages-page-client"

export default function PackagesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background">
          <div className="container px-4 md:px-6 py-16 md:py-24">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-muted-foreground">Loading packages...</p>
            </div>
          </div>
        </div>
      }
    >
      <PackagesPageClient />
    </Suspense>
  )
}
