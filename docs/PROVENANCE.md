# Provenance

## Capture before narration

For captured/imported carriers, the target product order is:

1. receive original bytes;
2. preserve them in the app-controlled vault;
3. compute SHA-256;
4. persist a CaptureReceipt;
5. attach the carrier to a Moment;
6. invite observation, caption, quote, trust relation, or interpretation.

`CAPTURE != INTERPRETATION`.

## Carrier

A Carrier represents a source object or a descendant. It records whether it is original or derived and links derived material to its parent rather than replacing the parent.

## CaptureReceipt

A receipt preserves source class, capture/import time, byte size, hash, MIME type, capture method, and an opaque local vault identity. It proves properties of the stored record, not truth of everything depicted or asserted inside it.

## Account

An Account is attributable narration or observation. Its author, recorded time, source references, audience, and category remain separate from carrier identity.

## Descendants

Cropping, transcription, captioning, redaction, scrapbook composition, trust-ledger rendering, and evidence export are descendants. They retain ancestry and may add interpretation. They do not rewrite the original.

## Relation birthdays

A later relationship between old carriers is allowed to be new. The system should preserve when a relation was asserted or admitted rather than pretending an old carrier always had today's meaning.
