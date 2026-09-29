# Trust

**Trust** is a public, child-first, local-first life and stewardship instrument.

The ordinary front door is a beautiful family scrapbook: capture a Moment, remember what happened, preserve a child's words, and compose a life history. Underneath that surface, Trust preserves provenance so the same history can later support stewardship, trust administration, parallel-perspective review, and narrow evidence exports without those uses becoming each other.

> **Capture life once. Preserve what happened to the record. Let memory, stewardship, disagreement, and evidence compose from the same history without becoming each other.**

## Genesis

Trust 0.1.0 is proving one public loop:

```text
public protocol
→ synthetic child-first Moment
→ Minnesota trust record baseline
→ native mobile validation/render
→ CI
```

The current mobile shell deliberately uses synthetic data. Native camera/audio/document capture and the encrypted local vault are Crossing 2.

## Core laws

- `MOMENT != CLAIM != MEMORY != EVIDENCE != TRUST ENTRY`
- `CHILD != EVIDENCE OBJECT`
- `CAPTURE != INTERPRETATION`
- `PLANNED != OCCURRED`
- `DIRECT STATEMENT != ADULT PARAPHRASE`
- `DIVERGENT ACCOUNTS MAY COEXIST; DIFFERENCE != VERDICT`
- `TRUST RECORD != TRUST CREATION`
- `RECORDED AUTHORITY != LEGAL AUTHORITY`
- `EXEMPTION CLAIM != EXEMPTION ESTABLISHED`
- `PUBLIC PROTOCOL != PRIVATE WITNESS CORPUS`

## Public/private membrane

Trust descends from Black Star's generic provenance ideas. It does **not** publish Black Star's private source graph, case material, private source identifiers, or raw witness corpus. Every public fixture is synthetic.

Run the membrane check:

```bash
npm run public-boundary
```

## Development

Requirements: Node.js 22.13 or newer.

```bash
npm install
npm test --workspace @trust/protocol
npm run typecheck --workspace @trust/protocol
npm test --workspace @trust/mobile
npm run typecheck --workspace @trust/mobile
npm run docs:check
npm run public-boundary
```

Mobile Android bundle smoke:

```bash
npm run export:android --workspace @trust/mobile
```

## What Trust does not claim

Recording a trust, trustee, authority basis, filing, or exemption position does not make it legally valid. Trust preserves what was recorded, signed, transferred, decided, filed, or acknowledged and keeps the underlying carrier relationships available.

See [Trust boundary](docs/TRUST_BOUNDARY.md) and [Minnesota legal baseline](docs/LEGAL_BASELINE_MN.md).

## Roadmap

See [ROADMAP.md](docs/ROADMAP.md). The seven crossings move from the public protocol through native capture, life graph, scrapbook, trust ledger, shared reality, and export doors.
