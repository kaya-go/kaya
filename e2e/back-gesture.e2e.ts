/**
 * Back gesture tests
 *
 * On Android, Tauri maps the system back button to `webview.goBack()` and quits
 * when the webview has no history, so `useCloseOnBack` gives the webview one
 * sentinel entry while an overlay is open. `page.goBack()` is the browser-side
 * equivalent of that gesture.
 *
 * Runs on a phone viewport: the settings sheet spans the screen there and its
 * only close button is in the corner, which is where the gesture matters.
 */

import { test, expect, type Page } from '@playwright/test';

test.setTimeout(20000);
test.use({ locale: 'en-US' });

async function openSettings(page: Page) {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  // Phones get a LandingPage gate until the user picks an action.
  await page.getByRole('button', { name: 'New Game', exact: true }).click();
  await expect(page.locator('.shudan-goban')).toBeVisible();

  const entriesBefore = await page.evaluate(() => history.length);
  await page.locator('.kaya-config-trigger').click();
  const sheet = page.locator('.kaya-config-modal');
  await expect(sheet).toBeVisible();
  return { sheet, entriesBefore };
}

const sentinelIsCurrent = (page: Page) =>
  page.evaluate(() => Boolean((history.state as Record<string, unknown> | null)?.kayaOverlay));

test.describe('Back gesture', () => {
  test('closes the settings sheet and keeps the app open', async ({ page }) => {
    const { sheet, entriesBefore } = await openSettings(page);
    // Exactly one entry, even with StrictMode double-running the effect in dev.
    expect(await page.evaluate(() => history.length)).toBe(entriesBefore + 1);

    const url = page.url();
    await page.goBack();

    await expect(sheet).toBeHidden();
    await expect(page.locator('.shudan-goban')).toBeVisible();
    expect(page.url()).toBe(url);
  });

  test('closing the sheet with its button gives the entry back', async ({ page }) => {
    const { sheet } = await openSettings(page);

    await page.getByRole('button', { name: 'Close settings' }).click();
    await expect(sheet).toBeHidden();
    await expect.poll(() => sentinelIsCurrent(page)).toBe(false);

    // Nothing is left to close, so back leaves the app instead of being
    // swallowed by a stale sentinel.
    await page.goBack();
    await expect(page).toHaveURL('about:blank');
  });

  test('nested overlays close one per back press', async ({ page }) => {
    // "Reset All" only opens its confirmation once a shortcut is customised.
    await page.addInitScript(() => {
      const none = { ctrl: false, shift: false, alt: false, meta: false };
      localStorage.setItem(
        'kaya-keyboard-shortcuts',
        JSON.stringify({ 'view.openSettings': { key: 'F9', modifiers: none } })
      );
    });
    const { sheet } = await openSettings(page);
    await page.locator('.kaya-config-tab', { hasText: 'Shortcuts' }).click();
    await page.locator('.shortcuts-reset-all').click();
    const confirm = page.locator('.shortcuts-collision-dialog');
    await expect(confirm).toBeVisible();

    await page.goBack();
    await expect(confirm).toBeHidden();
    await expect(sheet).toBeVisible();

    await page.goBack();
    await expect(sheet).toBeHidden();
    await expect(page.locator('.shudan-goban')).toBeVisible();
  });
});
