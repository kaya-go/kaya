/**
 * Game Info panel tests
 */

import { test, expect, type Page } from '@playwright/test';

test.setTimeout(15000);
test.use({ locale: 'en-US' });

async function openMobileInfo(page: Page) {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  // Phones get a LandingPage gate until the user picks an action.
  await page.getByRole('button', { name: 'New Game', exact: true }).click();
  await page.getByRole('tab', { name: /info/i }).click();
}

test.describe('Game Info edit mode', () => {
  test('phones get the "edit all fields" button, and it reveals empty fields', async ({ page }) => {
    await openMobileInfo(page);

    const panel = page.locator('.mobile-info-panel');
    const editButton = panel.locator('.info-edit-button');
    await expect(editButton).toBeVisible();

    const box = await editButton.boundingBox();
    expect(box!.width).toBeGreaterThanOrEqual(44);
    expect(box!.height).toBeGreaterThanOrEqual(44);

    await expect(panel.locator('.empty-placeholder')).toHaveCount(0);
    await editButton.click();
    await expect(panel.locator('.empty-placeholder').first()).toBeVisible();
  });

  test('edit mode survives switching between the mobile and desktop layouts', async ({ page }) => {
    await openMobileInfo(page);
    await page.locator('.mobile-info-panel .info-edit-button').click();

    // The desktop layout mounts a fresh editor; it used to flip edit mode off.
    await page.setViewportSize({ width: 1440, height: 900 });
    await expect(page.locator('.info-edit-button.active')).toBeVisible();
    await expect(page.locator('.game-info-editor .empty-placeholder').first()).toBeVisible();
  });
});
