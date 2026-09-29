export type Audience =
  | 'private_archive'
  | 'co_parent'
  | 'professional'
  | 'child_future'
  | 'scrapbook'
  | 'trust_admin';

export type CaptureMode =
  | 'contemporaneous'
  | 'near_contemporaneous'
  | 'retrospective'
  | 'imported_historical';

export type OccurrenceStatus = 'planned' | 'observed' | 'reported' | 'unknown';
export type Extensions = Record<string, unknown>;

export type CaptureReceipt = {
  receipt_id: string;
  source_class: string;
  captured_at?: string;
  imported_at: string;
  size_bytes: number;
  sha256: string;
  mime_type: string;
  capture_method: string;
  vault_ref: string;
  extensions?: Extensions;
};

export type Carrier = {
  carrier_id: string;
  kind: string;
  status: 'original' | 'derived';
  capture_receipt: CaptureReceipt;
  parent_carrier_refs?: string[];
  extensions?: Extensions;
};

export type Assertion = { key: string; value: unknown };

export type Account = {
  account_id: string;
  author_ref: string;
  account_kind: 'observation' | 'recollection' | 'interpretation' | 'allegation' | 'administrative_record';
  recorded_at: string;
  text: string;
  source_refs: string[];
  audiences: Audience[];
  adult_conflict: boolean;
  memory_eligible: boolean;
  assertions?: Assertion[];
  extensions?: Extensions;
};

export type DirectStatement = {
  statement_id: string;
  speaker_ref: string;
  recorded_by_ref: string;
  recorded_at: string;
  quote_mode: 'exact' | 'paraphrase';
  text: string;
  source_refs: string[];
  audiences: Audience[];
  adult_conflict: boolean;
  memory_eligible: boolean;
  extensions?: Extensions;
};

export type PrivacyPolicy = {
  child_future_access: 'allowed' | 'withheld_pending_review' | 'not_applicable';
  default_audience: Audience;
  extensions?: Extensions;
};

export type AudiencePolicy = {
  allowed: Audience[];
  extensions?: Extensions;
};

export type Moment = {
  protocol_version: '0.1.0';
  moment_id: string;
  title?: string;
  event_window: { start: string; end?: string };
  occurrence_status: OccurrenceStatus;
  capture_mode: CaptureMode;
  carriers: Carrier[];
  accounts: Account[];
  direct_statements: DirectStatement[];
  privacy_policy: PrivacyPolicy;
  audience_policy: AudiencePolicy;
  extensions?: Extensions;
};

export type ValidationError = { path: string; message: string };
export type ValidationResult<T> =
  | { ok: true; value: T }
  | { ok: false; errors: ValidationError[] };


export type TrustProfile = {
  trust_id: string;
  legal_name: string;
  instrument_refs: string[];
  instrument_date: string;
  stated_purpose: string;
  governing_law: string;
  principal_place_of_administration: string;
  trustee_tenure_refs: string[];
  status: 'active' | 'terminated' | 'revoked' | 'unknown';
  extensions?: Extensions;
};

export type TrustInstrument = {
  instrument_id: string;
  instrument_type: 'declaration' | 'agreement' | 'amendment' | 'restatement' | 'other';
  carrier_refs: string[];
  effective_at?: string;
  recorded_at: string;
  supersedes: string[];
  extensions?: Extensions;
};

export type TrusteeTenure = {
  tenure_id: string;
  trustee_ref: string;
  designation_ref: string;
  acceptance_status: 'designated' | 'accepted' | 'declined' | 'resigned' | 'removed' | 'ended' | 'unknown';
  acceptance_method?: 'instrument_method' | 'accepted_property' | 'exercised_power' | 'performed_duty' | 'other_recorded_conduct';
  acceptance_carrier_refs: string[];
  starts_at?: string;
  ends_at?: string;
  powers: string[];
  limitations: string[];
  extensions?: Extensions;
};

export type AuthorityEvent = {
  event_id: string;
  actor_refs: string[];
  action_type: string;
  authority_basis_refs: string[];
  approval_refs: string[];
  effective_at?: string;
  recorded_at: string;
  status: 'proposed' | 'approved' | 'executed' | 'reversed' | 'disputed' | 'unknown';
  extensions?: Extensions;
};

export type CertificateReadyTrustee = {
  trustee_ref: string;
  address?: string;
  powers: string[];
  limitations: string[];
};

export type CertificateReadyPacket = {
  packet_id: string;
  trust_id: string;
  trust_name: string;
  instrument_date: string;
  trustees: CertificateReadyTrustee[];
  trustees_required_to_act: number;
  termination_revocation_state: 'active' | 'terminated' | 'revoked' | 'unknown';
  authority_boundary: 'draft_data_only';
  prepared_at: string;
  execution_carrier_refs?: string[];
  extensions?: Extensions;
};
