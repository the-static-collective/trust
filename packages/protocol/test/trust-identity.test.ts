import { describe, expect, it } from 'vitest';
import {
  validateCertificateReadyPacket,
  validateTrustProfile,
  validateTrusteeTenure,
} from '../src/validate.js';

const profile = {
  trust_id: 'trust-synthetic-minnesota-001',
  legal_name: 'Synthetic Community Stewardship Trust',
  instrument_refs: ['instrument-synthetic-declaration-001'],
  instrument_date: '2026-09-29',
  stated_purpose: 'Religious and charitable stewardship for a synthetic community.',
  governing_law: 'Minnesota',
  principal_place_of_administration: 'Minnesota',
  trustee_tenure_refs: ['tenure-synthetic-a'],
  status: 'active',
};

const tenure = {
  tenure_id: 'tenure-synthetic-a',
  trustee_ref: 'person-synthetic-trustee-a',
  designation_ref: 'instrument-synthetic-declaration-001',
  acceptance_status: 'accepted',
  acceptance_method: 'performed_duty',
  acceptance_carrier_refs: ['carrier-synthetic-acceptance-a'],
  starts_at: '2026-09-29T09:00:00-05:00',
  powers: ['hold_property', 'pay_expenses'],
  limitations: ['two_trustees_for_asset_sale'],
};

const certificate = {
  packet_id: 'certificate-ready-synthetic-001',
  trust_id: profile.trust_id,
  trust_name: profile.legal_name,
  instrument_date: profile.instrument_date,
  trustees: [
    {
      trustee_ref: 'person-synthetic-trustee-a',
      address: 'Synthetic Address, Minnesota',
      powers: tenure.powers,
      limitations: tenure.limitations,
    },
  ],
  trustees_required_to_act: 2,
  termination_revocation_state: 'active',
  authority_boundary: 'draft_data_only',
  prepared_at: '2026-09-29T10:00:00-05:00',
};

describe('Minnesota trust identity and authority protocol', () => {
  it('represents governing instrument date, purpose, law, and administration place', () => {
    const result = validateTrustProfile(profile);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.instrument_date).toBe('2026-09-29');
    expect(result.value.stated_purpose).toContain('Religious');
    expect(result.value.governing_law).toBe('Minnesota');
    expect(result.value.principal_place_of_administration).toBe('Minnesota');
  });

  it('requires trustee acceptance evidence to remain descriptive', () => {
    expect(validateTrusteeTenure(tenure).ok).toBe(true);
    const missingEvidence = { ...tenure, acceptance_carrier_refs: [] };
    expect(validateTrusteeTenure(missingEvidence).ok).toBe(false);
    expect(JSON.stringify(tenure)).not.toContain('legally_authorized');
  });

  it('represents trustee powers and limitations without claiming legal authority', () => {
    const result = validateTrusteeTenure(tenure);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.powers).toContain('hold_property');
    expect(result.value.limitations).toContain('two_trustees_for_asset_sale');
    expect(result.value).not.toHaveProperty('legal_authority_confirmed');
  });

  it('represents number of trustees required to act', () => {
    const result = validateCertificateReadyPacket(certificate);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.trustees_required_to_act).toBe(2);
  });

  it('marks certificate-ready packets draft-data-only', () => {
    const result = validateCertificateReadyPacket(certificate);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.authority_boundary).toBe('draft_data_only');
  });

  it('rejects certificate packets that claim valid/notarized/executed status without execution carriers', () => {
    for (const forbidden of ['valid', 'legally_valid', 'notarized', 'official']) {
      const bad = { ...certificate, [forbidden]: true };
      expect(validateCertificateReadyPacket(bad).ok).toBe(false);
    }
  });
});
