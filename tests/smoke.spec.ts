import { test, expect } from "@playwright/test"

const routes = [
  "/en",
  "/en/packages",
  "/en/packages/festival",
  "/en/packages/trekking/druk-path-trek",
  "/en/festivals",
  "/en/travel-guide",
  "/en/bhutan/farmhouses-homestays",
  "/en/contact",
  "/en/inquiry",
]

test("smoke: key routes render", async ({ page }) => {
  for (const route of routes) {
    await page.goto(route, { waitUntil: "domcontentloaded" })
    await expect(page).toHaveTitle(/Bhutan/i)
  }
})

test("smoke: inquiry form submits", async ({ page }) => {
  await page.route("**/api/inquiry", async (route) => {
    await route.fulfill({
      status: 303,
      headers: { Location: "/thank-you?ref=TEST123&name=Test" },
      body: "",
    })
  })

  await page.goto("/en/inquiry", { waitUntil: "domcontentloaded" })

  await page.fill("input[name=fullName]", "Test Traveler")
  await page.fill("input[name=email]", "test@example.com")
  await page.fill("input[name=country]", "USA")

  await page.selectOption("select[name=packageType]", "cultural")
  await page.selectOption("select[name=travelMonth]", "jan-2026")
  await page.selectOption("select[name=groupSize]", "2")
  await page.selectOption("select[name=duration]", "6-8")

  await page.click("button[type=submit]")

  await page.waitForURL(/thank-you/)
  await expect(page.getByText(/Thank you/i)).toBeVisible()
})
