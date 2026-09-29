import { describe, expect, it } from 'vitest';
import bundle from '../../../fixtures/synthetic/trust-minnesota-religious.json';
import {
  validateCertificateReadyPacket,
  validateCompliancePosition,
  validateConflictDisclosure,
  validateDisclosureEvent,
  validateTrustAsset,
  validateTrustDecision,
  validateTrustInstrument,
  validateTrustProfile,
  validateTrustTransaction,
  validateTrusteeTenure,
} from '../src/validate.js';

describe('Minnesota trust administration baseline', () => {
  it('represents trust property separately from personal custody', () => {
    const result = validateTrustAsset(bundle.assets[0]);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.ownership_state).toBe('trust_property');
    expect(result.value.custody_ref).toBe('account-synthetic-trust-checking');

    const personal = { ...bundle.assets[0], asset_id: 'asset-synthetic-personal', ownership_state: 'personal_property' };
    expect(validateTrustAsset(personal).ok).toBe(true);
  });

  it('requires asset ownership/title carrier references', () => {
    const bad = { ...bundle.assets[0], ownership_carrier_refs: [] };
    expect(validateTrustAsset(bad).ok).toBe(false);
  });

  it('represents contribution, expenditure, distribution, transfer, and reimbursement records', () => {
    for (const type of ['contribution', 'expenditure', 'distribution', 'transfer', 'reimbursement']) {
      const tx = {
        ...bundle.transactions[0],
        transaction_id: `transaction-synthetic-${type}`,
        type,
      };
      expect(validateTrustTransaction(tx).ok).toBe(true);
    }
  });

  it('preserves conflict disclosure, recusal, and approval references without adjudicating loyalty', () => {
    const result = validateConflictDisclosure(bundle.conflicts[0]);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.recusal_state).toBe('recused');
    expect(result.value.approval_refs).toContain('approval-synthetic-b');
    expect(result.value).not.toHaveProperty('loyalty_verdict');
  });

  it('represents requested/furnished disclosure events', () => {
    const result = validateDisclosureEvent(bundle.disclosure_events[0]);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.requested_at).toBeTruthy();
    expect(result.value.furnished_at).toBeTruthy();
    expect(result.value.furnished_carrier_refs.length).toBeGreaterThan(0);
  });

  it('represents exemption as a claimed compliance position', () => {
    const result = validateCompliancePosition(bundle.compliance_positions[0]);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.claimed_status).toBe('claimed_exempt');
    expect(result.value.authority_boundary).toBe('recorded_position_not_legal_determination');
  });

  it('rejects legally_exempt booleans and equivalent legal-status verdict fields', () => {
    for (const forbidden of ['legally_exempt', 'tax_exempt_established', 'legal_authority_confirmed']) {
      const bad = { ...bundle.compliance_positions[0], [forbidden]: true };
      expect(validateCompliancePosition(bad).ok).toBe(false);
    }
  });

  it('validates the canonical synthetic Minnesota religious-trust fixture', () => {
    const results = [
      validateTrustProfile(bundle.trust_profile),
      ...bundle.instruments.map(validateTrustInstrument),
      ...bundle.trustee_tenures.map(validateTrusteeTenure),
      ...bundle.assets.map(validateTrustAsset),
      ...bundle.transactions.map(validateTrustTransaction),
      ...bundle.decisions.map(validateTrustDecision),
      ...bundle.conflicts.map(validateConflictDisclosure),
      ...bundle.disclosure_events.map(validateDisclosureEvent),
      ...bundle.compliance_positions.map(validateCompliancePosition),
      validateCertificateReadyPacket(bundle.certificate_ready_packet),
    ];
    expect(results.every((result) => result.ok)).toBe(true);
  });
});
