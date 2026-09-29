import Ajv2020, { type ErrorObject } from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import commonSchema from '../schemas/common.schema.json' with { type: 'json' };
import captureReceiptSchema from '../schemas/capture-receipt.schema.json' with { type: 'json' };
import carrierSchema from '../schemas/carrier.schema.json' with { type: 'json' };
import accountSchema from '../schemas/account.schema.json' with { type: 'json' };
import directStatementSchema from '../schemas/direct-statement.schema.json' with { type: 'json' };
import privacyPolicySchema from '../schemas/privacy-policy.schema.json' with { type: 'json' };
import audiencePolicySchema from '../schemas/audience-policy.schema.json' with { type: 'json' };
import momentSchema from '../schemas/moment.schema.json' with { type: 'json' };
import trustProfileSchema from '../schemas/trust-profile.schema.json' with { type: 'json' };
import trustInstrumentSchema from '../schemas/trust-instrument.schema.json' with { type: 'json' };
import trusteeTenureSchema from '../schemas/trustee-tenure.schema.json' with { type: 'json' };
import authorityEventSchema from '../schemas/authority-event.schema.json' with { type: 'json' };
import certificateReadyPacketSchema from '../schemas/certificate-ready-packet.schema.json' with { type: 'json' };
import type { AuthorityEvent, CertificateReadyPacket, Moment, TrustInstrument, TrustProfile, TrusteeTenure, ValidationError, ValidationResult } from './types.js';

const ajv = new Ajv2020({ allErrors: true, strict: false });
addFormats(ajv);
for (const schema of [
  commonSchema,
  captureReceiptSchema,
  carrierSchema,
  accountSchema,
  directStatementSchema,
  privacyPolicySchema,
  audiencePolicySchema,
  momentSchema,
  trustProfileSchema,
  trustInstrumentSchema,
  trusteeTenureSchema,
  authorityEventSchema,
  certificateReadyPacketSchema,
]) {
  ajv.addSchema(schema);
}

const registeredMomentValidator = ajv.getSchema('https://trust.static/schemas/moment.schema.json');
if (!registeredMomentValidator) throw new Error('Moment schema failed to register');
const momentValidator = registeredMomentValidator;

function registeredValidator(id: string) {
  const validator = ajv.getSchema(id);
  if (!validator) throw new Error(`Schema failed to register: ${id}`);
  return validator;
}

const trustProfileValidator = registeredValidator('https://trust.static/schemas/trust-profile.schema.json');
const trustInstrumentValidator = registeredValidator('https://trust.static/schemas/trust-instrument.schema.json');
const trusteeTenureValidator = registeredValidator('https://trust.static/schemas/trustee-tenure.schema.json');
const authorityEventValidator = registeredValidator('https://trust.static/schemas/authority-event.schema.json');
const certificateReadyPacketValidator = registeredValidator('https://trust.static/schemas/certificate-ready-packet.schema.json');

const FORBIDDEN_KEYS = new Set([
  'parent_score',
  'fitness_score',
  'custody_score',
  'truth_score',
  'risk_score',
  'credibility_score',
  'best_parent',
  'legal_significance_score',
]);
const OFFSET_RE = /(?:Z|[+-]\d{2}:\d{2})$/i;

function schemaErrors(errors: ErrorObject[] | null | undefined): ValidationError[] {
  return (errors ?? []).map((error) => ({
    path: error.instancePath || '$',
    message: error.message ?? error.keyword,
  }));
}

function scanForbidden(value: unknown, path = '$', errors: ValidationError[] = []): ValidationError[] {
  if (Array.isArray(value)) {
    value.forEach((child, index) => scanForbidden(child, `${path}[${index}]`, errors));
  } else if (value && typeof value === 'object') {
    for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
      if (FORBIDDEN_KEYS.has(key)) {
        errors.push({ path: `${path}.${key}`, message: 'prohibited automated parent/custody/truth scoring field' });
      }
      scanForbidden(child, `${path}.${key}`, errors);
    }
  }
  return errors;
}

function requireOffset(value: string | undefined, path: string, errors: ValidationError[]): void {
  if (value && !OFFSET_RE.test(value)) {
    errors.push({ path, message: 'timestamp must include Z or an explicit UTC offset' });
  }
}

function momentSemanticErrors(moment: Moment): ValidationError[] {
  const errors: ValidationError[] = [];
  requireOffset(moment.event_window.start, '$.event_window.start', errors);
  requireOffset(moment.event_window.end, '$.event_window.end', errors);

  const carriers = new Map(moment.carriers.map((carrier) => [carrier.carrier_id, carrier]));
  for (const [index, carrier] of moment.carriers.entries()) {
    requireOffset(carrier.capture_receipt.captured_at, `$.carriers[${index}].capture_receipt.captured_at`, errors);
    requireOffset(carrier.capture_receipt.imported_at, `$.carriers[${index}].capture_receipt.imported_at`, errors);
  }

  const records = [
    ...moment.accounts.map((record, index) => ({ record, path: `$.accounts[${index}]` })),
    ...moment.direct_statements.map((record, index) => ({ record, path: `$.direct_statements[${index}]` })),
  ];
  for (const { record, path } of records) {
    requireOffset(record.recorded_at, `${path}.recorded_at`, errors);
    const recordedAt = Date.parse(record.recorded_at);
    for (const sourceRef of record.source_refs) {
      const carrier = carriers.get(sourceRef);
      if (!carrier) {
        errors.push({ path: `${path}.source_refs`, message: `unknown carrier reference: ${sourceRef}` });
        continue;
      }
      const importedAt = Date.parse(carrier.capture_receipt.imported_at);
      if (Number.isFinite(recordedAt) && Number.isFinite(importedAt) && recordedAt < importedAt) {
        errors.push({ path: `${path}.recorded_at`, message: `interpretation precedes referenced carrier import: ${sourceRef}` });
      }
    }
  }
  return errors;
}

export function validateMoment(value: unknown): ValidationResult<Moment> {
  const forbidden = scanForbidden(value);
  const schemaOk = momentValidator(value);
  const errors = [...forbidden, ...schemaErrors(momentValidator.errors)];
  if (schemaOk) {
    errors.push(...momentSemanticErrors(value as Moment));
  }
  if (errors.length) return { ok: false, errors };
  return { ok: true, value: value as Moment };
}

export function assertMoment(value: unknown): Moment {
  const result = validateMoment(value);
  if (!result.ok) {
    const detail = result.errors.map((error) => `${error.path}: ${error.message}`).join('; ');
    throw new Error(`Invalid Moment: ${detail}`);
  }
  return result.value;
}


function validateWithSchema<T>(
  value: unknown,
  validator: ReturnType<typeof registeredValidator>,
  semanticErrors: ValidationError[] = [],
): ValidationResult<T> {
  const forbidden = scanForbidden(value);
  const schemaOk = validator(value);
  const errors = [...forbidden, ...schemaErrors(validator.errors), ...semanticErrors];
  if (!schemaOk || errors.length) return { ok: false, errors };
  return { ok: true, value: value as T };
}

export function validateTrustProfile(value: unknown): ValidationResult<TrustProfile> {
  return validateWithSchema<TrustProfile>(value, trustProfileValidator);
}

export function validateTrustInstrument(value: unknown): ValidationResult<TrustInstrument> {
  const errors: ValidationError[] = [];
  if (value && typeof value === 'object') {
    const item = value as Partial<TrustInstrument>;
    requireOffset(item.effective_at, '$.effective_at', errors);
    requireOffset(item.recorded_at, '$.recorded_at', errors);
  }
  return validateWithSchema<TrustInstrument>(value, trustInstrumentValidator, errors);
}

export function validateTrusteeTenure(value: unknown): ValidationResult<TrusteeTenure> {
  const errors: ValidationError[] = [];
  if (value && typeof value === 'object') {
    const item = value as Partial<TrusteeTenure>;
    requireOffset(item.starts_at, '$.starts_at', errors);
    requireOffset(item.ends_at, '$.ends_at', errors);
    if (item.acceptance_status === 'accepted') {
      if (!item.acceptance_method) {
        errors.push({ path: '$.acceptance_method', message: 'accepted trustee tenure requires recorded acceptance method' });
      }
      if (!item.acceptance_carrier_refs?.length) {
        errors.push({ path: '$.acceptance_carrier_refs', message: 'accepted trustee tenure requires acceptance carrier evidence' });
      }
    }
  }
  return validateWithSchema<TrusteeTenure>(value, trusteeTenureValidator, errors);
}

export function validateAuthorityEvent(value: unknown): ValidationResult<AuthorityEvent> {
  const errors: ValidationError[] = [];
  if (value && typeof value === 'object') {
    const item = value as Partial<AuthorityEvent>;
    requireOffset(item.effective_at, '$.effective_at', errors);
    requireOffset(item.recorded_at, '$.recorded_at', errors);
  }
  return validateWithSchema<AuthorityEvent>(value, authorityEventValidator, errors);
}

export function validateCertificateReadyPacket(value: unknown): ValidationResult<CertificateReadyPacket> {
  const errors: ValidationError[] = [];
  if (value && typeof value === 'object') {
    const item = value as Partial<CertificateReadyPacket>;
    requireOffset(item.prepared_at, '$.prepared_at', errors);
  }
  return validateWithSchema<CertificateReadyPacket>(value, certificateReadyPacketValidator, errors);
}
