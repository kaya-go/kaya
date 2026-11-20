/**
 * Clipboard tests - copy and paste SGF functionality
 *
 * Note: These tests are skipped on desktop (Tauri) because clipboard operations
 * use @tauri-apps/plugin-clipboard-manager instead of navigator.clipboard API.
 */

import { test, expect } from '@playwright/test';

test.setTimeout(15000);

// Skip clipboard tests on desktop - Tauri uses a different clipboard API
// Desktop runs on port 1420, web runs on port 3000
test.skip(
  ({ baseURL }) => baseURL?.includes(':1420') ?? false,
  'Clipboard API not available in Tauri WebView'
);

// Grant clipboard permissions for Chromium
test.use({
  permissions: ['clipboard-read', 'clipboard-write'],
});

test.describe('Copy SGF', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for board to be ready
    await expect(page.locator('.shudan-goban')).toBeVisible();
  });

  test('can copy empty game to clipboard', async ({ page, context }) => {
    // Click the copy button in header
    const copyButton = page.getByRole('button', { name: /copy/i });
    await expect(copyButton).toBeVisible();
    await copyButton.click();

    // Verify toast message appears
    await expect(page.getByText(/copied to clipboard/i)).toBeVisible();

    // Verify clipboard content contains SGF format (may have newlines)
    const clipboardContent = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardContent).toMatch(/\(\s*;/); // Opening paren followed by semicolon (with possible whitespace)
    expect(clipboardContent).toContain('SZ[');
  });

  test('can copy game with moves to clipboard', async ({ page }) => {
    // Play a few moves
    await page.locator('.shudan-vertex[data-x="3"][data-y="3"]').click();
    await page.locator('.shudan-vertex[data-x="15"][data-y="3"]').click();
    await page.locator('.shudan-vertex[data-x="3"][data-y="15"]').click();

    // Click the copy button
    const copyButton = page.getByRole('button', { name: /copy/i });
    await copyButton.click();

    // Verify toast message
    await expect(page.getByText(/copied to clipboard/i)).toBeVisible();

    // Verify clipboard contains the moves
    const clipboardContent = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardContent).toContain(';B[');
    expect(clipboardContent).toContain(';W[');
  });
});

test.describe('Paste SGF', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for board to be ready
    await expect(page.locator('.shudan-goban')).toBeVisible();
  });

  test('can paste SGF from clipboard', async ({ page }) => {
    // Write an SGF to clipboard
    const testSgf = '(;FF[4]GM[1]SZ[19];B[dd];W[pp];B[dp];W[pd])';
    await page.evaluate(sgf => navigator.clipboard.writeText(sgf), testSgf);

    // Click the paste button
    const pasteButton = page.getByRole('button', { name: /paste/i });
    await expect(pasteButton).toBeVisible();
    await pasteButton.click();

    // Wait for the game to load and navigate to the end
    await page.keyboard.press('End');

    // Verify the stones are on the board
    // D16 (dd) = x:3, y:3
    await expect(page.locator('.shudan-vertex[data-x="3"][data-y="3"]')).toHaveClass(
      /shudan-sign_1/
    );
    // Q4 (pp) = x:15, y:15
    await expect(page.locator('.shudan-vertex[data-x="15"][data-y="15"]')).toHaveClass(
      /shudan-sign_-1/
    );
    // D4 (dp) = x:3, y:15
    await expect(page.locator('.shudan-vertex[data-x="3"][data-y="15"]')).toHaveClass(
      /shudan-sign_1/
    );
    // Q16 (pd) = x:15, y:3
    await expect(page.locator('.shudan-vertex[data-x="15"][data-y="3"]')).toHaveClass(
      /shudan-sign_-1/
    );
  });

  test('copied SGF contains expected moves', async ({ page }) => {
    // Play some moves
    await page.locator('.shudan-vertex[data-x="9"][data-y="9"]').click(); // J10 - tengen
    await page.locator('.shudan-vertex[data-x="2"][data-y="2"]').click(); // C17

    // Copy to clipboard
    const copyButton = page.getByRole('button', { name: /copy/i });
    await copyButton.click();
    await expect(page.getByText(/copied to clipboard/i)).toBeVisible();

    // Verify the clipboard content has the expected moves
    const clipboardContent = await page.evaluate(() => navigator.clipboard.readText());
    // B[jj] = J10 (tengen), W[cc] = C17
    expect(clipboardContent).toContain('B[jj]');
    expect(clipboardContent).toContain('W[cc]');
  });
});

test.describe('Keyboard Shortcuts for Clipboard', () => {
  test.beforeEach(async ({ page }) => {
    // Count clipboard reads: on the web, a read can raise a permission prompt.
    await page.addInitScript(() => {
      const counter = window as unknown as { __clipboardReads: number };
      counter.__clipboardReads = 0;
      const read = navigator.clipboard.readText.bind(navigator.clipboard);
      navigator.clipboard.readText = () => {
        counter.__clipboardReads++;
        return read();
      };
    });
    await page.goto('/');
    await expect(page.locator('.shudan-goban')).toBeVisible();
  });

  const clipboardReads = () => (window as unknown as { __clipboardReads: number }).__clipboardReads;

  test('Ctrl+V does not read the clipboard behind the browser paste', async ({ page }) => {
    await page.keyboard.press('Control+v');
    await page.keyboard.press('Meta+v');
    expect(await page.evaluate(clipboardReads)).toBe(0);
  });

  test('a paste event with SGF loads the game', async ({ page }) => {
    // What the browser fires for Ctrl+V / Cmd+V outside a text field.
    await page.evaluate(sgf => {
      const data = new DataTransfer();
      data.setData('text/plain', sgf);
      document.body.dispatchEvent(
        new ClipboardEvent('paste', { clipboardData: data, bubbles: true, cancelable: true })
      );
    }, '(;FF[4]GM[1]SZ[19];B[jj])');

    await page.keyboard.press('End');
    // K10 (jj) = x:9, y:9
    await expect(page.locator('.shudan-vertex[data-x="9"][data-y="9"]')).toHaveClass(
      /shudan-sign_1/
    );
    expect(await page.evaluate(clipboardReads)).toBe(0);
  });
});
