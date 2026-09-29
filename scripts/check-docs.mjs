import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const REQUIRED_DOCS = [
  'README.md',
  'docs/ROADMAP.md',
  'docs/ARCHITECTURE.md',
  'docs/CHILD_FIRST.md',
  'docs/TRUST_BOUNDARY.md',
  'docs/PROVENANCE.md',
  'docs/LEGAL_BASELINE_MN.md',
];

const PRODUCT_DOCS = REQUIRED_DOCS;
const PLACEHOLDER = /\b(?:TODO|TBD|FIXME)\b/g;

async function readMaybe(root, path) {
  try {
    return await readFile(resolve(root, path), 'utf8');
  } catch {
    return null;
  }
}

export async function checkDocs(root) {
  const packageJsonText = await readMaybe(root, 'package.json');
  const packageJson = packageJsonText ? JSON.parse(packageJsonText) : { scripts: {} };
  const contents = new Map();
  const missing = [];
  const placeholders = [];

  for (const path of PRODUCT_DOCS) {
    const content = await readMaybe(root, path);
    if (content === null) {
      missing.push(path);
      continue;
    }
    contents.set(path, content);
    for (const match of content.matchAll(PLACEHOLDER)) {
      placeholders.push({ path, marker: match[0], index: match.index });
    }
  }

  const readme = contents.get('README.md') ?? '';
  const legal = contents.get('docs/LEGAL_BASELINE_MN.md') ?? '';
  const roadmap = contents.get('docs/ROADMAP.md') ?? '';

  const commandProblems = [];
  const commandPattern = /npm run ([a-zA-Z0-9:_-]+)/g;
  for (const match of readme.matchAll(commandPattern)) {
    const name = match[1];
    if (!packageJson.scripts?.[name]) {
      commandProblems.push({ command: name, reason: 'missing package.json script' });
    }
  }

  const crossings1to7 = Array.from({ length: 7 }, (_, i) =>
    roadmap.includes(`Crossing ${i + 1}`)
  ).every(Boolean);

  return {
    ok:
      missing.length === 0 &&
      placeholders.length === 0 &&
      commandProblems.length === 0,
    missing,
    placeholders,
    commandProblems,
    requirements: {
      readmeChildFirst: /child-first/i.test(readme),
      readmeLocalFirst: /local-first/i.test(readme),
      recordedAuthorityBoundary:
        legal.includes('RECORDED AUTHORITY != LEGAL AUTHORITY'),
      exemptionBoundary:
        legal.includes('EXEMPTION CLAIM != EXEMPTION ESTABLISHED'),
      crossings1to7,
    },
  };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const result = await checkDocs(process.cwd());
  const requirementsOk = Object.values(result.requirements).every(Boolean);
  if (result.ok && requirementsOk) {
    console.log('DOCS CHECK: PASS');
  } else {
    console.error(JSON.stringify(result, null, 2));
    process.exitCode = 1;
  }
}
