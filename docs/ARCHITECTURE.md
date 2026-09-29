# Architecture

## Shape

Trust is an npm-workspaces monorepo with two executable Genesis surfaces:

```text
packages/protocol
    ↓
canonical synthetic fixtures
    ↓
apps/mobile
```

`@trust/protocol` is runtime-neutral source intended for bundler consumers. It contains durable JSON Schema plus TypeScript validators/types. The Expo application validates protocol data before rendering it.

## Core primitive

A **Moment** is an addressable piece of life.

```text
Moment
├── event window
├── carriers + capture receipts
├── accounts / observer assertions
├── direct statements
├── privacy + audience policy
└── extensions
```

A Moment is not automatically evidence, memory, or a trust entry. Those are later relations/renderings.

## Trust protocol

Genesis also models the record classes needed to preserve Minnesota trust administration context:

- TrustProfile
- TrustInstrument
- TrusteeTenure
- AuthorityEvent
- TrustAsset
- TrustTransaction
- TrustDecision
- ConflictDisclosure
- DisclosureEvent
- CompliancePosition
- CertificateReadyPacket

These objects preserve attributable state. They do not adjudicate legal validity.

## Future capture/vault boundary

Crossing 2 will introduce native capture and an encrypted local vault. The architectural order is already fixed:

```text
original bytes
→ app-controlled preserved copy
→ cryptographic receipt
→ Moment relation
→ human narration / interpretation
```

Edits create descendants; they do not mutate original carriers.

## Versioning

Trust software starts at 0.1.0. Protocol objects carry a protocol version separately from application release versions. Future schema migrations must be explicit and conformance-tested.

## Renderer separation

Scrapbook, life chronology, trust ledger, child-future archive, provenance/evidence packet, and certificate-ready draft packet are separate renderers over shared source relations.

**RENDERING != AUTHORITY.**
