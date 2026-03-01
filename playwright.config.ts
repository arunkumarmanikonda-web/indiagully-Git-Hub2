// India Gully — Playwright Configuration
// I8 MEDIUM: Regression suite covering auth, NDA gate, forms, TOTP, mandate pages

import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,        // serial — single Worker instance
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'playwright-report' }]],
  use: {
    baseURL:         process.env.BASE_URL || 'http://localhost:3000',
    trace:           'on-first-retry',
    screenshot:      'only-on-failure',
    actionTimeout:   10_000,
    navigationTimeout: 15_000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  // Start the dev server automatically when running locally
  // webServer: {
  //   command: 'npm run dev:sandbox',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: true,
  //   timeout: 30_000,
  // },
})
