/**
 * Unit tests for external link detection
 */

import { describe, test, expect } from 'bun:test';
import { isExternalLinkTarget } from '../src/hooks/useExternalLinks';

describe('isExternalLinkTarget', () => {
  test('accepts web URLs marked for a new tab', () => {
    expect(isExternalLinkTarget('https://example.com/game/1', '_blank')).toBe(true);
    expect(isExternalLinkTarget('http://example.com', '_blank')).toBe(true);
  });

  test('accepts the other protocols the Tauri shell scope allows', () => {
    expect(isExternalLinkTarget('mailto:someone@example.com', '_blank')).toBe(true);
    expect(isExternalLinkTarget('tel:+33123456789', '_blank')).toBe(true);
  });

  test('ignores case and surrounding whitespace in the protocol', () => {
    expect(isExternalLinkTarget('HTTPS://example.com', '_blank')).toBe(true);
    expect(isExternalLinkTarget('  https://example.com', '_blank')).toBe(true);
  });

  test('leaves in-app navigation alone', () => {
    expect(isExternalLinkTarget('https://example.com', null)).toBe(false);
    expect(isExternalLinkTarget('https://example.com', '_self')).toBe(false);
    expect(isExternalLinkTarget('#anchor', '_blank')).toBe(false);
    expect(isExternalLinkTarget('/library', '_blank')).toBe(false);
  });

  test('never hands over a missing or non-navigational href', () => {
    expect(isExternalLinkTarget(null, '_blank')).toBe(false);
    expect(isExternalLinkTarget(undefined, '_blank')).toBe(false);
    expect(isExternalLinkTarget('', '_blank')).toBe(false);
    // Dangerous protocols must never reach shell.open()
    expect(isExternalLinkTarget('javascript:alert(1)', '_blank')).toBe(false);
    expect(isExternalLinkTarget('data:text/html,<script></script>', '_blank')).toBe(false);
    expect(isExternalLinkTarget('file:///etc/passwd', '_blank')).toBe(false);
  });
});
