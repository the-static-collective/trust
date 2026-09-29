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
