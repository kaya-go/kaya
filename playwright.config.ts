import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for Kaya web app E2E tests.
 *
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './e2e',
  testMatch: '**/*.e2e.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  // Cap local concurrency: each worker is a real Chrome process, which on
  // macOS still shows a Dock entry even in "headless" mode (Playwright
  // limitation with `channel: 'chrome'`). 2 keeps the runs parallel-ish
  // without taking over the screen.
  workers: process.env.CI ? 1 : 2,
  reporter: process.env.CI ? [['github'], ['html']] : [['list'], ['html', { open: 'never' }]],

  use: {
    baseURL: 'http://localhost:3000',
    headless: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Locally, use the system-installed Chrome to skip Playwright's
        // chromium download (Microsoft CDN occasionally hangs on macOS).
        // The `--headless=old` flag forces the legacy headless mode which
        // actually stays out of the Dock, unlike `--headless=new`.
        // In CI we rely on `playwright install chromium --with-deps`.
        ...(process.env.CI
          ? {}
          : {
              channel: 'chrome',
              launchOptions: { args: ['--headless=old'] },
            }),
      },
    },
  ],

  /* Run local dev server before tests */
  webServer: {
    command: 'bun run dev:web',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 60000,
    stdout: 'pipe',
    stderr: 'pipe',
  },
});
