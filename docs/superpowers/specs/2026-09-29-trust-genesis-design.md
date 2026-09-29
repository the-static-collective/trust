# Trust Genesis — Public Child-First Life + Stewardship Instrument

**Status:** Design specification for the first public descendant of Black Star  
**Date:** 2026-09-29  
**Target repository:** `the-static-collective/trust`  
**Public/private boundary:** This repository is public. No private Black Star/WITNESS corpus, case material, source identifiers, or private ancestry may enter it.

## 1. Product thesis

Trust is a **mobile-native, local-first child-first life and stewardship instrument**.

Its ordinary user experience is a beautiful scrapbook / life-capture device. Underneath that surface, every capture is preserved with enough provenance to support later family history, stewardship accounting, trust administration, parallel-perspective review, and narrow evidence export without allowing those renderings to collapse into each other.

The central promise:

> **Capture life once. Preserve what happened to the record. Let memory, stewardship, disagreement, and evidence compose from the same history without becoming each other.**

Trust descends from Black Star's generic provenance laws. It does not publish or duplicate Black Star's private witness corpus.

## 2. Non-goals

Trust 0.x is **not**:

- a custody predictor;
- a parent-ranking or fitness-scoring system;
- an automated truth adjudicator;
- a legal-services product;
- a system that creates legal authority merely because a record exists;
- a tax-status or church-status determination engine;
- a cloud-first social network;
- an AI-first product;
- a replacement for governing instruments, signatures, notarization, filings, or professional advice where those are legally required.

## 3. Public inheritance from Black Star

The public protocol inherits these laws:

- `SOURCE != PROPOSITION`
- `PROPOSITION != ADMISSION`
- `RENDERING != AUTHORITY`
- `DISCOVERY ORDER != EVENT ORDER`
- `DOCUMENT COUNT != SOURCE COUNT`
- `POINTER != PAYLOAD`
- `TRANSCRIPTION != IMAGE`
- `CHILD != EVIDENCE OBJECT`
- `PLANNED != OCCURRED`
- `PRESENCE != PARTICIPATION`
- `DIRECT STATEMENT != ADULT PARAPHRASE`
- `DIVERGENT ACCOUNTS MAY COEXIST; DIFFERENCE != VERDICT`
- `NO RECORD != NOTHING HAPPENED`
- `MEMORY RENDERING != SOURCE`
- `CHILD-FACING OUTPUT != ADULT-CONFLICT DOSSIER`
- `PARENTING-RELEVANT != LEGALLY SIGNIFICANT`

Trust adds:

- `MOMENT != CLAIM != MEMORY != EVIDENCE != TRUST ENTRY`
- `CAPTURE != INTERPRETATION`
- `TRUST RECORD != TRUST CREATION`
- `RECORDED AUTHORITY != LEGAL AUTHORITY`
- `EXEMPTION CLAIM != EXEMPTION ESTABLISHED`
- `PUBLIC PROTOCOL != PRIVATE WITNESS CORPUS`

## 4. Core primitive: Moment

The public product centers on an addressable **Moment**.

A Moment is a piece of life, not a legal conclusion and not an evidentiary classification.

Minimum conceptual shape:

```text
Moment
├── id
├── event_window
├── capture_receipt
├── carriers[]
├── people[]
├── accounts[]
├── direct_statements[]
├── plans[]
├── memory_relations[]
├── trust_relations[]
├── privacy_policy
├── audience_policy
└── descendants[]
```

A Moment may later participate in scrapbook, family chronology, stewardship, trust-administration, accounting, child-future, or evidence renderings.

Those descendants may add interpretation. They may not mutate the original carrier or pretend their later interpretation existed at capture time.

## 5. Capture-before-narration contract

The mobile application must preserve the original carrier **before** asking the user what it means.

For a photo/video/audio/document capture:

1. receive or create original bytes;
2. copy them into the app-controlled local vault;
3. compute SHA-256 over the preserved original;
4. create a capture receipt containing source class, captured/imported time, size, hash, and local identity;
5. create or attach to a Moment;
6. only then invite observation, caption, quote, trust relation, or other interpretation.

Edits never overwrite originals. They become descendants.

## 6. Child-first contract

Child-facing memory is a rendering lane with a hard privacy membrane.

The protocol must be able to preserve:

- ordinary life before anyone knows what will later matter;
- observations separately from interpretations;
- direct child statements separately from adult paraphrase;
- plans separately from occurrences;
- multiple adult accounts without forced reconciliation;
- material intended for the child's future self;
- material withheld pending later review;
- adult-conflict material without exposing it to scrapbook/child-facing renderers.

The public protocol must reject automated fields or functions that rank:

- parents;
- parental fitness;
- custody suitability;
- truthfulness/credibility;
- "best parent";
- legal significance.

A perspective matrix may report `aligned`, `divergent`, or `single-perspective`. It must not choose a winner.

## 7. Ecclesiastical / religious charitable trust baseline — Minnesota

### 7.1 Product posture

Minnesota does not appear to define a special statutory trust form named an "ecclesiastical trust." For product purposes, Trust should model a **religious/charitable trust or religious association context** without asserting special legal status merely from a label.

Minnesota defines a charitable purpose to include religious purposes and defines a charitable trust as a fiduciary relationship concerning property held for a charitable purpose.

Primary sources:

- Minn. Stat. § 501B.35: https://www.revisor.mn.gov/statutes/cite/501B.35
- Minn. Stat. § 501C.0103: https://www.revisor.mn.gov/statutes/cite/501C/full

### 7.2 Trust formation support, without pretending the app creates the trust

Minnesota recognizes creation through transfer of property to a trustee, a declaration that identifiable property is held in trust, or exercise of a power of appointment. Creation also requires capacity, intent, a definite beneficiary or qualifying charitable trust, and trustee duties.

Trust therefore must be capable of preserving:

- governing instrument / declaration;
- instrument date;
- settlor identity where applicable;
- stated purpose;
- identifiable initial property;
- transfer/declaration carrier;
- trustee designation;
- trustee duties;
- amendments and descendants.

The app must not state that data entry itself created a valid trust.

Primary sources:

- Minn. Stat. § 501C.0401: https://www.revisor.mn.gov/statutes/cite/501C.0401
- Minn. Stat. § 501C.0402: https://www.revisor.mn.gov/statutes/cite/501C.0402
- Minn. Stat. § 501C.0404: https://www.revisor.mn.gov/statutes/cite/501C.0404

### 7.3 Trustee acceptance

Minnesota permits trustee acceptance by the method specified in the trust terms or, absent an exclusive method, through conduct such as accepting property, exercising powers, performing duties, or otherwise indicating acceptance.

Trust therefore needs an addressable `TrusteeTenure` / `AuthorityEvent` model capable of preserving:

- designation;
- acceptance method;
- acceptance carrier;
- effective date;
- rejection/resignation/removal/succession;
- powers and limitations;
- relation to the governing instrument.

Primary source:

- Minn. Stat. § 501C.0701: https://www.revisor.mn.gov/statutes/cite/501C.0701

### 7.4 Adequate records + separation of trust property

Minnesota requires a trustee to keep adequate records of trust administration and keep trust property separate from the trustee's own property.

This becomes a first-class product invariant.

Trust must support:

- asset identity;
- acquisition and disposition;
- title/ownership carriers;
- account or custody location;
- restriction/designation;
- receipts and expenditures;
- distributions;
- reimbursements;
- reconciliations;
- explicit trust-vs-personal property/account identity.

A transaction may not silently move from personal to trust ownership merely because a user categorizes it.

Primary source:

- Minn. Stat. § 501C.0810: https://www.revisor.mn.gov/statutes/cite/501C.0810

### 7.5 Loyalty + conflict records

Minnesota imposes a duty of loyalty and addresses transactions affected by conflicts between fiduciary and personal interests.

Trust should therefore preserve—not adjudicate:

- disclosed conflict;
- related party;
- transaction;
- authority basis;
- approval/consent/court-order carrier if applicable;
- recusal/nonparticipation;
- effective date;
- later ratification or challenge.

Primary source:

- Minn. Stat. § 501C.0802: https://www.revisor.mn.gov/statutes/cite/501C.0802

### 7.6 Information / reporting trail

For contexts where Minnesota's duty to inform and report applies, Trust should be able to prove what administrative information was furnished, requested, waived, or withheld, and when.

Model:

```text
DisclosureEvent
├── requested_at?
├── requester?
├── audience
├── material_refs[]
├── furnished_at?
├── waiver_ref?
├── governing_instrument_basis?
└── receipt
```

Primary source:

- Minn. Stat. § 501C.0813: https://www.revisor.mn.gov/statutes/cite/501C.0813

### 7.7 Certificate-ready identity card

Minnesota's certificate-of-trust statute provides a useful compact record target. Trust should preserve the inputs necessary to assemble a certificate-ready packet:

- trust name;
- trust instrument date;
- trustees empowered to act;
- trustee addresses;
- relevant powers and limitations;
- number of trustees required to act;
- termination/revocation state;
- amendments/revocations.

Trust may generate a **draft data packet**, but it must not imply that the in-app packet itself satisfies oath/notary/recording requirements.

Primary source:

- Minn. Stat. § 501C.1013: https://www.revisor.mn.gov/statutes/cite/501C.1013

### 7.8 Minnesota charitable-trust registration / exemption state

Minnesota charitable-trust registration/reporting rules generally apply at the statutory asset threshold unless an exemption applies. The statute includes exemptions for certain religious associations and certain trusts operated exclusively for religious purposes and administered by a qualifying religious association.

The Minnesota Attorney General currently advises organizations that believe they are exempt from charitable-trust registration to notify the office and submit the exemption form/supporting material.

Therefore the product must model:

```text
CompliancePosition
├── obligation_type
├── jurisdiction
├── claimed_status
├── authority_source
├── factual_basis
├── filed_carriers[]
├── acknowledgment_carriers[]
├── effective_window
└── superseded_by?
```

A UI may say **"exemption claimed"**, **"filing recorded"**, or **"acknowledgment preserved."** It must not silently translate those into **"legally exempt."**

Primary sources:

- Minn. Stat. § 501B.36: https://www.revisor.mn.gov/statutes/cite/501B.36
- Minnesota Attorney General, Charitable Organizations and Trusts: https://www.ag.state.mn.us/charity/InfoCharitableorgandTrusts.asp

## 8. Trust administration object model

The first public protocol should eventually support these object families:

```text
TrustProfile
TrustInstrument
TrusteeTenure
AuthorityEvent
TrustAsset
TrustRestriction
TrustTransaction
TrustDecision
ConflictDisclosure
DisclosureEvent
CompliancePosition
Moment
Carrier
CaptureReceipt
Account
DirectStatement
PrivacyPolicy
AudiencePolicy
RenderingReceipt
```

Every object must have stable identity and an append-only or descendant-oriented history model.

## 9. Rendering model

The same graph may produce different views without changing underlying records.

Initial rendering targets:

### Scrapbook
Beautiful child/family memory view. No adult-conflict layer access.

### Life chronology
Moment-oriented timeline with capture dates, event windows, people, and accounts.

### Trust ledger
Assets, transactions, decisions, authority, restrictions, conflicts, and compliance positions.

### Child-future archive
Material explicitly designated for future child access, with age/review policy left to future product work.

### Evidence/provenance packet
Narrow export showing original carrier identity, hash, capture receipt, accounts, relation birthdays, and descendant history.

### Certificate-ready packet
Trust identity / trustee-power inputs needed for later human/legal execution of a Minnesota certificate of trust.

**A renderer does not gain authority merely because it is printable.**

## 10. Mobile / local-first architecture

Recommended product architecture:

```text
apps/
  mobile/

packages/
  protocol/
  capture/
  vault/
  life-graph/
  scrapbook/
  trust-ledger/
  export/
  ui/

fixtures/
  synthetic/
```

Target application stack:

- React Native;
- Expo development builds;
- TypeScript;
- SQLite for structured local state;
- app-controlled filesystem for preserved original carriers;
- encryption at rest designed into the vault boundary;
- secure key storage through platform facilities;
- no mandatory cloud account for the first usable build.

The protocol package must remain runtime-neutral enough to validate outside React Native.

## 11. Public protocol extraction rule

Trust may inherit **generic laws and schemas** from Black Star.

It may not copy:

- private source registries;
- Drive IDs;
- names from WITNESS;
- case chronology;
- police material;
- private phone records;
- private snapshot prose;
- any other data whose presence in Git would reveal a private source graph.

All public examples must be synthetic.

The public repository begins its own Git ancestry.

## 12. First usable mobile slice

The first mobile release should prove one irreducible loop:

```text
Open app
→ capture/import photo or write note
→ original preserved locally
→ SHA-256 capture receipt
→ Moment created
→ add "what I saw"
→ optionally add exact/paraphrased child quote
→ choose:
     Just save
     Add to scrapbook
     Add trust relation
→ browse Moments
→ inspect provenance
→ export one self-contained Moment bundle
```

No cloud sync is required for this slice.

No AI is required for this slice.

No legal classification engine is permitted in this slice.

## 13. Roadmap

### Crossing 1 — Public Protocol Genesis
Deliver:

- Moment schema;
- Carrier + CaptureReceipt schema;
- Account / DirectStatement schema;
- privacy/audience primitives;
- trust-administration schema stubs;
- synthetic fixtures;
- conformance tests.

Success: a synthetic Moment validates identically in protocol tests and can be rendered without private Black Star dependencies.

### Crossing 2 — Native Capture
Deliver:

- camera/photo import;
- note capture;
- app-vault copy;
- SHA-256 receipt;
- immutable-original contract;
- Moment creation.

Success: capture happens before narration and survives application restart.

### Crossing 3 — Life Graph
Deliver:

- people;
- Moment relationships;
- plans vs occurrences;
- observer accounts;
- direct child statements;
- aligned/divergent perspective matrix.

Success: two adults can record differing values without one overwriting the other.

### Crossing 4 — Scrapbook
Deliver:

- timeline;
- Moment cards;
- albums;
- child pages;
- memory-safe captions;
- provenance affordance.

Success: normal use feels like a beautiful family-memory application, not evidence software.

### Crossing 5 — Trust Ledger
Deliver:

- TrustProfile;
- governing instruments;
- trustees / tenure;
- authority events;
- assets;
- restrictions;
- transactions;
- decisions;
- conflicts;
- disclosure events;
- compliance positions;
- certificate-ready data packet.

Success: the app preserves the minimum record classes needed to support Minnesota trust-administration recordkeeping without claiming legal validity.

### Crossing 6 — Shared Reality
Deliver:

- multi-device/person synchronization design;
- perspective ownership;
- non-destructive merge;
- shared Moment identity;
- disagreement visualization;
- privacy boundaries.

Success: sync preserves both accounts instead of converting disagreement into last-write-wins truth.

### Crossing 7 — Export Doors
Deliver:

- scrapbook export;
- child-future archive bundle;
- trust ledger export;
- accounting packet;
- provenance bundle;
- narrow evidence chronology;
- certificate-ready trust packet.

Success: each export declares its source graph, transformation, privacy policy, and authority boundary.

## 14. Genesis repository shape

After the design and implementation-plan gates, the first executable public tree should converge on:

```text
trust/
├── README.md
├── LICENSE
├── SECURITY.md
├── CONTRIBUTING.md
├── docs/
│   ├── ROADMAP.md
│   ├── ARCHITECTURE.md
│   ├── CHILD_FIRST.md
│   ├── TRUST_BOUNDARY.md
│   ├── PROVENANCE.md
│   └── LEGAL_BASELINE_MN.md
├── apps/
│   └── mobile/
├── packages/
│   ├── protocol/
│   ├── capture/
│   ├── vault/
│   ├── life-graph/
│   ├── scrapbook/
│   ├── trust-ledger/
│   ├── export/
│   └── ui/
└── fixtures/
    └── synthetic/
```

## 15. Genesis acceptance criteria

The first implementation plan must not call Genesis complete until:

1. the repository contains no private Black Star/WITNESS material;
2. public protocol schemas validate synthetic fixtures;
3. a minimal mobile app boots on the supported native development target;
4. the mobile app can render a synthetic Moment from the public protocol;
5. the capture design preserves original-before-interpretation ordering;
6. trust-administration schemas can represent the Minnesota baseline in Section 7;
7. no object or UI claims that a recorded trust/authority/exemption is legally established merely because Trust stores it;
8. CI exercises public protocol conformance;
9. the README clearly describes Trust as child-first/local-first and provenance-preserving;
10. the public/private membrane is documented and tested where mechanically possible.

## 16. Design decision

Use **Approach A: monorepo Genesis**.

Protocol and mobile shell begin together so the first public commit series proves the core thesis end-to-end:

```text
public schema
→ synthetic Moment
→ mobile renderer
```

The project should resist the temptation to build cloud sync, AI composition, full accounting, or legal export before that loop is stable.

---

## Legal-source note

This design uses current Minnesota primary sources to define a **record-preservation baseline**, not to assert that the app itself forms a valid trust, grants authority, establishes tax status, or proves an exemption. Legal status remains dependent on the governing instruments, facts, execution formalities, filings, and applicable law.
