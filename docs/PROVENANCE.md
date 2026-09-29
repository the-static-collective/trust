# Provenance

Trust is capture-before-narration software.

## Capture order

For a future native carrier:

1. receive or create original bytes;
2. preserve them in the app-controlled local vault;
3. compute a cryptographic digest over the preserved original;
4. create a capture receipt;
5. create or attach the carrier to a Moment;
6. then invite observation, caption, quote, trust relation, or interpretation.

Genesis models this contract with synthetic carrier metadata; Crossing 2 implements device capture and storage.

## Separation

- **SOURCE != PROPOSITION**
- **CAPTURE != INTERPRETATION**
- **POINTER != PAYLOAD**
- **TRANSCRIPTION != IMAGE**
- **DISCOVERY ORDER != EVENT ORDER**
- **DOCUMENT COUNT != SOURCE COUNT**

A carrier has stable identity. A capture receipt records source class, timestamps, byte size, SHA-256, MIME type, capture method, and an opaque local vault reference.

## Descendants

An edited image, transcript, redaction, scrapbook caption, trust classification, or export is a descendant. It never overwrites the original carrier or backdates a later interpretation.

## Accounts

Observer accounts cite carrier references. The protocol checks that a recorded account cannot precede the import time of the carrier it claims to use.

## Extensions

Core objects reject unknown properties. Future/organization-specific data belongs under namespaced extension keys so new meaning cannot silently appear in the core grammar.
