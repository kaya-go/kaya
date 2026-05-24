import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for Kaya desktop app E2E tests.
 *
 * Reuses the same test files as the web app, but targets
 * the Tauri development server instead.
 *
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './e2e',
  testMatch: '**/*.e2e.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  // See comment in playwright.config.ts for why we cap to 2 workers locally.
  workers: process.env.CI ? 1 : 2,
  reporter: process.env.CI ? [['github'], ['html']] : [['list'], ['html', { open: 'never' }]],

  use: {
    // Tauri dev server runs on port 1420
    baseURL: 'http://localhost:1420',
    headless: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // See comment in playwright.config.ts for why we use `channel: 'chrome'`
        // and `--headless=old` locally.
        ...(process.env.CI
          ? {}
          : {
              channel: 'chrome',
              launchOptions: { args: ['--headless=old'] },
            }),
      },
    },
  ],

  /* Run Tauri dev server before tests */
  webServer: {
    command: 'bun run dev:desktop',
    url: 'http://localhost:1420',
    reuseExistingServer: !process.env.CI,
    // Tauri takes longer to start than the web app
    timeout: 120000,
    stdout: 'pipe',
    stderr: 'pipe',
  },
});
