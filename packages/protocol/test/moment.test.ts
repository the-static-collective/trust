import { describe, expect, it } from 'vitest';
import canonical from '../../../fixtures/synthetic/moment-red-swing.json';
import badTime from '../../../fixtures/synthetic/invalid/moment-local-time-without-offset.json';
import badField from '../../../fixtures/synthetic/invalid/moment-unknown-core-field.json';
import { validateMoment } from '../src/validate.js';

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

describe('Moment protocol', () => {
  it('validates the canonical red-swing Moment', () => {
    expect(validateMoment(canonical).ok).toBe(true);
  });

  it('preserves original-before-interpretation references', () => {
    const result = validateMoment(canonical);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    const importedAt = Date.parse(result.value.carriers[0].capture_receipt.imported_at);
    const accountAt = Date.parse(result.value.accounts[0].recorded_at);
    expect(importedAt).toBeLessThan(accountAt);
  });

  it('rejects RFC3339 timestamps without offset/Z', () => {
    expect(validateMoment(badTime).ok).toBe(false);
  });

  it('rejects unknown core properties', () => {
    expect(validateMoment(badField).ok).toBe(false);
  });

  it('allows namespaced data only under extensions', () => {
    const good = clone(canonical) as any;
    good.extensions = { 'org.example.note': 'synthetic extension' };
    expect(validateMoment(good).ok).toBe(true);

    const bad = clone(canonical) as any;
    bad.extensions = { note: 'not namespaced' };
    expect(validateMoment(bad).ok).toBe(false);
  });

  it('allows divergent adult accounts without a verdict field', () => {
    const result = validateMoment(canonical);
    expect(result.ok).toBe(true);
    expect(JSON.stringify(canonical)).not.toContain('winner');
    expect(canonical.accounts[0].assertions[1].value).not.toBe(canonical.accounts[1].assertions[0].value);
  });

  it('rejects adult-conflict material from memory and child-facing audiences', () => {
    const memoryLeak = clone(canonical) as any;
    memoryLeak.accounts[0].adult_conflict = true;
    memoryLeak.accounts[0].memory_eligible = true;
    expect(validateMoment(memoryLeak).ok).toBe(false);

    const audienceLeak = clone(canonical) as any;
    audienceLeak.direct_statements[0].adult_conflict = true;
    audienceLeak.direct_statements[0].memory_eligible = false;
    expect(validateMoment(audienceLeak).ok).toBe(false);
  });

  it('rejects allegation and administrative records from child-facing memory', () => {
    for (const accountKind of ['allegation', 'administrative_record']) {
      const bad = clone(canonical) as any;
      bad.accounts[0].account_kind = accountKind;
      bad.accounts[0].memory_eligible = true;
      bad.accounts[0].audiences = ['private_archive', 'child_future', 'scrapbook'];
      expect(validateMoment(bad).ok).toBe(false);
    }
  });

  it('rejects prohibited parent/custody/truth score keys anywhere in a Moment', () => {
    const bad = clone(canonical) as any;
    bad.accounts[0].analysis = { custody_score: 0.92 };
    const result = validateMoment(bad);
    expect(result.ok).toBe(false);
  });
});
