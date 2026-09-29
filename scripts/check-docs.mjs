import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const DURABLE_DOCS = [
  'README.md',
  'docs/ROADMAP.md',
  'docs/ARCHITECTURE.md',
  'docs/CHILD_FIRST.md',
  'docs/TRUST_BOUNDARY.md',
  'docs/PROVENANCE.md',
  'docs/LEGAL_BASELINE_MN.md',
];

async function readMaybe(path) {
  try {
    return await readFile(path, 'utf8');
  } catch {
    return null;
  }
}

function scriptForCommand(command) {
  const run = command.match(/^npm run ([^\s]+)(?: --workspace ([^\s]+))?$/);
  if (run) return { script: run[1], workspace: run[2] ?? null };
  const test = command.match(/^npm test(?: --workspace ([^\s]+))?$/);
  if (test) return { script: 'test', workspace: test[1] ?? null };
  return null;
}

async function packageScripts(root, workspace) {
  if (!workspace) {
    const pkg = JSON.parse(await readFile(resolve(root, 'package.json'), 'utf8'));
    return pkg.scripts ?? {};
  }
  const locations = {
    '@trust/protocol': 'packages/protocol/package.json',
    '@trust/mobile': 'apps/mobile/package.json',
  };
  const location = locations[workspace];
  if (!location) return null;
  const pkg = JSON.parse(await readFile(resolve(root, location), 'utf8'));
  return pkg.scripts ?? {};
}

export async function checkDocs(root) {
  const missing = [];
  const contents = {};

  for (const relative of DURABLE_DOCS) {
    const value = await readMaybe(resolve(root, relative));
    if (value === null) missing.push(relative);
    else contents[relative] = value;
  }

  const placeholders = [];
  for (const [path, content] of Object.entries(contents)) {
    for (const match of content.matchAll(/\b(?:TODO|TBD|FIXME)\b/g)) {
      placeholders.push({ path, marker: match[0] });
    }
  }

  const readme = contents['README.md'] ?? '';
  const roadmap = contents['docs/ROADMAP.md'] ?? '';
  const legal = contents['docs/LEGAL_BASELINE_MN.md'] ?? '';

  const requirements = {
    readmeChildFirst: /child-first/i.test(readme),
    readmeLocalFirst: /local-first/i.test(readme),
    recordedAuthorityBoundary: legal.includes('RECORDED AUTHORITY != LEGAL AUTHORITY'),
    exemptionBoundary: legal.includes('EXEMPTION CLAIM != EXEMPTION ESTABLISHED'),
    crossings1to7: Array.from({ length: 7 }, (_, index) =>
      roadmap.includes(`Crossing ${index + 1}`)
    ).every(Boolean),
  };

  const commandProblems = [];
  const commands = [...readme.matchAll(/^\s*(npm (?:run|test)[^\n]+)$/gm)].map(
    (match) => match[1].trim(),
  );
  for (const command of commands) {
    const parsed = scriptForCommand(command);
    if (!parsed) continue;
    const scripts = await packageScripts(root, parsed.workspace);
    if (!scripts || !Object.hasOwn(scripts, parsed.script)) {
      commandProblems.push({ command, reason: 'referenced package script does not exist' });
    }
  }

  return { missing, placeholders, requirements, commandProblems };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const result = await checkDocs(process.cwd());
  const ok =
    result.missing.length === 0 &&
    result.placeholders.length === 0 &&
    Object.values(result.requirements).every(Boolean) &&
    result.commandProblems.length === 0;

  if (ok) {
    console.log('DOCS CHECK: PASS');
  } else {
    console.error('DOCS CHECK: FAIL');
    console.error(JSON.stringify(result, null, 2));
    process.exitCode = 1;
  }
}
