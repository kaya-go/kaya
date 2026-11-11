/**
 * A file that fails to load says so, and costs the current game nothing
 */

import { test, expect, type Page } from '@playwright/test';

test.setTimeout(20000);
test.use({ locale: 'en-US' });

const file = (name: string, content: string) => ({
  name,
  mimeType: 'application/x-go-sgf',
  buffer: Buffer.from(content),
});

const GAME = '(;GM[1]FF[4]SZ[19];B[pd];W[dp])';
const NOT_A_GAME = 'Notes from the club evening, nothing to parse here.';

const headerOpen = (page: Page) => page.locator('.app-header input[type="file"][accept^=".sgf"]');
const vertex = (page: Page, x: number, y: number) =>
  page.locator(`.shudan-vertex[data-x="${x}"][data-y="${y}"]`);
const errorToast = (page: Page) => page.locator('.toast.toast-error');

test.describe('SGF load errors', () => {
  test('Open on text that is not a game: a toast, and the game keeps its undo history', async ({
    page,
  }) => {
    await page.goto('/');
    await vertex(page, 3, 3).click();
    await vertex(page, 15, 15).click();
    await expect(vertex(page, 15, 15)).toHaveClass(/shudan-sign_-1/);

    // The game has unsaved moves, and the user agrees to drop them for the file.
    await headerOpen(page).setInputFiles(file('notes.sgf', NOT_A_GAME));
    await page.locator('.unsaved-changes-btn.discard').click();

    await expect(errorToast(page)).toHaveText(/Invalid SGF format/);
    await expect(vertex(page, 3, 3)).toHaveClass(/shudan-sign_1/);
    await expect(vertex(page, 15, 15)).toHaveClass(/shudan-sign_-1/);
    await expect(page.locator('.app-header')).not.toContainText('notes.sgf');

    // The refused file must not have cleared the history of the game in place.
    await page.keyboard.press('ControlOrMeta+z');
    await expect(vertex(page, 15, 15)).not.toHaveClass(/shudan-sign_-1/);
    await expect(vertex(page, 3, 3)).toHaveClass(/shudan-sign_1/);
  });

  test('Open on a malformed game tree: the toast says where the parser stopped', async ({
    page,
  }) => {
    await page.goto('/');
    await headerOpen(page).setInputFiles(file('broken.sgf', '(;GM[1]SZ[19];B[pd]])'));
    await expect(errorToast(page)).toHaveText(/Invalid SGF format: Unexpected token/);
  });

  test('library import of a file that is not a game: a toast, and nothing is stored', async ({
    page,
  }) => {
    await page.goto('/');
    await expect(page.getByText('Your library is empty')).toBeVisible();
    const libraryImport = page.locator('.library-panel input[type="file"]');
    await libraryImport.setInputFiles([file('notes.sgf', NOT_A_GAME), file('good.sgf', GAME)]);

    await expect(errorToast(page)).toHaveText(/Invalid SGF format/);
    await expect(page.locator('.library-tree-node', { hasText: 'good.sgf' })).toBeVisible();
    await expect(page.locator('.library-tree-node', { hasText: 'notes.sgf' })).toHaveCount(0);
  });

  test('paste of text that only looks like SGF: a toast, and the game stays', async ({
    page,
    context,
    baseURL,
  }) => {
    // Tauri reads the clipboard through its own plugin, not navigator.clipboard.
    test.skip(baseURL?.includes(':1420') ?? false, 'Clipboard API not available in Tauri');
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/');
    await vertex(page, 3, 3).click();
    await expect(vertex(page, 3, 3)).toHaveClass(/shudan-sign_1/);

    await page.evaluate(text => navigator.clipboard.writeText(text), '(see you on Tuesday)');
    await page.keyboard.press('Control+v');
    await page.locator('.unsaved-changes-btn.discard').click();

    await expect(errorToast(page)).toHaveText(/Invalid SGF format/);
    await expect(vertex(page, 3, 3)).toHaveClass(/shudan-sign_1/);
  });

  test('phone landing page: a refused file stays on the landing page, a game opens the board', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    const landingOpen = page.locator('.landing-page input[type="file"][accept=".sgf"]');

    await landingOpen.setInputFiles(file('notes.sgf', NOT_A_GAME));
    await expect(errorToast(page)).toHaveText(/Invalid SGF format/);
    await expect(page.locator('.landing-page')).toBeVisible();

    await landingOpen.setInputFiles(file('game.sgf', GAME));
    await expect(page.locator('.landing-page')).toHaveCount(0);
    await expect(page.locator('.shudan-goban')).toBeVisible();
    await expect(vertex(page, 15, 3)).toHaveClass(/shudan-sign_1/);
  });
});
