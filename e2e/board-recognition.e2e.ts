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
  // On mobile viewports the app renders a LandingPage gate until the user
  // picks an action — click "New Game" to dismiss it so the Header (which
  // owns the hidden scan-board file input) mounts. On desktop the button
  // doesn't exist, so this is a no-op.
  const newGame = page.getByRole('button', { name: 'New Game', exact: true });
  if (await newGame.isVisible().catch(() => false)) {
    await newGame.click();
  }
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

/** A 19×19 board with three stones, drawn in the page: a photo the detector can read. */
async function drawnBoard(page: Page): Promise<Buffer> {
  const base64 = await page.evaluate(async () => {
    const size = 640;
    const margin = 40;
    const step = (size - 2 * margin) / 18;
    const canvas = new OffscreenCanvas(size, size);
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#dcb35c';
    ctx.fillRect(0, 0, size, size);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    for (let i = 0; i < 19; i++) {
      const p = margin + i * step;
      ctx.beginPath();
      ctx.moveTo(margin, p);
      ctx.lineTo(size - margin, p);
      ctx.moveTo(p, margin);
      ctx.lineTo(p, size - margin);
      ctx.stroke();
    }
    const stones: [number, number, string][] = [
      [3, 3, '#000'],
      [15, 15, '#fff'],
      [15, 3, '#000'],
    ];
    for (const [x, y, color] of stones) {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(margin + x * step, margin + y * step, step * 0.47, 0, Math.PI * 2);
      ctx.fill();
    }
    const blob = await canvas.convertToBlob({ type: 'image/png' });
    const bytes = new Uint8Array(await blob.arrayBuffer());
    let binary = '';
    for (const byte of bytes) binary += String.fromCharCode(byte);
    return btoa(binary);
  });
  return Buffer.from(base64, 'base64');
}

// Downloads the Moku model from Hugging Face, so it runs only on request:
// KAYA_E2E_MOKU=1 bun run test:e2e e2e/board-recognition.e2e.ts
test.describe('Board Recognition Dialog — Moku model', () => {
  test.skip(!process.env.KAYA_E2E_MOKU, 'downloads the Moku model; set KAYA_E2E_MOKU=1');
  test.setTimeout(240000);
  test.use({ locale: 'en-US' });

  test('a reopened dialog uses the detector already loaded', async ({ page }) => {
    // A slow worker: its answers land after React re-renders. A detector known
    // to be ready only from an effect then started a load it abandoned, and
    // "Loading AI model…" stayed for good.
    await page.addInitScript(() => {
      const desc = Object.getOwnPropertyDescriptor(Worker.prototype, 'onmessage')!;
      Object.defineProperty(Worker.prototype, 'onmessage', {
        configurable: true,
        get() {
          return desc.get!.call(this);
        },
        set(fn: (e: MessageEvent) => void) {
          desc.set!.call(this, (e: MessageEvent) => setTimeout(() => fn.call(this, e), 300));
        },
      });
    });

    await openDialog(page);
    const loading = page.getByText('Loading AI model…');
    await expect(loading.first()).toBeVisible();
    await expect(loading).toHaveCount(0, { timeout: 200000 });
    await page.locator('.brd-btn-cancel').click();
    await expect(page.locator('.brd-dialog')).toHaveCount(0);

    const scanInput = page.locator('input[type="file"][accept=".jpg,.jpeg,.png,.webp,.bmp"]');
    await scanInput.setInputFiles({ name: 'again.png', mimeType: 'image/png', buffer: TINY_PNG });
    await expect(page.locator('.brd-dialog')).toBeVisible();
    await page.waitForTimeout(2000);
    await expect(loading).toHaveCount(0);
  });

  test('cancelling the unsaved-changes prompt of Import as SGF keeps the scan', async ({
    page,
  }) => {
    await page.goto('/');
    const stone = page.locator('.shudan-vertex[data-x="3"][data-y="3"]');
    await stone.click(); // an unsaved change, so importing asks first
    const scanInput = page.locator('input[type="file"][accept=".jpg,.jpeg,.png,.webp,.bmp"]');
    const buffer = await drawnBoard(page);
    await scanInput.setInputFiles({ name: 'board.png', mimeType: 'image/png', buffer });
    const importButton = page.locator('.brd-btn-import');
    await expect(importButton).toBeEnabled({ timeout: 200000 });

    await importButton.click();
    await expect(page.locator('.unsaved-changes-dialog')).toBeVisible();
    // The dialog used to close before asking, and Cancel lost the scan.
    await expect(page.locator('.brd-dialog')).toBeVisible();
    await page.locator('.unsaved-changes-btn.cancel').click();
    await expect(page.locator('.unsaved-changes-dialog')).toHaveCount(0);
    await expect(importButton).toBeEnabled();
    await expect(stone).toHaveClass(/shudan-sign_1/);
  });
});
