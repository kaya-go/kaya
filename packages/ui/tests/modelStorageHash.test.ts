/**
 * Upload dedup stores a base64url SHA-256. The empty digest is the
 * well-known test vector, so a change in alphabet or padding fails here.
 */

import { describe, expect, test } from 'bun:test';
import { sha256Base64Url } from '../src/services/modelStorage';

describe('sha256Base64Url', () => {
  test('encodes SHA-256 of empty input as unpadded base64url', async () => {
    expect(await sha256Base64Url(new ArrayBuffer(0))).toBe(
      '47DEQpj8HBSa-_TImW-5JCeuQeRkm5NMpJWZG3hSuFU'
    );
  });
});
