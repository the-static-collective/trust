import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('root exposes the Genesis verification scripts', async () => {
  const pkg = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));
  for (const name of [
    'test',
    'typecheck',
    'public-boundary',
    'docs:check',
    'mobile:smoke',
    'verify',
  ]) {
    assert.equal(typeof pkg.scripts?.[name], 'string', `missing root script: ${name}`);
  }
});

test('verify composes every Genesis gate', async () => {
  const pkg = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));
  const verify = pkg.scripts?.verify ?? '';
  for (const required of [
    'public-boundary',
    'docs:check',
    'test',
    'typecheck',
    'mobile:smoke',
  ]) {
    assert.match(verify, new RegExp(required.replace(':', '\\:')), `verify missing ${required}`);
  }
});
