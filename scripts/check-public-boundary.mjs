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
const DESIGN_PREFIXES = [
  'docs/superpowers/specs/',
  'docs/superpowers/plans/',
];

async function defaultListFiles(root) {
  const { stdout } = await execFileAsync('git', ['-C', root, 'ls-files', '-co', '--exclude-standard']);
  return stdout.split(/\r?\n/).filter(Boolean);
}

function normalizeRoot(root) {
  return root instanceof URL ? fileURLToPath(root) : resolve(String(root));
}

function isDesignArtifact(path) {
  return DESIGN_PREFIXES.some((prefix) => path.startsWith(prefix));
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
    if (PROHIBITED_EXTENSIONS.has(extension)) {
      violations.push({ path, reason: `prohibited raw-carrier extension: ${extension}` });
      continue;
    }

    let content;
    try {
      content = await readFile(resolve(rootPath, path), 'utf8');
    } catch {
      continue;
    }
    if (!isDesignArtifact(path) && content.includes(PRIVATE_SOURCE_MARKER)) {
      violations.push({ path, reason: `${PRIVATE_SOURCE_MARKER} source references are private-boundary material` });
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
