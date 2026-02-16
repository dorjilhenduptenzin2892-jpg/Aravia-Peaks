const _legacyServer = String.raw`
import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"

type InquirySearchParams = {
  [key: string]: string | string[] | undefined
}

export const metadata: Metadata = {
  title: "Request a Quote | Bhutan Aravia Peaks",
  description:
    "Tell us about your Bhutan trip. We will craft a tailored itinerary and get back to you within 24 hours.",
}

const getStringValue = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] ?? "" : value ?? ""

const mapPackageType = (category: string) => {
  if (category === "Festival Tour") return "festival"
  if (category === "Cultural Tour") return "cultural"
  if (category === "Trekking") return "trekking"
  if (category === "Luxury") return "luxury"
  return ""
}

const mapDuration = (durationLabel: string) => {
  if (durationLabel.includes("13") || durationLabel.includes("15")) return "13-15"
  if (durationLabel.includes("10") || durationLabel.includes("11") || durationLabel.includes("12")) return "9-12"
  if (durationLabel.includes("7") || durationLabel.includes("8")) return "6-8"
  if (durationLabel.includes("5") || durationLabel.includes("4") || durationLabel.includes("3")) return "3-5"
  return ""
}

export default async function InquiryPage({
  searchParams,
}: {
  searchParams?: Promise<InquirySearchParams>
}) {
  const params = (await searchParams) ?? {}
  const status = getStringValue(params.status)
  const errorMessage = getStringValue(params.errorMessage)
  const errorFields = new Set(getStringValue(params.errorFields).split(",").filter(Boolean))

  const packageName = getStringValue(params.name)
  const packageCategory = getStringValue(params.category)
  const packageDuration = getStringValue(params.duration)

  const prefillPackageType = mapPackageType(packageCategory)
  const prefillDuration = mapDuration(packageDuration)
  // legacy prefillMessage removed

  const values = {
    fullName: getStringValue(params.fullName),
    email: getStringValue(params.email),
    phone: getStringValue(params.phone),
    country: getStringValue(params.country),
    packageType: getStringValue(params.packageType) || prefillPackageType,
    travelMonth: getStringValue(params.travelMonth),
    groupSize: getStringValue(params.groupSize),
    duration: getStringValue(params.durationValue) || prefillDuration,
    message: getStringValue(params.message) || prefillMessage,
  }

  return (
    <div>
      <Header />

      <main className="min-h-screen bg-gradient-to-b from-background to-muted/40 pt-24 pb-16">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/30 px-4 py-2 text-base" variant="outline">
              🏔️ Plan your journey
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              Request a quote for your <span className="text-primary">Bhutan adventure</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Tell us your travel goals and we will craft a tailored itinerary within 24 hours.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <Card className="card-premium glass-card border border-border/60 shadow-xl">
                  <CardHeader className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-b border-border/60">
                    <CardTitle className="text-2xl text-primary">Inquiry form</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Share your dates, interests, and preferences. We will handle the details.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-8">
                    {status === "error" && (
                      <div
                        role="alert"
                        aria-live="polite"
                        className="mb-6 rounded-lg border border-red-300 bg-red-50 p-4 text-red-800"
                      >
                        <p className="font-semibold">We need a little more detail before we can send your inquiry.</p>
                        <p className="text-sm mt-1">
                          {errorMessage || "Please review the highlighted fields below and try again."}
                        </p>
                      </div>
                    )}

                    <form action="/api/inquiry" method="post" className="space-y-8" noValidate>
                      <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-primary border-b pb-2">Personal information</h3>
                        <div className="grid gap-6 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="fullName">Full name *</Label>
                            <Input
                              id="fullName"
                              name="fullName"
                              placeholder="Enter your full name"
                              defaultValue={values.fullName}
                              required
                              aria-invalid={errorFields.has("fullName")}
                              aria-describedby={errorFields.has("fullName") ? "fullName-error" : undefined}
                              className="border border-border/60 focus:border-primary"
                            />
                            {errorFields.has("fullName") && (
                              <p id="fullName-error" className="text-sm text-red-600" role="alert">
                                Please enter your full name.
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email address *</Label>
                            <Input
                              id="email"
                              type="email"
                              name="email"
                              placeholder="you@example.com"
                              defaultValue={values.email}
                              required
                              aria-invalid={errorFields.has("email")}
                              aria-describedby={errorFields.has("email") ? "email-error" : undefined}
                              className="border border-border/60 focus:border-primary"
                            />
                            {errorFields.has("email") && (
                              <p id="email-error" className="text-sm text-red-600" role="alert">
                                Please enter a valid email address.
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone number</Label>
                            <Input
                              id="phone"
                              type="tel"
                              name="phone"
                              placeholder="Optional"
                              defaultValue={values.phone}
                              className="border border-border/60 focus:border-primary"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="country">Country of residence *</Label>
                            <Input
                              id="country"
                              name="country"
                              placeholder="Country"
                              defaultValue={values.country}
                              required
                              aria-invalid={errorFields.has("country")}
                              aria-describedby={errorFields.has("country") ? "country-error" : undefined}
                              className="border border-border/60 focus:border-primary"
                            />
                            {errorFields.has("country") && (
                              <p id="country-error" className="text-sm text-red-600" role="alert">
                                Please add your country.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-primary border-b pb-2">Trip details</h3>
                        <div className="grid gap-6 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="packageType">Package type *</Label>
                            <select
                              id="packageType"
                              name="packageType"
                              defaultValue={values.packageType}
                              required
                              aria-invalid={errorFields.has("packageType")}
                              aria-describedby={errorFields.has("packageType") ? "packageType-error" : undefined}
                              className="flex h-10 w-full rounded-md border border-border/60 bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                            >
                              <option value="" disabled>
                                Select a package type
                              </option>
                              <option value="cultural">Cultural tour</option>
                              <option value="festival">Festival tour</option>
                              <option value="trekking">Trekking</option>
                              <option value="luxury">Luxury</option>
                              <option value="custom">Custom</option>
                            </select>
                            {errorFields.has("packageType") && (
                              <p id="packageType-error" className="text-sm text-red-600" role="alert">
                                Please select a package type.
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="travelMonth">Travel month *</Label>
                            <select
                              id="travelMonth"
                              name="travelMonth"
                              defaultValue={values.travelMonth}
                              required
                              aria-invalid={errorFields.has("travelMonth")}
                              aria-describedby={errorFields.has("travelMonth") ? "travelMonth-error" : undefined}
                              className="flex h-10 w-full rounded-md border border-border/60 bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                            >
                              <option value="" disabled>
                                Select a month
                              </option>
                              <option value="jan-2026">January 2026</option>
                              <option value="feb-2026">February 2026</option>
                              <option value="mar-2026">March 2026</option>
                              <option value="apr-2026">April 2026</option>
                              <option value="may-2026">May 2026</option>
                              <option value="jun-2026">June 2026</option>
                              <option value="jul-2026">July 2026</option>
                              <option value="aug-2026">August 2026</option>
                              <option value="sep-2026">September 2026</option>
                              <option value="oct-2026">October 2026</option>
                              <option value="nov-2026">November 2026</option>
                              <option value="dec-2026">December 2026</option>
                            </select>
                            {errorFields.has("travelMonth") && (
                              <p id="travelMonth-error" className="text-sm text-red-600" role="alert">
                                Please select a travel month.
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="groupSize">Group size *</Label>
                            <select
                              id="groupSize"
                              name="groupSize"
                              defaultValue={values.groupSize}
                              required
                              aria-invalid={errorFields.has("groupSize")}
                              aria-describedby={errorFields.has("groupSize") ? "groupSize-error" : undefined}
                              className="flex h-10 w-full rounded-md border border-border/60 bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                            >
                              <option value="" disabled>
                                Select group size
                              </option>
                              <option value="1">1 person</option>
                              <option value="2">2 people</option>
                              <option value="3-4">3-4 people</option>
                              <option value="5-8">5-8 people</option>
                              <option value="9+">9+ people</option>
                            </select>
                            {errorFields.has("groupSize") && (
                              <p id="groupSize-error" className="text-sm text-red-600" role="alert">
                                Please select your group size.
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="durationValue">Trip duration *</Label>
                            <select
                              id="durationValue"
                              name="duration"
                              defaultValue={values.duration}
                              required
                              aria-invalid={errorFields.has("duration")}
                              aria-describedby={errorFields.has("duration") ? "duration-error" : undefined}
                              className="flex h-10 w-full rounded-md border border-border/60 bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                            >
                              <option value="" disabled>
                                Select duration
                              </option>
                              <option value="3-5">3-5 days</option>
                              <option value="6-8">6-8 days</option>
                              <option value="9-12">9-12 days</option>
                              <option value="13-15">13-15 days</option>
                              <option value="15+">15+ days</option>
                            </select>
                            {errorFields.has("duration") && (
                              <p id="duration-error" className="text-sm text-red-600" role="alert">
                                Please select your trip duration.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-primary border-b pb-2">Additional information</h3>
                        <div className="space-y-2">
                          <Label htmlFor="message">Trip notes</Label>
                          <Textarea
                            id="message"
                            name="message"
                            placeholder="Tell us about your interests, pace, and must-sees..."
                            defaultValue={values.message}
                            className="min-h-[120px] border border-border/60 focus:border-primary"
                          />
                        </div>
                      </div>

                      <button type="submit" className="btn-premium hover-glow w-full h-14 text-base font-semibold">
                        <span className="inline-flex items-center gap-2">
                          Send inquiry <span className="transition-transform duration-300" aria-hidden="true">→</span>
                        </span>
                      </button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="card-premium glass-card border border-border/60 shadow-lg bg-gradient-to-br from-primary/5 to-accent/5">
                  <CardHeader>
                    <CardTitle className="flex gap-2">
                      <span>📞</span> Contact details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <p className="font-semibold text-sm text-muted-foreground">Phone</p>
                      <p className="text-lg font-bold">+975 17565604</p>
                    </div>
                    <div className="space-y-2">
                      <p className="font-semibold text-sm text-muted-foreground">Email</p>
                      <p className="text-lg font-bold">bhutanaraviapeaks@gmail.com</p>
                    </div>
                    <div className="space-y-2">
                      <p className="font-semibold text-sm text-muted-foreground">Office</p>
                      <p className="text-lg font-bold">Thimphu, Bhutan</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="card-premium glass-card border border-border/60 shadow-lg">
                  <CardHeader>
                    <CardTitle>What happens next?</CardTitle>
                    <CardDescription>Expect a response within 24 hours.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-muted-foreground">
                    <p>We review your request, match you with a local expert, and craft a personalized itinerary.</p>
                    <p>You can reply directly to our email to refine or add details at any time.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
-
-export default function InquiryPage() {
-  return (
-    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>}>
-      <InquiryForm />
-    </Suspense>
-  )
-}
-
-*/
+import type { Metadata } from "next"
+import { Header } from "@/components/header"
+import { Footer } from "@/components/footer"
+import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
+import { Input } from "@/components/ui/input"
+import { Label } from "@/components/ui/label"
+import { Badge } from "@/components/ui/badge"
+import { Textarea } from "@/components/ui/textarea"
+
+type InquirySearchParams = {
+  [key: string]: string | string[] | undefined
+}
+
+export const metadata: Metadata = {
+  title: "Request a Quote | Bhutan Aravia Peaks",
+  description:
+    "Tell us about your Bhutan trip. We will craft a tailored itinerary and get back to you within 24 hours.",
+}
+
+const getStringValue = (value: string | string[] | undefined) =>
+  Array.isArray(value) ? value[0] ?? "" : value ?? ""
+
+const mapPackageType = (category: string) => {
+  if (category === "Festival Tour") return "festival"
+  if (category === "Cultural Tour") return "cultural"
+  if (category === "Trekking") return "trekking"
+  if (category === "Luxury") return "luxury"
+  return ""
+}
+
+const mapDuration = (durationLabel: string) => {
+  if (durationLabel.includes("13") || durationLabel.includes("15")) return "13-15"
+  if (durationLabel.includes("10") || durationLabel.includes("11") || durationLabel.includes("12")) return "9-12"
+  if (durationLabel.includes("7") || durationLabel.includes("8")) return "6-8"
+  if (durationLabel.includes("5") || durationLabel.includes("4") || durationLabel.includes("3")) return "3-5"
+  return ""
+}
+
+export default function InquiryPage({ searchParams }: { searchParams?: InquirySearchParams }) {
+  const params = searchParams ?? {}
+  const status = getStringValue(params.status)
+  const errorMessage = getStringValue(params.errorMessage)
+  const errorFields = new Set(getStringValue(params.errorFields).split(",").filter(Boolean))
+
+  const packageName = getStringValue(params.name)
+  const packageCategory = getStringValue(params.category)
+  const packageDuration = getStringValue(params.duration)
+
+  const prefillPackageType = mapPackageType(packageCategory)
+  const prefillDuration = mapDuration(packageDuration)
+  // legacy prefillMessage removed
+
+  const values = {
+    fullName: getStringValue(params.fullName),
+    email: getStringValue(params.email),
+    phone: getStringValue(params.phone),
+    country: getStringValue(params.country),
+    packageType: getStringValue(params.packageType) || prefillPackageType,
+    travelMonth: getStringValue(params.travelMonth),
+    groupSize: getStringValue(params.groupSize),
+    duration: getStringValue(params.durationValue) || prefillDuration,
+    message: getStringValue(params.message) || prefillMessage,
+  }
+
+  return (
+    <div>
+      <Header />
+
+      <main className="min-h-screen bg-gradient-to-b from-background to-muted/40 pt-24 pb-16">
+        <div className="container px-4 mx-auto">
+          <div className="text-center mb-12 max-w-3xl mx-auto">
+            <Badge className="mb-4 bg-primary/10 text-primary border-primary/30 px-4 py-2 text-base" variant="outline">
+              🏔️ Plan your journey
+            </Badge>
+            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
+              Request a quote for your <span className="text-primary">Bhutan adventure</span>
+            </h1>
+            <p className="text-lg text-muted-foreground">
+              Tell us your travel goals and we will craft a tailored itinerary within 24 hours.
+            </p>
+          </div>
+
+          <div className="max-w-6xl mx-auto">
+            <div className="grid gap-8 lg:grid-cols-3">
+              <div className="lg:col-span-2">
+                <Card className="card-premium glass-card border border-border/60 shadow-xl">
+                  <CardHeader className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-b border-border/60">
+                    <CardTitle className="text-2xl text-primary">Inquiry form</CardTitle>
+                    <CardDescription className="text-muted-foreground">
+                      Share your dates, interests, and preferences. We will handle the details.
+                    </CardDescription>
+                  </CardHeader>
+                  <CardContent className="pt-8">
+                    {status === "error" && (
+                      <div
+                        role="alert"
+                        aria-live="polite"
+                        className="mb-6 rounded-lg border border-red-300 bg-red-50 p-4 text-red-800"
+                      >
+                        <p className="font-semibold">We need a little more detail before we can send your inquiry.</p>
+                        <p className="text-sm mt-1">
+                          {errorMessage || "Please review the highlighted fields below and try again."}
+                        </p>
+                      </div>
+                    )}
+
+                    <form action="/api/inquiry" method="post" className="space-y-8" noValidate>
+                      <div className="space-y-6">
+                        <h3 className="text-lg font-semibold text-primary border-b pb-2">Personal information</h3>
+                        <div className="grid gap-6 md:grid-cols-2">
+                          <div className="space-y-2">
+                            <Label htmlFor="fullName">Full name *</Label>
+                            <Input
+                              id="fullName"
+                              name="fullName"
+                              placeholder="Enter your full name"
+                              defaultValue={values.fullName}
+                              required
+                              aria-invalid={errorFields.has("fullName")}
+                              aria-describedby={errorFields.has("fullName") ? "fullName-error" : undefined}
+                              className="border border-border/60 focus:border-primary"
+                            />
+                            {errorFields.has("fullName") && (
+                              <p id="fullName-error" className="text-sm text-red-600" role="alert">
+                                Please enter your full name.
+                              </p>
+                            )}
+                          </div>
+                          <div className="space-y-2">
+                            <Label htmlFor="email">Email address *</Label>
+                            <Input
+                              id="email"
+                              type="email"
+                              name="email"
+                              placeholder="you@example.com"
+                              defaultValue={values.email}
+                              required
+                              aria-invalid={errorFields.has("email")}
+                              aria-describedby={errorFields.has("email") ? "email-error" : undefined}
+                              className="border border-border/60 focus:border-primary"
+                            />
+                            {errorFields.has("email") && (
+                              <p id="email-error" className="text-sm text-red-600" role="alert">
+                                Please enter a valid email address.
+                              </p>
+                            )}
+                          </div>
+                          <div className="space-y-2">
+                            <Label htmlFor="phone">Phone number</Label>
+                            <Input
+                              id="phone"
+                              type="tel"
+                              name="phone"
+                              placeholder="Optional"
+                              defaultValue={values.phone}
+                              className="border border-border/60 focus:border-primary"
+                            />
+                          </div>
+                          <div className="space-y-2">
+                            <Label htmlFor="country">Country of residence *</Label>
+                            <Input
+                              id="country"
+                              name="country"
+                              placeholder="Country"
+                              defaultValue={values.country}
+                              required
+                              aria-invalid={errorFields.has("country")}
+                              aria-describedby={errorFields.has("country") ? "country-error" : undefined}
+                              className="border border-border/60 focus:border-primary"
+                            />
+                            {errorFields.has("country") && (
+                              <p id="country-error" className="text-sm text-red-600" role="alert">
+                                Please add your country.
+                              </p>
+                            )}
+                          </div>
+                        </div>
+                      </div>
+
+                      <div className="space-y-6">
+                        <h3 className="text-lg font-semibold text-primary border-b pb-2">Trip details</h3>
+                        <div className="grid gap-6 md:grid-cols-2">
+                          <div className="space-y-2">
+                            <Label htmlFor="packageType">Package type *</Label>
+                            <select
+                              id="packageType"
+                              name="packageType"
+                              defaultValue={values.packageType}
+                              required
+                              aria-invalid={errorFields.has("packageType")}
+                              aria-describedby={errorFields.has("packageType") ? "packageType-error" : undefined}
+                              className="flex h-10 w-full rounded-md border border-border/60 bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
+                            >
+                              <option value="" disabled>
+                                Select a package type
+                              </option>
+                              <option value="cultural">Cultural tour</option>
+                              <option value="festival">Festival tour</option>
+                              <option value="trekking">Trekking</option>
+                              <option value="luxury">Luxury</option>
+                              <option value="custom">Custom</option>
+                            </select>
+                            {errorFields.has("packageType") && (
+                              <p id="packageType-error" className="text-sm text-red-600" role="alert">
+                                Please select a package type.
+                              </p>
+                            )}
+                          </div>
+                          <div className="space-y-2">
+                            <Label htmlFor="travelMonth">Travel month *</Label>
+                            <select
+                              id="travelMonth"
+                              name="travelMonth"
+                              defaultValue={values.travelMonth}
+                              required
+                              aria-invalid={errorFields.has("travelMonth")}
+                              aria-describedby={errorFields.has("travelMonth") ? "travelMonth-error" : undefined}
+                              className="flex h-10 w-full rounded-md border border-border/60 bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
+                            >
+                              <option value="" disabled>
+                                Select a month
+                              </option>
+                              <option value="jan-2026">January 2026</option>
+                              <option value="feb-2026">February 2026</option>
+                              <option value="mar-2026">March 2026</option>
+                              <option value="apr-2026">April 2026</option>
+                              <option value="may-2026">May 2026</option>
+                              <option value="jun-2026">June 2026</option>
+                              <option value="jul-2026">July 2026</option>
+                              <option value="aug-2026">August 2026</option>
+                              <option value="sep-2026">September 2026</option>
+                              <option value="oct-2026">October 2026</option>
+                              <option value="nov-2026">November 2026</option>
+                              <option value="dec-2026">December 2026</option>
+                            </select>
+                            {errorFields.has("travelMonth") && (
+                              <p id="travelMonth-error" className="text-sm text-red-600" role="alert">
+                                Please select a travel month.
+                              </p>
+                            )}
+                          </div>
+                          <div className="space-y-2">
+                            <Label htmlFor="groupSize">Group size *</Label>
+                            <select
+                              id="groupSize"
+                              name="groupSize"
+                              defaultValue={values.groupSize}
+                              required
+                              aria-invalid={errorFields.has("groupSize")}
+                              aria-describedby={errorFields.has("groupSize") ? "groupSize-error" : undefined}
+                              className="flex h-10 w-full rounded-md border border-border/60 bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
+                            >
+                              <option value="" disabled>
+                                Select group size
+                              </option>
+                              <option value="1">1 person</option>
+                              <option value="2">2 people</option>
+                              <option value="3-4">3-4 people</option>
+                              <option value="5-8">5-8 people</option>
+                              <option value="9+">9+ people</option>
+                            </select>
+                            {errorFields.has("groupSize") && (
+                              <p id="groupSize-error" className="text-sm text-red-600" role="alert">
+                                Please select your group size.
+                              </p>
+                            )}
+                          </div>
+                          <div className="space-y-2">
+                            <Label htmlFor="durationValue">Trip duration *</Label>
+                            <select
+                              id="durationValue"
+                              name="duration"
+                              defaultValue={values.duration}
+                              required
+                              aria-invalid={errorFields.has("duration")}
+                              aria-describedby={errorFields.has("duration") ? "duration-error" : undefined}
+                              className="flex h-10 w-full rounded-md border border-border/60 bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
+                            >
+                              <option value="" disabled>
+                                Select duration
+                              </option>
+                              <option value="3-5">3-5 days</option>
+                              <option value="6-8">6-8 days</option>
+                              <option value="9-12">9-12 days</option>
+                              <option value="13-15">13-15 days</option>
+                              <option value="15+">15+ days</option>
+                            </select>
+                            {errorFields.has("duration") && (
+                              <p id="duration-error" className="text-sm text-red-600" role="alert">
+                                Please select your trip duration.
+                              </p>
+                            )}
+                          </div>
+                        </div>
+                      </div>
+
+                      <div className="space-y-6">
+                        <h3 className="text-lg font-semibold text-primary border-b pb-2">Additional information</h3>
+                        <div className="space-y-2">
+                          <Label htmlFor="message">Trip notes</Label>
+                          <Textarea
+                            id="message"
+                            name="message"
+                            placeholder="Tell us about your interests, pace, and must-sees..."
+                            defaultValue={values.message}
+                            className="min-h-[120px] border border-border/60 focus:border-primary"
+                          />
+                        </div>
+                      </div>
+
+                      <button type="submit" className="btn-premium hover-glow w-full h-14 text-base font-semibold">
+                        <span className="inline-flex items-center gap-2">
+                          Send inquiry <span className="transition-transform duration-300" aria-hidden="true">→</span>
+                        </span>
+                      </button>
+                    </form>
+                  </CardContent>
+                </Card>
+              </div>
+
+              <div className="space-y-6">
+                <Card className="card-premium glass-card border border-border/60 shadow-lg bg-gradient-to-br from-primary/5 to-accent/5">
+                  <CardHeader>
+                    <CardTitle className="flex gap-2">
+                      <span>📞</span> Contact details
+                    </CardTitle>
+                  </CardHeader>
+                  <CardContent className="space-y-6">
+                    <div className="space-y-2">
+                      <p className="font-semibold text-sm text-muted-foreground">Phone</p>
+                      <p className="text-lg font-bold">+975 17565604</p>
+                    </div>
+                    <div className="space-y-2">
+                      <p className="font-semibold text-sm text-muted-foreground">Email</p>
+                      <p className="text-lg font-bold">bhutanaraviapeaks@gmail.com</p>
+                    </div>
+                    <div className="space-y-2">
+                      <p className="font-semibold text-sm text-muted-foreground">Office</p>
+                      <p className="text-lg font-bold">Thimphu, Bhutan</p>
+                    </div>
+                  </CardContent>
+                </Card>
+                <Card className="card-premium glass-card border border-border/60 shadow-lg">
+                  <CardHeader>
+                    <CardTitle>What happens next?</CardTitle>
+                    <CardDescription>Expect a response within 24 hours.</CardDescription>
+                  </CardHeader>
+                  <CardContent className="space-y-3 text-sm text-muted-foreground">
+                    <p>We review your request, match you with a local expert, and craft a personalized itinerary.</p>
+                    <p>You can reply directly to our email to refine or add details at any time.</p>
+                  </CardContent>
+                </Card>
+              </div>
+            </div>
+          </div>
+        </div>
+      </main>
+
+      <Footer />
+    </div>
+  )
+}
*** End Patch
`

import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"

type InquirySearchParams = {
  [key: string]: string | string[] | undefined
}

export const metadata: Metadata = {
  title: "Request a Quote | Bhutan Aravia Peaks",
  description:
    "Tell us about your Bhutan trip. We will craft a tailored itinerary and get back to you within 24 hours.",
}

const getStringValue = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] ?? "" : value ?? ""

const mapPackageType = (category: string) => {
  if (category === "Festival Tour") return "festival"
  if (category === "Cultural Tour") return "cultural"
  if (category === "Trekking") return "trekking"
  if (category === "Luxury") return "luxury"
  return ""
}

const mapDuration = (durationLabel: string) => {
  if (durationLabel.includes("13") || durationLabel.includes("15")) return "13-15"
  if (durationLabel.includes("10") || durationLabel.includes("11") || durationLabel.includes("12")) return "9-12"
  if (durationLabel.includes("7") || durationLabel.includes("8")) return "6-8"
  if (durationLabel.includes("5") || durationLabel.includes("4") || durationLabel.includes("3")) return "3-5"
  return ""
}

export default async function InquiryPage({
  searchParams,
}: {
  searchParams?: Promise<InquirySearchParams>
}) {
  const params = (await searchParams) ?? {}
  const status = getStringValue(params.status)
  const errorMessage = getStringValue(params.errorMessage)
  const errorFields = new Set(getStringValue(params.errorFields).split(",").filter(Boolean))

  const packageName = getStringValue(params.name)
  const packageCategory = getStringValue(params.category)
  const packageDuration = getStringValue(params.duration)

  const prefillPackageType = mapPackageType(packageCategory)
  const prefillDuration = mapDuration(packageDuration)
  const prefillMessage = packageName ? `I am interested in the ${packageName} package.` : ""

  const values = {
    fullName: getStringValue(params.fullName),
    email: getStringValue(params.email),
    phone: getStringValue(params.phone),
    country: getStringValue(params.country),
    packageType: getStringValue(params.packageType) || prefillPackageType,
    travelMonth: getStringValue(params.travelMonth),
    groupSize: getStringValue(params.groupSize),
    duration: getStringValue(params.durationValue) || prefillDuration,
    message: getStringValue(params.message) || prefillMessage,
  }

  return (
    <div>
      <Header />

      <main className="min-h-screen bg-gradient-to-b from-background to-muted/40 pt-24 pb-16">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/30 px-4 py-2 text-base" variant="outline">
              🏔️ Plan your journey
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              Request a quote for your <span className="text-primary">Bhutan adventure</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Tell us your travel goals and we will craft a tailored itinerary within 24 hours.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <Card className="card-premium glass-card border border-border/60 shadow-xl">
                  <CardHeader className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-b border-border/60">
                    <CardTitle className="text-2xl text-primary">Inquiry form</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Share your dates, interests, and preferences. We will handle the details.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-8">
                    {status === "error" && (
                      <div
                        role="alert"
                        aria-live="polite"
                        className="mb-6 rounded-lg border border-red-300 bg-red-50 p-4 text-red-800"
                      >
                        <p className="font-semibold">We need a little more detail before we can send your inquiry.</p>
                        <p className="text-sm mt-1">
                          {errorMessage || "Please review the highlighted fields below and try again."}
                        </p>
                      </div>
                    )}

                    <form action="/api/inquiry" method="post" className="space-y-8" noValidate>
                      <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-primary border-b pb-2">Personal information</h3>
                        <div className="grid gap-6 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="fullName">Full name *</Label>
                            <Input
                              id="fullName"
                              name="fullName"
                              placeholder="Enter your full name"
                              defaultValue={values.fullName}
                              required
                              aria-invalid={errorFields.has("fullName")}
                              aria-describedby={errorFields.has("fullName") ? "fullName-error" : undefined}
                              className="border border-border/60 focus:border-primary"
                            />
                            {errorFields.has("fullName") && (
                              <p id="fullName-error" className="text-sm text-red-600" role="alert">
                                Please enter your full name.
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email address *</Label>
                            <Input
                              id="email"
                              type="email"
                              name="email"
                              placeholder="you@example.com"
                              defaultValue={values.email}
                              required
                              aria-invalid={errorFields.has("email")}
                              aria-describedby={errorFields.has("email") ? "email-error" : undefined}
                              className="border border-border/60 focus:border-primary"
                            />
                            {errorFields.has("email") && (
                              <p id="email-error" className="text-sm text-red-600" role="alert">
                                Please enter a valid email address.
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone number</Label>
                            <Input
                              id="phone"
                              type="tel"
                              name="phone"
                              placeholder="Optional"
                              defaultValue={values.phone}
                              className="border border-border/60 focus:border-primary"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="country">Country of residence *</Label>
                            <Input
                              id="country"
                              name="country"
                              placeholder="Country"
                              defaultValue={values.country}
                              required
                              aria-invalid={errorFields.has("country")}
                              aria-describedby={errorFields.has("country") ? "country-error" : undefined}
                              className="border border-border/60 focus:border-primary"
                            />
                            {errorFields.has("country") && (
                              <p id="country-error" className="text-sm text-red-600" role="alert">
                                Please add your country.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-primary border-b pb-2">Trip details</h3>
                        <div className="grid gap-6 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="packageType">Package type *</Label>
                            <select
                              id="packageType"
                              name="packageType"
                              defaultValue={values.packageType}
                              required
                              aria-invalid={errorFields.has("packageType")}
                              aria-describedby={errorFields.has("packageType") ? "packageType-error" : undefined}
                              className="flex h-10 w-full rounded-md border border-border/60 bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                            >
                              <option value="" disabled>
                                Select a package type
                              </option>
                              <option value="cultural">Cultural tour</option>
                              <option value="festival">Festival tour</option>
                              <option value="trekking">Trekking</option>
                              <option value="luxury">Luxury</option>
                              <option value="custom">Custom</option>
                            </select>
                            {errorFields.has("packageType") && (
                              <p id="packageType-error" className="text-sm text-red-600" role="alert">
                                Please select a package type.
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="travelMonth">Travel month *</Label>
                            <select
                              id="travelMonth"
                              name="travelMonth"
                              defaultValue={values.travelMonth}
                              required
                              aria-invalid={errorFields.has("travelMonth")}
                              aria-describedby={errorFields.has("travelMonth") ? "travelMonth-error" : undefined}
                              className="flex h-10 w-full rounded-md border border-border/60 bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                            >
                              <option value="" disabled>
                                Select a month
                              </option>
                              <option value="jan-2026">January 2026</option>
                              <option value="feb-2026">February 2026</option>
                              <option value="mar-2026">March 2026</option>
                              <option value="apr-2026">April 2026</option>
                              <option value="may-2026">May 2026</option>
                              <option value="jun-2026">June 2026</option>
                              <option value="jul-2026">July 2026</option>
                              <option value="aug-2026">August 2026</option>
                              <option value="sep-2026">September 2026</option>
                              <option value="oct-2026">October 2026</option>
                              <option value="nov-2026">November 2026</option>
                              <option value="dec-2026">December 2026</option>
                            </select>
                            {errorFields.has("travelMonth") && (
                              <p id="travelMonth-error" className="text-sm text-red-600" role="alert">
                                Please select a travel month.
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="groupSize">Group size *</Label>
                            <select
                              id="groupSize"
                              name="groupSize"
                              defaultValue={values.groupSize}
                              required
                              aria-invalid={errorFields.has("groupSize")}
                              aria-describedby={errorFields.has("groupSize") ? "groupSize-error" : undefined}
                              className="flex h-10 w-full rounded-md border border-border/60 bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                            >
                              <option value="" disabled>
                                Select group size
                              </option>
                              <option value="1">1 person</option>
                              <option value="2">2 people</option>
                              <option value="3-4">3-4 people</option>
                              <option value="5-8">5-8 people</option>
                              <option value="9+">9+ people</option>
                            </select>
                            {errorFields.has("groupSize") && (
                              <p id="groupSize-error" className="text-sm text-red-600" role="alert">
                                Please select your group size.
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="durationValue">Trip duration *</Label>
                            <select
                              id="durationValue"
                              name="duration"
                              defaultValue={values.duration}
                              required
                              aria-invalid={errorFields.has("duration")}
                              aria-describedby={errorFields.has("duration") ? "duration-error" : undefined}
                              className="flex h-10 w-full rounded-md border border-border/60 bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                            >
                              <option value="" disabled>
                                Select duration
                              </option>
                              <option value="3-5">3-5 days</option>
                              <option value="6-8">6-8 days</option>
                              <option value="9-12">9-12 days</option>
                              <option value="13-15">13-15 days</option>
                              <option value="15+">15+ days</option>
                            </select>
                            {errorFields.has("duration") && (
                              <p id="duration-error" className="text-sm text-red-600" role="alert">
                                Please select your trip duration.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-primary border-b pb-2">Additional information</h3>
                        <div className="space-y-2">
                          <Label htmlFor="message">Trip notes</Label>
                          <Textarea
                            id="message"
                            name="message"
                            placeholder="Tell us about your interests, pace, and must-sees..."
                            defaultValue={values.message}
                            className="min-h-[120px] border border-border/60 focus:border-primary"
                          />
                        </div>
                      </div>

                      <button type="submit" className="btn-premium hover-glow w-full h-14 text-base font-semibold">
                        <span className="inline-flex items-center gap-2">
                          Send inquiry <span className="transition-transform duration-300" aria-hidden="true">→</span>
                        </span>
                      </button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="card-premium glass-card border border-border/60 shadow-lg bg-gradient-to-br from-primary/5 to-accent/5">
                  <CardHeader>
                    <CardTitle className="flex gap-2">
                      <span>📞</span> Contact details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <p className="font-semibold text-sm text-muted-foreground">Phone</p>
                      <p className="text-lg font-bold">+975 17565604</p>
                    </div>
                    <div className="space-y-2">
                      <p className="font-semibold text-sm text-muted-foreground">Email</p>
                      <p className="text-lg font-bold">bhutanaraviapeaks@gmail.com</p>
                    </div>
                    <div className="space-y-2">
                      <p className="font-semibold text-sm text-muted-foreground">Office</p>
                      <p className="text-lg font-bold">Thimphu, Bhutan</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="card-premium glass-card border border-border/60 shadow-lg">
                  <CardHeader>
                    <CardTitle>What happens next?</CardTitle>
                    <CardDescription>Expect a response within 24 hours.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-muted-foreground">
                    <p>We review your request, match you with a local expert, and craft a personalized itinerary.</p>
                    <p>You can reply directly to our email to refine or add details at any time.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}