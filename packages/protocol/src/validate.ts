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
import type { Moment, ValidationError, ValidationResult } from './types.js';

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
]) {
  ajv.addSchema(schema);
}

const momentValidator = ajv.getSchema('https://trust.static/schemas/moment.schema.json');
if (!momentValidator) throw new Error('Moment schema failed to register');

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
