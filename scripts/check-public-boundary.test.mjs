import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const moduleUrl = new URL('./check-public-boundary.mjs', import.meta.url);

async function loadChecker() {
  return import(moduleUrl.href);
}

async function withTree(files, fn) {
  const root = await mkdtemp(join(tmpdir(), 'trust-boundary-'));
  for (const [path, content] of Object.entries(files)) {
    const full = join(root, path);
    await mkdir(join(full, '..'), { recursive: true });
    await writeFile(full, content);
  }
  return fn(root);
}

test('accepts synthetic public fixture paths', async () => {
  const { checkPublicBoundary } = await loadChecker();
  await withTree({
    'fixtures/synthetic/moment.json': '{"source":"synthetic"}',
    'README.md': '# Trust',
  }, async (root) => {
    const result = await checkPublicBoundary(root, {
      listFiles: async () => ['fixtures/synthetic/moment.json', 'README.md'],
    });
    assert.equal(result.ok, true);
    assert.deepEqual(result.violations, []);
  });
});

test('rejects gdrive source refs', async () => {
  const { checkPublicBoundary } = await loadChecker();
  await withTree({
    'fixtures/synthetic/bad.json': JSON.stringify({ ref: ['gdrive', ':PRIVATE-ID'].join('') }),
  }, async (root) => {
    const result = await checkPublicBoundary(root, {
      listFiles: async () => ['fixtures/synthetic/bad.json'],
    });
    assert.equal(result.ok, false);
    assert.match(result.violations[0].reason, /private source reference/i);
  });
});

test('rejects raw evidence directories', async () => {
  const { checkPublicBoundary } = await loadChecker();
  await withTree({ 'evidence/example.txt': 'synthetic-ish' }, async (root) => {
    const result = await checkPublicBoundary(root, {
      listFiles: async () => ['evidence/example.txt'],
    });
    assert.equal(result.ok, false);
    assert.match(result.violations[0].reason, /prohibited path/i);
  });
});

test('rejects private carrier file extensions in tracked public fixtures', async () => {
  const { checkPublicBoundary } = await loadChecker();
  await withTree({ 'fixtures/synthetic/photo.jpg': 'not really an image' }, async (root) => {
    const result = await checkPublicBoundary(root, {
      listFiles: async () => ['fixtures/synthetic/photo.jpg'],
    });
    assert.equal(result.ok, false);
    assert.match(result.violations[0].reason, /raw-carrier extension/i);
  });
});

test('allows generic Black Star/WITNESS words in documentation', async () => {
  const { checkPublicBoundary } = await loadChecker();
  await withTree({
    'docs/ARCHITECTURE.md': 'Trust descends from Black Star but does not publish WITNESS.',
  }, async (root) => {
    const result = await checkPublicBoundary(root, {
      listFiles: async () => ['docs/ARCHITECTURE.md'],
    });
    assert.equal(result.ok, true);
  });
});

test('boundary implementation does not embed the forbidden source marker', async () => {
  const marker = ['gdrive', ':'].join('');
  const checker = await readFile(new URL('./check-public-boundary.mjs', import.meta.url), 'utf8');
  const tests = await readFile(new URL('./check-public-boundary.test.mjs', import.meta.url), 'utf8');
  assert.equal(checker.includes(marker), false);
  assert.equal(tests.includes(marker), false);
});

test('allows public mobile design assets', async () => {
  const { checkPublicBoundary } = await loadChecker();
  await withTree({ 'apps/mobile/assets/icon.png': 'synthetic public app asset' }, async (root) => {
    const result = await checkPublicBoundary(root, {
      listFiles: async () => ['apps/mobile/assets/icon.png'],
    });
    assert.equal(result.ok, true, JSON.stringify(result, null, 2));
  });
});

test('rejects actual-looking private source refs even in design artifacts', async () => {
  const { checkPublicBoundary } = await loadChecker();
  const privateRef = ['gdrive', ':'].join('') + 'PRIVATE-ID-12345';
  await withTree({ 'docs/superpowers/plans/example.md': privateRef }, async (root) => {
    const result = await checkPublicBoundary(root, {
      listFiles: async () => ['docs/superpowers/plans/example.md'],
    });
    assert.equal(result.ok, false);
    assert.match(result.violations[0].reason, /private source reference/i);
  });
});
