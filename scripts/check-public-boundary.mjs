import { readFile } from 'node:fs/promises';
import { extname, resolve } from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';

const execFileAsync = promisify(execFile);

const PROHIBITED_SEGMENTS = new Set(['sources', 'evidence', 'private', 'witness-vault']);
const PROHIBITED_EXTENSIONS = new Set([
  '.jpg', '.jpeg', '.png', '.webp', '.mp4', '.mov', '.m4a', '.wav',
  '.zip', '.sqlite', '.sqlite3', '.db', '.xml',
]);
const PRIVATE_SOURCE_MARKER = ['gdrive', ':'].join('');
const PUBLIC_ASSET_PREFIXES = ['apps/mobile/assets/'];
const PRIVATE_SOURCE_PATTERNS = [
  new RegExp(PRIVATE_SOURCE_MARKER + '[A-Za-z0-9_-]{8,}', 'i'),
  new RegExp('https?://(?:drive|docs)\\.google\\.com/(?:file/d/|drive/folders/|document/d/|spreadsheets/d/|presentation/d/)[A-Za-z0-9_-]{8,}', 'i'),
];

async function defaultListFiles(root) {
  const { stdout } = await execFileAsync('git', ['-C', root, 'ls-files', '-co', '--exclude-standard']);
  return stdout.split(/\r?\n/).filter(Boolean);
}

function normalizeRoot(root) {
  return root instanceof URL ? fileURLToPath(root) : resolve(String(root));
}

function isPublicAsset(path) {
  return PUBLIC_ASSET_PREFIXES.some((prefix) => path.startsWith(prefix));
}

export async function checkPublicBoundary(root, options = {}) {
  const rootPath = normalizeRoot(root);
  const listFiles = options.listFiles ?? defaultListFiles;
  const files = await listFiles(rootPath);
  const violations = [];

  for (const inputPath of files) {
    const path = String(inputPath).replaceAll('\\', '/').replace(/^\.\//, '');
    const segments = path.split('/');
    const prohibitedSegment = segments.find((segment) => PROHIBITED_SEGMENTS.has(segment));
    if (prohibitedSegment) {
      violations.push({ path, reason: `prohibited path segment: ${prohibitedSegment}` });
      continue;
    }

    const extension = extname(path).toLowerCase();
    if (PROHIBITED_EXTENSIONS.has(extension) && !isPublicAsset(path)) {
      violations.push({ path, reason: `prohibited raw-carrier extension: ${extension}` });
      continue;
    }

    let content;
    try {
      content = await readFile(resolve(rootPath, path), 'utf8');
    } catch {
      continue;
    }
    if (PRIVATE_SOURCE_PATTERNS.some((pattern) => pattern.test(content))) {
      violations.push({ path, reason: 'private source reference is not allowed in the public repository' });
    }
  }

  return { ok: violations.length === 0, violations };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const result = await checkPublicBoundary(process.cwd());
  if (result.ok) {
    console.log('PUBLIC BOUNDARY: PASS (0 violations)');
  } else {
    console.error('PUBLIC BOUNDARY: FAIL');
    for (const violation of result.violations) {
      console.error(`${violation.path}: ${violation.reason}`);
    }
    process.exitCode = 1;
  }
}
