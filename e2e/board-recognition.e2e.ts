/**
 * Board recognition dialog UI smoke tests.
 *
 * Covers the components extracted from BoardRecognitionDialog in the
 * repo-slim Phase 3 refactor (BoardSizeSelector, MobileTabs, DialogFooter
 * controls). The Moku ONNX model is heavy and would make these tests slow
 * + flaky, so anything that requires `mokuReady` (SensitivitySlider, delta
 * legend, calibration toolbar, working import) is intentionally out of
 * scope here — those still need manual verification.
 */

import { test, expect, type Page } from '@playwright/test';

test.setTimeout(20000);

// 8×8 solid-gray PNG — enough to instantiate the dialog without depending
// on actual board detection succeeding.
const TINY_PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAFklEQVR4nGNgYGD4z0AEYBxVSF+FAAhKAQGzVrf9AAAAAElFTkSuQmCC',
  'base64'
);

async function openDialog(page: Page) {
  await page.goto('/');
  // The header renders two hidden file inputs; the scan-board one accepts
  // only images (no .sgf), which makes its `accept` attribute unique.
  const scanInput = page.locator('input[type="file"][accept=".jpg,.jpeg,.png,.webp,.bmp"]');
  await scanInput.setInputFiles({
    name: 'test-board.png',
    mimeType: 'image/png',
    buffer: TINY_PNG,
  });
  await expect(page.locator('.brd-dialog')).toBeVisible();
}

test.describe('Board Recognition Dialog', () => {
  test.beforeEach(async ({ page }) => {
    await openDialog(page);
  });

  test('header, size row, and footer render', async ({ page }) => {
    await expect(page.locator('.brd-title')).toBeVisible();
    await expect(page.locator('.brd-size-row')).toBeVisible();
    await expect(page.locator('.brd-footer')).toBeVisible();
    await expect(page.locator('.brd-btn-cancel')).toBeVisible();
  });

  test('size selector exposes 9 / 13 / 19 presets with 19 active by default', async ({ page }) => {
    const buttons = page.locator('.brd-size-btn');
    await expect(buttons).toHaveCount(3);
    await expect(buttons.nth(0)).toHaveText('9×9');
    await expect(buttons.nth(1)).toHaveText('13×13');
    await expect(buttons.nth(2)).toHaveText('19×19');
    await expect(buttons.nth(2)).toHaveClass(/active/);
  });

  test('clicking a preset switches the active size', async ({ page }) => {
    const buttons = page.locator('.brd-size-btn');
    await buttons.nth(0).click();
    await expect(buttons.nth(0)).toHaveClass(/active/);
    await expect(buttons.nth(2)).not.toHaveClass(/active/);
  });

  test('custom size input activates and accepts values', async ({ page }) => {
    const customInput = page.locator('.brd-size-custom-input-inline');
    await expect(customInput).toBeVisible();
    await customInput.fill('11');
    await expect(customInput).toHaveClass(/active/);
    // None of the presets should be active when a custom size is chosen.
    const buttons = page.locator('.brd-size-btn');
    for (let i = 0; i < 3; i++) {
      await expect(buttons.nth(i)).not.toHaveClass(/active/);
    }
  });

  test('cancel button closes the dialog', async ({ page }) => {
    await page.locator('.brd-btn-cancel').click();
    await expect(page.locator('.brd-dialog')).not.toBeVisible();
  });

  test('close button (✕) closes the dialog', async ({ page }) => {
    await page.locator('.brd-close').click();
    await expect(page.locator('.brd-dialog')).not.toBeVisible();
  });
});

test.describe('Board Recognition Dialog — mobile layout', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test.beforeEach(async ({ page }) => {
    await openDialog(page);
  });

  test('mobile tabs render with the photo tab active', async ({ page }) => {
    const tabs = page.locator('.brd-mobile-tab');
    await expect(tabs).toHaveCount(2);
    await expect(tabs.nth(0)).toHaveClass(/active/);
    await expect(tabs.nth(1)).not.toHaveClass(/active/);
  });

  test('switching to the preview tab updates active state and panel visibility', async ({
    page,
  }) => {
    const tabs = page.locator('.brd-mobile-tab');
    const photoPanel = page.locator('.brd-panel-photo');
    const previewPanel = page.locator('.brd-panel-preview');

    // Photo panel visible, preview hidden by default.
    await expect(photoPanel).not.toHaveClass(/brd-mobile-hidden/);
    await expect(previewPanel).toHaveClass(/brd-mobile-hidden/);

    await tabs.nth(1).click();

    await expect(tabs.nth(1)).toHaveClass(/active/);
    await expect(tabs.nth(0)).not.toHaveClass(/active/);
    await expect(previewPanel).not.toHaveClass(/brd-mobile-hidden/);
    await expect(photoPanel).toHaveClass(/brd-mobile-hidden/);
  });
});
