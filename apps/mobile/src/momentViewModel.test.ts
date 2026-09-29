import { describe, expect, it } from 'vitest';
import { assertMoment } from '@trust/protocol';
import { canonicalMomentFixture } from '@trust/protocol/examples';
import { toMomentViewModel } from '../src/momentViewModel';

const moment = assertMoment(canonicalMomentFixture);

describe('mobile Moment view model', () => {
  it('renders memory-facing text from a validated Moment', () => {
    const view = toMomentViewModel(moment);
    expect(view.title).toBe('The Red Swing');
    expect(view.memoryLines).toContain('Child returned to the red swing several times.');
    expect(view.memoryLines).toContain('“Again!”');
  });

  it('shows capture provenance as metadata rather than narrative', () => {
    const view = toMomentViewModel(moment);
    expect(view.provenance.carrierCount).toBe(1);
    expect(view.provenance.captureReceiptCount).toBe(1);
    expect(view.provenance.capturedAt).toBe('2026-09-29T12:22:00-05:00');
    expect(view.memoryLines.join(' ')).not.toContain('aaaaaaaaaaaaaaaa');
  });

  it('shows divergent pickup assertions without winner language', () => {
    const view = toMomentViewModel(moment);
    const pickup = view.perspectives.find((item) => item.key === 'pickup_time');
    expect(pickup?.status).toBe('divergent');
    expect(pickup?.values).toHaveLength(2);
    expect(JSON.stringify(pickup)).not.toMatch(/winner|correct|true account/i);
  });

  it('never includes prohibited parent/custody/truth scoring labels', () => {
    const text = JSON.stringify(toMomentViewModel(moment));
    expect(text).not.toMatch(/parent_score|fitness_score|custody_score|truth_score|credibility_score|best_parent|legal_significance_score/);
  });
});
