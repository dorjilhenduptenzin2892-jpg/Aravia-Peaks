import { defineConfig } from "@playwright/test"

process.env.BASELINE_BROWSER_MAPPING_IGNORE_OLD_DATA = "true"
process.env.BROWSERSLIST_IGNORE_OLD_DATA = "true"

export default defineConfig({
  testDir: "./tests",
  timeout: 60_000,
  webServer: {
    command: "pnpm dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: {
      BASELINE_BROWSER_MAPPING_IGNORE_OLD_DATA: "true",
      BROWSERSLIST_IGNORE_OLD_DATA: "true",
    },
  },
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3000",
    trace: "retain-on-failure",
  },
})
