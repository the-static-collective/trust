import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('repository carries the complete Apache-2.0 license text', async () => {
  const license = await readFile(new URL('../LICENSE', import.meta.url), 'utf8');
  for (const marker of [
    '1. Definitions.',
    '2. Grant of Copyright License.',
    '9. Accepting Warranty or Additional Liability.',
    'END OF TERMS AND CONDITIONS',
    'APPENDIX: How to apply the Apache License to your work.',
  ]) {
    assert.equal(license.includes(marker), true, 'missing Apache-2.0 section: ' + marker);
  }
});
