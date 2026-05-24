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
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [['github'], ['html']] : 'html',

  use: {
    baseURL: 'http://localhost:3000',
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
        // In CI we rely on `playwright install chromium --with-deps`.
        ...(process.env.CI ? {} : { channel: 'chrome' }),
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
