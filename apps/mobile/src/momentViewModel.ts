import type { Moment } from '@trust/protocol';

export type PerspectiveValue = {
  observer: string;
  value: unknown;
};

export type MomentPerspective = {
  key: string;
  status: 'aligned' | 'divergent' | 'single-perspective';
  values: PerspectiveValue[];
};

export type MomentViewModel = {
  title: string;
  subtitle: string;
  memoryLines: string[];
  provenance: {
    carrierCount: number;
    captureReceiptCount: number;
    capturedAt?: string;
  };
  perspectives: MomentPerspective[];
};

function perspectiveStatus(values: PerspectiveValue[]): MomentPerspective['status'] {
  const observers = new Set(values.map((item) => item.observer));
  if (observers.size <= 1) return 'single-perspective';

  const uniqueValues = new Set(values.map((item) => JSON.stringify(item.value)));
  return uniqueValues.size === 1 ? 'aligned' : 'divergent';
}

export function toMomentViewModel(moment: Moment): MomentViewModel {
  const memoryLines: string[] = [];

  for (const account of moment.accounts) {
    if (
      account.memory_eligible &&
      !account.adult_conflict &&
      account.audiences.includes('scrapbook')
    ) {
      memoryLines.push(account.text);
    }
  }

  for (const statement of moment.direct_statements) {
    if (
      statement.memory_eligible &&
      !statement.adult_conflict &&
      statement.audiences.includes('scrapbook')
    ) {
      memoryLines.push(
        statement.quote_mode === 'exact'
          ? `“${statement.text}”`
          : statement.text,
      );
    }
  }

  const grouped = new Map<string, PerspectiveValue[]>();
  for (const account of moment.accounts) {
    for (const assertion of account.assertions ?? []) {
      const values = grouped.get(assertion.key) ?? [];
      values.push({ observer: account.author_ref, value: assertion.value });
      grouped.set(assertion.key, values);
    }
  }

  const perspectives = [...grouped.entries()]
    .map(([key, values]) => ({
      key,
      status: perspectiveStatus(values),
      values,
    }))
    .sort((a, b) => a.key.localeCompare(b.key));

  const firstCapturedAt = moment.carriers
    .map((carrier) => carrier.capture_receipt.captured_at)
    .find((value): value is string => Boolean(value));

  return {
    title: moment.title ?? 'Moment',
    subtitle: moment.event_window.start.slice(0, 10),
    memoryLines,
    provenance: {
      carrierCount: moment.carriers.length,
      captureReceiptCount: moment.carriers.filter(
        (carrier) => Boolean(carrier.capture_receipt),
      ).length,
      capturedAt: firstCapturedAt,
    },
    perspectives,
  };
}
