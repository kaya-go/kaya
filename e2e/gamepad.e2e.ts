/**
 * Gamepad wiring tests.
 *
 * gamecontroller.js is replaced by a stub so we can observe two things the real
 * bundle hides:
 *
 * 1. How many times the app registers a `connect` handler. `gameControl.on` is
 *    single-slot, so every extra registration silently unregisters someone.
 *    A registration also means the `useGameController` effect re-ran, which
 *    tears down and recreates the 150ms analog-stick polling intervals - if
 *    that happens faster than 150ms the sticks never report anything.
 * 2. Whether a pad plugged in after mount actually gets wired, which is what
 *    the single shared slot used to break.
 */

import { test, expect } from '@playwright/test';

test.setTimeout(15000);

/**
 * Stands in for the vendored gamecontroller.js UMD bundle.
 *
 * `getGamepads()` stays empty on purpose: GameControllerManager then never
 * changes its active-controller state, so nothing but a delivered `connect`
 * event can cause a pad to be wired.
 */
const GAME_CONTROL_STUB = `
  (function () {
    var slots = {};
    window.__registrations = { connect: 0, disconnect: 0 };
    window.__padHandlers = 0;

    window.gameControl = {
      on: function (event, callback) {
        window.__registrations[event] = (window.__registrations[event] || 0) + 1;
        slots[event] = callback;
        return this;
      },
      off: function (event) {
        slots[event] = undefined;
        return this;
      },
      getGamepads: function () {
        return {};
      },
    };

    // Simulate a pad being plugged in. The fake pad counts the button handlers
    // the app registers on it.
    window.__plugIn = function (id) {
      var pad = {
        id: id,
        mapping: 'standard',
        before: function () {
          window.__padHandlers++;
          return pad;
        },
        after: function () {
          window.__padHandlers++;
          return pad;
        },
      };
      if (slots.connect) slots.connect(pad);
    };
  })();
`;

const stubGameControl = (page: import('@playwright/test').Page) =>
  page.route('**/vendor/gamecontroller.min.js', route =>
    route.fulfill({
      contentType: 'application/javascript',
      body: GAME_CONTROL_STUB,
    })
  );

const registrations = (page: import('@playwright/test').Page) =>
  page.evaluate(() => (window as any).__registrations.connect as number);

test.describe('Gamepad wiring', () => {
  test('registers the connect slot once and keeps it across renders', async ({ page }) => {
    await stubGameControl(page);

    await page.goto('/');
    await expect(page.locator('.shudan-goban')).toBeVisible();

    // Both consumers (GameControllerManager and useGameController) subscribe
    // through the fan-out registry, which owns the single slot.
    expect(await registrations(page)).toBe(1);

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
    expect(await registrations(page)).toBe(1);
  });

  test('wires a pad plugged in after mount', async ({ page }) => {
    await stubGameControl(page);

    await page.goto('/');
    await expect(page.locator('.shudan-goban')).toBeVisible();

    expect(await page.evaluate(() => (window as any).__padHandlers as number)).toBe(0);

    await page.evaluate(() => (window as any).__plugIn(0));

    // `useGameController` only sees this event if it still owns a share of the
    // single `connect` slot - before the fan-out registry, GameControllerManager
    // registered last and took it.
    await expect
      .poll(() => page.evaluate(() => (window as any).__padHandlers as number))
      .toBeGreaterThan(0);
  });
});
