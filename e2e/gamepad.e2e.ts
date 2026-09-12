/**
 * Gamepad wiring tests.
 *
 * gamecontroller.js is replaced by a counting stub so we can observe how many
 * times the app registers its `connect` handler. Every registration means the
 * `useGameController` effect re-ran, which also tears down and recreates the
 * 150ms analog-stick polling intervals — if that happens faster than 150ms the
 * sticks never report anything.
 */

import { test, expect } from '@playwright/test';

test.setTimeout(15000);

/** Stands in for the vendored gamecontroller.js UMD bundle. */
const GAME_CONTROL_STUB = `
  (function () {
    window.__onConnectRegistrations = 0;
    window.gameControl = {
      on: function (event) {
        if (event === 'connect') window.__onConnectRegistrations++;
        return this;
      },
      off: function () {
        return this;
      },
      getGamepads: function () {
        return {};
      },
    };
  })();
`;

const registrations = (page: import('@playwright/test').Page) =>
  page.evaluate(() => (window as any).__onConnectRegistrations as number);

test.describe('Gamepad wiring', () => {
  test('does not re-register controller listeners on every render', async ({ page }) => {
    await page.route('**/vendor/gamecontroller.min.js', route =>
      route.fulfill({
        contentType: 'application/javascript',
        body: GAME_CONTROL_STUB,
      })
    );

    await page.goto('/');
    await expect(page.locator('.shudan-goban')).toBeVisible();

    // Sanity check: the stub really is what the app picked up.
    const baseline = await registrations(page);
    expect(baseline).toBeGreaterThan(0);

    // Each move re-renders every `useGameTree()` consumer, which includes the
    // provider that owns the gamepad hook.
    const moves = [
      [3, 3],
      [15, 3],
      [3, 15],
      [15, 15],
      [9, 9],
      [2, 9],
    ];
    for (const [x, y] of moves) {
      await page.locator(`.shudan-vertex[data-x="${x}"][data-y="${y}"]`).click();
    }
    await expect(page.locator('.shudan-vertex[data-x="2"][data-y="9"]')).toHaveClass(
      /shudan-sign_-1/
    );

    // No controller connected or toggled, so nothing should have re-registered.
    expect(await registrations(page)).toBe(baseline);
  });
});
