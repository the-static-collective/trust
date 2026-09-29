import test from 'node:test';
import assert from 'node:assert/strict';
import { checkDocs } from './check-docs.mjs';

test('requires all durable Genesis docs', async () => {
  const result = await checkDocs(process.cwd());
  assert.equal(result.missing.length, 0, JSON.stringify(result, null, 2));
});

test('rejects TODO/TBD/FIXME placeholders', async () => {
  const result = await checkDocs(process.cwd());
  assert.equal(result.placeholders.length, 0, JSON.stringify(result, null, 2));
});

test('requires README to state child-first and local-first', async () => {
  const result = await checkDocs(process.cwd());
  assert.equal(result.requirements.readmeChildFirst, true);
  assert.equal(result.requirements.readmeLocalFirst, true);
});

test('requires legal baseline to contain recorded-authority and exemption boundaries', async () => {
  const result = await checkDocs(process.cwd());
  assert.equal(result.requirements.recordedAuthorityBoundary, true);
  assert.equal(result.requirements.exemptionBoundary, true);
});

test('requires roadmap to list Crossings 1 through 7', async () => {
  const result = await checkDocs(process.cwd());
  assert.equal(result.requirements.crossings1to7, true);
});

test('requires README commands to name existing package scripts', async () => {
  const result = await checkDocs(process.cwd());
  assert.equal(result.commandProblems.length, 0, JSON.stringify(result, null, 2));
});
