# Trust

**Trust** is a public, child-first, local-first life and stewardship instrument.

The ordinary front door is a beautiful family scrapbook: capture a Moment, preserve the original, write what you saw, keep exact or paraphrased statements distinct, and compose memories over time. Underneath that experience is a provenance protocol designed so the same life history can later support stewardship, trust administration, parallel perspectives, and narrow evidence exports without turning those renderings into one another.

> **Capture life once. Preserve what happened to the record. Let memory, stewardship, disagreement, and evidence compose from the same history without becoming each other.**

## Genesis status

Trust 0.1.0 currently proves:

```text
public protocol
→ synthetic child-first Moment
→ Minnesota religious/charitable trust record baseline
→ native Expo mobile rendering
→ public-boundary + protocol/mobile verification
```

The current mobile shell renders synthetic data only. Native camera/audio/video capture and the encrypted local vault are the next crossing, not hidden unfinished behavior in Genesis.

## Laws

- **MOMENT != CLAIM != MEMORY != EVIDENCE != TRUST ENTRY**
- **CHILD != EVIDENCE OBJECT**
- **CAPTURE != INTERPRETATION**
- **PLANNED != OCCURRED**
- **DIRECT STATEMENT != ADULT PARAPHRASE**
- **DIVERGENT ACCOUNTS MAY COEXIST; DIFFERENCE != VERDICT**
- **MEMORY RENDERING != SOURCE**
- **TRUST RECORD != TRUST CREATION**
- **RECORDED AUTHORITY != LEGAL AUTHORITY**
- **EXEMPTION CLAIM != EXEMPTION ESTABLISHED**
- **PUBLIC PROTOCOL != PRIVATE WITNESS CORPUS**

## Public/private membrane

Trust inherits generic provenance ideas from Black Star. It does not publish Black Star/WITNESS evidence, source IDs, case chronology, private carriers, or private ancestry. Every committed fixture is synthetic.

Run the membrane check:

```bash
npm run public-boundary
```

## Verify the protocol

```bash
npm test --workspace @trust/protocol
npm run typecheck --workspace @trust/protocol
```

## Verify the mobile shell

```bash
npm test --workspace @trust/mobile
npm run typecheck --workspace @trust/mobile
npm run export:android --workspace @trust/mobile
```

## Verify durable docs

```bash
npm run docs:check
```

## Architecture

The public protocol is the authority for core object shape. The Expo app imports `@trust/protocol` and the canonical synthetic fixture through `@trust/protocol/examples`; it does not define a second mobile-only Moment format.

Read:

- [Roadmap](docs/ROADMAP.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Child-first contract](docs/CHILD_FIRST.md)
- [Trust/legal boundary](docs/TRUST_BOUNDARY.md)
- [Provenance](docs/PROVENANCE.md)
- [Minnesota record baseline](docs/LEGAL_BASELINE_MN.md)

## Legal boundary

Trust preserves records. It does not itself create a trust, confer fiduciary authority, establish tax status, determine an exemption, or replace execution formalities, filings, governing instruments, or professional advice where required.
