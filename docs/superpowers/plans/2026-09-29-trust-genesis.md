# Trust Genesis Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship Trust's first public executable Genesis: a clean public protocol plus a minimal native Expo mobile shell that validates and renders a synthetic child-first Moment, while encoding the Minnesota religious/charitable trust record-preservation baseline without importing any private Black Star/WITNESS material.

**Architecture:** Use a small npm-workspaces monorepo. `packages/protocol` is the runtime-neutral public contract, with JSON Schema as the durable interchange format and TypeScript/Ajv as the first validator implementation. `apps/mobile` is an Expo SDK 57 / React Native 0.86 TypeScript app that consumes the public protocol and renders a synthetic Moment; native capture, SQLite/SQLCipher, cloud sync, AI, accounting, and legal exports remain later crossings.

**Tech Stack:** Node.js >=22.13, npm workspaces, TypeScript, JSON Schema Draft 2020-12, Ajv 8, Vitest, Expo SDK 57, React 19.2.3, React Native 0.86, GitHub Actions.

**Spec:** `docs/superpowers/specs/2026-09-29-trust-genesis-design.md`

## Global Constraints

- Repository is public; no private Black Star/WITNESS corpus, Drive IDs, case chronology, police material, phone records, private snapshot prose, or other private source graph may enter Git.
- Public examples and tests use synthetic data only.
- Trust software version begins at `0.1.0`; this is independent from Black Star's software/archive versions.
- Expo target is SDK 57 / React Native 0.86 / React 19.2.3; Node.js floor is `22.13.0`.
- Runtime-neutral protocol schemas use JSON Schema Draft 2020-12.
- The first mobile slice has no mandatory cloud account.
- Genesis does not implement AI composition, sync, camera/audio/video capture, accounting, legal classification, custody/fitness/truth scoring, or a legal-status determination engine.
- The mobile shell may render trust status but must use descriptive states such as `claimed`, `recorded`, `acknowledged`; it must not state that legal validity/exemption/authority is established merely because data exists.
- `MOMENT != CLAIM != MEMORY != EVIDENCE != TRUST ENTRY`.
- `CHILD != EVIDENCE OBJECT`.
- `TRUST RECORD != TRUST CREATION`.
- `RECORDED AUTHORITY != LEGAL AUTHORITY`.
- `EXEMPTION CLAIM != EXEMPTION ESTABLISHED`.
- `PUBLIC PROTOCOL != PRIVATE WITNESS CORPUS`.
- Use Apache-2.0 for Genesis unless the repository owner changes the license during plan review.

## Review Focus

1. **Unknown fields / schema evolution:** an unrecognized property must fail core-object validation rather than silently acquire meaning; each core schema instead exposes an optional `extensions` object for namespaced future data. Covered in Task 2 tests.
2. **Timestamp ambiguity:** timestamps that represent an instant must require RFC 3339 date-time with an explicit offset or `Z`; plain local datetimes must fail. Covered in Task 2 tests.
3. **Trust-status overclaim:** `CompliancePosition` and certificate-ready data must remain descriptive/draft and cannot express `legally_exempt=true` or equivalent. Covered in Task 4 tests.
4. **Private-source contamination:** CI must reject private-source URI forms and prohibited raw-evidence paths/media in the public tree while permitting generic documentation references to Black Star/WITNESS. Covered in Task 1/6 tests.
5. **Mobile/protocol drift:** the mobile application must import the workspace protocol package and render the canonical synthetic fixture after protocol validation, not duplicate a hand-written mobile-only model. Covered in Task 5 tests/build smoke.

---

## File Structure

Genesis creates only the packages needed to prove the first end-to-end loop; later roadmap packages are documented but not scaffolded empty.

```text
trust/
├── .github/workflows/ci.yml
├── .gitignore
├── .nvmrc
├── LICENSE
├── README.md
├── SECURITY.md
├── CONTRIBUTING.md
├── package.json
├── tsconfig.base.json
├── scripts/
│   ├── check-public-boundary.mjs
│   └── check-docs.mjs
├── docs/
│   ├── ROADMAP.md
│   ├── ARCHITECTURE.md
│   ├── CHILD_FIRST.md
│   ├── TRUST_BOUNDARY.md
│   ├── PROVENANCE.md
│   ├── LEGAL_BASELINE_MN.md
│   └── superpowers/
│       ├── specs/2026-09-29-trust-genesis-design.md
│       └── plans/2026-09-29-trust-genesis.md
├── packages/
│   └── protocol/
│       ├── package.json
│       ├── tsconfig.json
│       ├── src/
│       │   ├── index.ts
│       │   ├── validate.ts
│       │   └── types.ts
│       ├── schemas/
│       │   ├── common.schema.json
│       │   ├── capture-receipt.schema.json
│       │   ├── carrier.schema.json
│       │   ├── account.schema.json
│       │   ├── direct-statement.schema.json
│       │   ├── privacy-policy.schema.json
│       │   ├── audience-policy.schema.json
│       │   ├── moment.schema.json
│       │   ├── trust-profile.schema.json
│       │   ├── trust-instrument.schema.json
│       │   ├── trustee-tenure.schema.json
│       │   ├── authority-event.schema.json
│       │   ├── trust-asset.schema.json
│       │   ├── trust-transaction.schema.json
│       │   ├── trust-decision.schema.json
│       │   ├── conflict-disclosure.schema.json
│       │   ├── disclosure-event.schema.json
│       │   ├── compliance-position.schema.json
│       │   └── certificate-ready-packet.schema.json
│       └── test/
│           ├── moment.test.ts
│           ├── trust-baseline.test.ts
│           └── fixtures.test.ts
├── fixtures/
│   └── synthetic/
│       ├── moment-red-swing.json
│       ├── trust-minnesota-religious.json
│       ├── invalid/
│       │   ├── moment-local-time-without-offset.json
│       │   ├── moment-unknown-core-field.json
│       │   ├── compliance-legally-exempt-boolean.json
│       │   └── certificate-claims-validity.json
│       └── README.md
└── apps/
    └── mobile/
        ├── App.tsx
        ├── app.json
        ├── index.ts
        ├── package.json
        ├── tsconfig.json
        └── src/
            ├── momentViewModel.ts
            └── MomentCard.tsx
```

---

### Task 1: Public Repository Foundation + Boundary Gate

**Files:**
- Create: `package.json`
- Create: `.nvmrc`
- Create: `tsconfig.base.json`
- Create: `.gitignore`
- Create: `LICENSE`
- Create: `scripts/check-public-boundary.mjs`
- Create: `scripts/check-public-boundary.test.mjs`
- Create: `SECURITY.md`
- Create: `CONTRIBUTING.md`

**Interfaces:**
- Consumes: approved Genesis spec.
- Produces: npm workspace root; `npm run public-boundary`; Node floor; public-data membrane used by all later tasks.

- [ ] **Step 1: Write the failing boundary tests**

Use Node's built-in test runner in `scripts/check-public-boundary.test.mjs`.

Required assertions:

```js
test("accepts synthetic public fixture paths", ...)
test("rejects gdrive source refs", ...)
test("rejects raw evidence directories", ...)
test("rejects private carrier file extensions in tracked public fixtures", ...)
test("allows generic Black Star/WITNESS words in documentation", ...)
```

The prohibited path segments are exactly:

```text
sources/
evidence/
private/
witness-vault/
```

The prohibited tracked raw-carrier extensions are exactly:

```text
.jpg .jpeg .png .webp .mp4 .mov .m4a .wav .zip .sqlite .sqlite3 .db .xml
```

The checker rejects the string prefix `gdrive:` anywhere outside `docs/superpowers/specs/` and `docs/superpowers/plans/`; those design artifacts may discuss the syntax generically but must not contain actual private identifiers.

- [ ] **Step 2: Run the boundary test before implementation**

Run:

```bash
node --test scripts/check-public-boundary.test.mjs
```

Expected: FAIL because `check-public-boundary.mjs` does not exist.

- [ ] **Step 3: Implement the root workspace and `checkPublicBoundary(root: URL | string) -> Promise<BoundaryResult>`**

`package.json` decisions:

- `private: true`
- `version: "0.1.0"`
- `workspaces: ["packages/*", "apps/*"]`
- `engines.node: ">=22.13.0"`
- scripts:
  - `test:boundary`
  - `public-boundary`
  - later tasks add `test`, `typecheck`, `docs:check`.

`.nvmrc`: `22`.

`tsconfig.base.json`: strict TypeScript, ES2022 target, NodeNext module resolution for protocol packages.

`LICENSE`: Apache License 2.0.

The boundary checker returns:

```ts
type BoundaryResult = {
  ok: boolean;
  violations: Array<{ path: string; reason: string }>;
};
```

It scans tracked working-tree files supplied by `git ls-files`; the test module invokes the checker against temporary synthetic directories through an injectable file-list helper so tests do not depend on the live repository.

- [ ] **Step 4: Run boundary tests**

Run:

```bash
node --test scripts/check-public-boundary.test.mjs
```

Expected: PASS all 5 tests.

- [ ] **Step 5: Run the checker against the actual repository**

Run:

```bash
npm run public-boundary
```

Expected: PASS and zero violations.

- [ ] **Step 6: Commit**

```bash
git add package.json .nvmrc tsconfig.base.json .gitignore LICENSE SECURITY.md CONTRIBUTING.md scripts/
git commit -m "Genesis: establish public repository boundary"
```

---

### Task 2: Public Moment Protocol + Provenance Primitives

**Files:**
- Create: `packages/protocol/package.json`
- Create: `packages/protocol/tsconfig.json`
- Create: `packages/protocol/src/index.ts`
- Create: `packages/protocol/src/types.ts`
- Create: `packages/protocol/src/validate.ts`
- Create: `packages/protocol/src/examples.ts`
- Create: `packages/protocol/schemas/common.schema.json`
- Create: `packages/protocol/schemas/capture-receipt.schema.json`
- Create: `packages/protocol/schemas/carrier.schema.json`
- Create: `packages/protocol/schemas/account.schema.json`
- Create: `packages/protocol/schemas/direct-statement.schema.json`
- Create: `packages/protocol/schemas/privacy-policy.schema.json`
- Create: `packages/protocol/schemas/audience-policy.schema.json`
- Create: `packages/protocol/schemas/moment.schema.json`
- Create: `packages/protocol/test/moment.test.ts`
- Create: `fixtures/synthetic/moment-red-swing.json`
- Create: `fixtures/synthetic/invalid/moment-local-time-without-offset.json`
- Create: `fixtures/synthetic/invalid/moment-unknown-core-field.json`
- Modify: root `package.json`

**Interfaces:**
- Consumes: root npm workspace from Task 1.
- Produces:
  - `validateMoment(value: unknown): ValidationResult<Moment>`
  - `assertMoment(value: unknown): Moment`
  - exported `Moment`, `Carrier`, `CaptureReceipt`, `Account`, `DirectStatement`, `PrivacyPolicy`, `AudiencePolicy` types.
  - `@trust/protocol/examples` export containing `canonicalMomentFixture`, which is loaded from the single root synthetic fixture and consumed by Task 5; no mobile-only fixture copy.

- [ ] **Step 1: Write failing Moment protocol tests**

Required tests:

```ts
it("validates the canonical red-swing Moment")
it("preserves original-before-interpretation references")
it("rejects RFC3339 timestamps without offset/Z")
it("rejects unknown core properties")
it("allows namespaced data only under extensions")
it("allows divergent adult accounts without a verdict field")
it("rejects prohibited parent/custody/truth score keys anywhere in a Moment")
```

The canonical fixture must contain:

- `protocol_version: "0.1.0"`
- one photo-like **synthetic** carrier description, not an actual media file;
- one SHA-256-looking synthetic digest;
- a capture receipt preceding account timestamps;
- one observation;
- one exact child quote;
- two observer assertions that disagree about `pickup_time`;
- `memory_eligible` data;
- no adult-conflict content in scrapbook audience.

- [ ] **Step 2: Run tests before implementation**

Run:

```bash
npm test --workspace @trust/protocol -- moment.test.ts
```

Expected: FAIL because validators/schemas do not exist.

- [ ] **Step 3: Implement protocol schemas and TypeScript types**

Pinned decisions:

- JSON Schema Draft 2020-12.
- Core objects set `additionalProperties: false`.
- Every extensible core object may contain optional `extensions: object`; extension keys must contain at least one dot, e.g. `org.example.key`.
- Instant timestamps use `format: "date-time"` plus custom validator check requiring explicit `Z` or numeric offset.
- SHA-256 uses lowercase 64-hex pattern.
- Audience enum:
  - `private_archive`
  - `co_parent`
  - `professional`
  - `child_future`
  - `scrapbook`
  - `trust_admin`
- Capture modes:
  - `contemporaneous`
  - `near_contemporaneous`
  - `retrospective`
  - `imported_historical`
- Occurrence status:
  - `planned`
  - `observed`
  - `reported`
  - `unknown`
- Direct statement `quote_mode`: `exact | paraphrase`.
- A `CaptureReceipt` records:
  - `receipt_id`
  - `source_class`
  - `captured_at?`
  - `imported_at`
  - `size_bytes`
  - `sha256`
  - `mime_type`
  - `capture_method`
  - `vault_ref` as an opaque local identifier, never a filesystem path.
- `Carrier` records original/derived status and parent references.
- Prohibited recursive keys:
  - `parent_score`
  - `fitness_score`
  - `custody_score`
  - `truth_score`
  - `risk_score`
  - `credibility_score`
  - `best_parent`
  - `legal_significance_score`

`packages/protocol/package.json` decisions:

- `name: "@trust/protocol"`
- `version: "0.1.0"`
- `private: true` for Genesis; publication is a later release decision.
- `type: "module"`
- exports: `.` and `./examples`.
- runtime validator dependencies stay on Ajv 8 / ajv-formats 3 major lines; the lockfile fixes the exact install.

`src/examples.ts` exports `canonicalMomentFixture` by importing the single root fixture; tests assert that the exported value passes `validateMoment`.

`validateMoment` returns:

```ts
type ValidationResult<T> =
  | { ok: true; value: T }
  | { ok: false; errors: Array<{ path: string; message: string }> };
```

- [ ] **Step 4: Run Moment tests**

Run:

```bash
npm test --workspace @trust/protocol -- moment.test.ts
```

Expected: PASS all 7 tests.

- [ ] **Step 5: Type-check protocol**

Run:

```bash
npm run typecheck --workspace @trust/protocol
```

Expected: exit 0.

- [ ] **Step 6: Commit**

```bash
git add packages/protocol fixtures/synthetic/moment-red-swing.json fixtures/synthetic/invalid/moment-* package.json package-lock.json
git commit -m "Protocol: define public Moment and provenance primitives"
```

---

### Task 3: Minnesota Trust Identity + Authority Protocol

**Files:**
- Create: `packages/protocol/schemas/trust-profile.schema.json`
- Create: `packages/protocol/schemas/trust-instrument.schema.json`
- Create: `packages/protocol/schemas/trustee-tenure.schema.json`
- Create: `packages/protocol/schemas/authority-event.schema.json`
- Create: `packages/protocol/schemas/certificate-ready-packet.schema.json`
- Modify: `packages/protocol/src/types.ts`
- Modify: `packages/protocol/src/validate.ts`
- Modify: `packages/protocol/src/index.ts`
- Create: `packages/protocol/test/trust-identity.test.ts`

**Interfaces:**
- Consumes: Task 2 validation/type infrastructure.
- Produces:
  - `validateTrustProfile(value: unknown): ValidationResult<TrustProfile>`
  - `validateTrusteeTenure(value: unknown): ValidationResult<TrusteeTenure>`
  - `validateCertificateReadyPacket(value: unknown): ValidationResult<CertificateReadyPacket>`
  - types used by Task 4 and future trust-ledger work.

- [ ] **Step 1: Write failing trust identity/authority tests**

Required tests:

```ts
it("represents governing instrument date, purpose, law, and administration place")
it("requires trustee acceptance evidence to remain descriptive")
it("represents trustee powers and limitations without claiming legal authority")
it("represents number of trustees required to act")
it("marks certificate-ready packets draft-data-only")
it("rejects certificate packets that claim valid/notarized/executed status without execution carriers")
```

- [ ] **Step 2: Run tests before implementation**

Run:

```bash
npm test --workspace @trust/protocol -- trust-identity.test.ts
```

Expected: FAIL because trust identity schemas/validators do not exist.

- [ ] **Step 3: Implement identity/authority schemas**

Pinned fields:

`TrustProfile`:
- `trust_id`
- `legal_name`
- `instrument_refs[]`
- `instrument_date`
- `stated_purpose`
- `governing_law`
- `principal_place_of_administration`
- `trustee_tenure_refs[]`
- `status: active | terminated | revoked | unknown`
- `extensions?`

`TrustInstrument`:
- `instrument_id`
- `instrument_type: declaration | agreement | amendment | restatement | other`
- `carrier_refs[]`
- `effective_at?`
- `recorded_at`
- `supersedes[]`

`TrusteeTenure`:
- `tenure_id`
- `trustee_ref`
- `designation_ref`
- `acceptance_status: designated | accepted | declined | resigned | removed | ended | unknown`
- `acceptance_method?: instrument_method | accepted_property | exercised_power | performed_duty | other_recorded_conduct`
- `acceptance_carrier_refs[]`
- `starts_at?`
- `ends_at?`
- `powers[]`
- `limitations[]`

`AuthorityEvent`:
- `event_id`
- `actor_refs[]`
- `action_type`
- `authority_basis_refs[]`
- `approval_refs[]`
- `effective_at?`
- `recorded_at`
- `status: proposed | approved | executed | reversed | disputed | unknown`

`CertificateReadyPacket`:
- compact trust/trustee-power identity data matching the approved spec;
- mandatory `authority_boundary: "draft_data_only"`;
- optional execution carriers may be preserved, but no boolean named `valid`, `legally_valid`, `notarized`, or `official`.

- [ ] **Step 4: Run trust identity tests**

Run:

```bash
npm test --workspace @trust/protocol -- trust-identity.test.ts
```

Expected: PASS all 6 tests.

- [ ] **Step 5: Run all protocol tests + typecheck**

Run:

```bash
npm test --workspace @trust/protocol
npm run typecheck --workspace @trust/protocol
```

Expected: all pass / exit 0.

- [ ] **Step 6: Commit**

```bash
git add packages/protocol
git commit -m "Protocol: add Minnesota trust identity and authority records"
```

---

### Task 4: Minnesota Administration + Compliance Protocol

**Files:**
- Create: `packages/protocol/schemas/trust-asset.schema.json`
- Create: `packages/protocol/schemas/trust-transaction.schema.json`
- Create: `packages/protocol/schemas/trust-decision.schema.json`
- Create: `packages/protocol/schemas/conflict-disclosure.schema.json`
- Create: `packages/protocol/schemas/disclosure-event.schema.json`
- Create: `packages/protocol/schemas/compliance-position.schema.json`
- Modify: `packages/protocol/src/types.ts`
- Modify: `packages/protocol/src/validate.ts`
- Modify: `packages/protocol/src/index.ts`
- Create: `packages/protocol/test/trust-baseline.test.ts`
- Create: `fixtures/synthetic/trust-minnesota-religious.json`
- Create: `fixtures/synthetic/invalid/compliance-legally-exempt-boolean.json`
- Create: `fixtures/synthetic/invalid/certificate-claims-validity.json`

**Interfaces:**
- Consumes: Task 3 trust identity/authority types.
- Produces:
  - Minnesota baseline fixture;
  - validators/types for asset identity, separation, administration, conflicts, disclosures, and compliance-position receipts;
  - fixture consumed by docs and future trust-ledger implementation.

- [ ] **Step 1: Write failing Minnesota baseline tests**

Required tests:

```ts
it("represents trust property separately from personal custody")
it("requires asset ownership/title carrier references")
it("represents contribution, expenditure, distribution, transfer, and reimbursement records")
it("preserves conflict disclosure, recusal, and approval references without adjudicating loyalty")
it("represents requested/furnished disclosure events")
it("represents exemption as a claimed compliance position")
it("rejects legally_exempt booleans and equivalent legal-status verdict fields")
it("validates the canonical synthetic Minnesota religious-trust fixture")
```

- [ ] **Step 2: Run tests before implementation**

Run:

```bash
npm test --workspace @trust/protocol -- trust-baseline.test.ts
```

Expected: FAIL because administration/compliance schemas do not exist.

- [ ] **Step 3: Implement administration/compliance schemas**

Pinned semantics:

`TrustAsset` must distinguish:
- `ownership_state: trust_property | personal_property | third_party_property | disputed | unknown`
- `custody_ref`
- `ownership_carrier_refs[]`
- `restriction_refs[]`
- acquisition/disposition references.

No categorization may auto-promote `personal_property` to `trust_property`.

`TrustTransaction.type`:
- `contribution`
- `expenditure`
- `distribution`
- `transfer`
- `reimbursement`
- `other`

Money uses integer `amount_minor` plus three-letter uppercase `currency`; nonmonetary transfers use `nonmonetary_description` and omit money.

`ConflictDisclosure` records:
- related parties;
- transaction/action ref;
- disclosure carrier refs;
- recusal state;
- approval/consent/court-order refs if present;
- recorded/effective timestamps.

`DisclosureEvent` records:
- request timestamp/ref;
- requester/audience;
- material refs;
- furnished timestamp/ref;
- waiver ref;
- governing-instrument basis ref.

`CompliancePosition` records:
- `obligation_type`
- `jurisdiction`
- `claimed_status`
- `authority_source_refs[]`
- `factual_basis`
- `filed_carrier_refs[]`
- `acknowledgment_carrier_refs[]`
- `effective_from?`
- `effective_to?`
- `superseded_by?`
- mandatory `authority_boundary: "recorded_position_not_legal_determination"`.

Recursive verdict keys such as `legally_exempt`, `tax_exempt_established`, and `legal_authority_confirmed` are prohibited.

- [ ] **Step 4: Build the canonical synthetic Minnesota fixture**

The fixture must exercise:

- religious/charitable stated purpose;
- governing instrument + amendment;
- two trustee tenures;
- one recorded acceptance method;
- one trust asset with ownership carrier;
- one restricted contribution;
- one expenditure with receipt reference;
- one conflict disclosure with recusal;
- one disclosure event;
- one charitable-trust exemption **claim** with a synthetic filing/acknowledgment carrier;
- certificate-ready draft packet.

All IDs and source/carrier values must be visibly synthetic.

- [ ] **Step 5: Run protocol tests + public boundary**

Run:

```bash
npm test --workspace @trust/protocol
npm run typecheck --workspace @trust/protocol
npm run public-boundary
```

Expected: all pass / zero violations.

- [ ] **Step 6: Commit**

```bash
git add packages/protocol fixtures/synthetic
git commit -m "Protocol: encode Minnesota trust administration baseline"
```

---

### Task 5: Minimal Expo Native Shell — Protocol → Synthetic Moment → Screen

**Files:**
- Create: `apps/mobile/package.json`
- Create: `apps/mobile/app.json`
- Create: `apps/mobile/index.ts`
- Create: `apps/mobile/App.tsx`
- Create: `apps/mobile/tsconfig.json`
- Create: `apps/mobile/src/momentViewModel.ts`
- Create: `apps/mobile/src/MomentCard.tsx`
- Create: `apps/mobile/src/momentViewModel.test.ts`
- Modify: root `package.json`

**Interfaces:**
- Consumes:
  - `@trust/protocol` workspace package;
  - `@trust/protocol/examples`, backed by `fixtures/synthetic/moment-red-swing.json`.
- Produces:
  - `toMomentViewModel(moment: Moment): MomentViewModel`
  - minimal Expo app that validates the fixture through `@trust/protocol` before rendering;
  - Android JS/native export smoke command used by CI.

- [ ] **Step 1: Write failing mobile view-model tests**

Required assertions:

```ts
it("renders memory-facing text from a validated Moment")
it("shows capture provenance as metadata rather than narrative")
it("shows divergent pickup assertions without winner language")
it("never includes prohibited parent/custody/truth scoring labels")
```

The view model shape:

```ts
type MomentViewModel = {
  title: string;
  subtitle: string;
  memoryLines: string[];
  provenance: {
    carrierCount: number;
    captureReceiptCount: number;
    capturedAt?: string;
  };
  perspectives: Array<{
    key: string;
    status: "aligned" | "divergent" | "single-perspective";
    values: Array<{ observer: string; value: unknown }>;
  }>;
};
```

- [ ] **Step 2: Run tests before implementation**

Run:

```bash
npm test --workspace @trust/mobile -- momentViewModel.test.ts
```

Expected: FAIL because mobile package/view model does not exist.

- [ ] **Step 3: Scaffold the minimal Expo app**

Pinned runtime versions:

- `expo: ~57.0.0`
- `react: 19.2.3`
- `react-native: 0.86.0`

Use a single `App.tsx`, no router and no navigation dependency in Genesis.

The mobile package is named `@trust/mobile`, is `private: true`, and depends on `@trust/protocol: "*"` through npm workspaces.

No SQLite, camera, filesystem, SecureStore, crypto, cloud, or AI dependencies are added in this task. Those belong to Crossing 2.

- [ ] **Step 4: Implement fixture validation and rendering**

`App.tsx` must:

1. import `canonicalMomentFixture` from `@trust/protocol/examples`;
2. call `assertMoment` from `@trust/protocol`;
3. pass the validated value to `toMomentViewModel`;
4. render `MomentCard`;
5. visibly separate:
   - memory content;
   - perspective differences;
   - provenance metadata.

Use deliberately simple native styling; Genesis proves architecture, not final visual identity.

- [ ] **Step 5: Run mobile tests and typecheck**

Run:

```bash
npm test --workspace @trust/mobile
npm run typecheck --workspace @trust/mobile
```

Expected: all pass / exit 0.

- [ ] **Step 6: Run Expo bundle smoke**

Run:

```bash
npm exec --workspace @trust/mobile expo export -- --platform android --output-dir dist-smoke
```

Expected: exit 0 and an Android bundle/export produced.

Delete `dist-smoke` after verification; it is gitignored.

- [ ] **Step 7: Commit**

```bash
git add apps/mobile package.json package-lock.json
git commit -m "Mobile: render validated synthetic Moment"
```

---

### Task 6: Durable Product Docs + Roadmap Split

**Files:**
- Create: `README.md`
- Create: `docs/ROADMAP.md`
- Create: `docs/ARCHITECTURE.md`
- Create: `docs/CHILD_FIRST.md`
- Create: `docs/TRUST_BOUNDARY.md`
- Create: `docs/PROVENANCE.md`
- Create: `docs/LEGAL_BASELINE_MN.md`
- Create: `scripts/check-docs.mjs`
- Create: `scripts/check-docs.test.mjs`
- Modify: root `package.json`

**Interfaces:**
- Consumes: approved spec + implemented public interfaces from Tasks 1–5.
- Produces: public-facing docs whose commands/paths are mechanically checked; `npm run docs:check`.

- [ ] **Step 1: Write failing docs-check tests**

Required assertions:

```js
test("requires all durable Genesis docs")
test("rejects TODO/TBD/FIXME placeholders")
test("requires README to state child-first and local-first")
test("requires legal baseline to contain recorded-authority and exemption boundaries")
test("requires roadmap to list Crossings 1 through 7")
test("requires README commands to name existing package scripts")
```

- [ ] **Step 2: Run docs tests before implementation**

Run:

```bash
node --test scripts/check-docs.test.mjs
```

Expected: FAIL because durable docs do not exist.

- [ ] **Step 3: Write the durable docs**

Use the approved spec as authority; do not introduce new product scope.

`README.md`:
- one-paragraph thesis;
- "pretty scrapbook front door / provenance underneath" explanation;
- public/private membrane;
- current Genesis status;
- install/test/mobile smoke commands;
- explicit non-adjudication/legal-status boundary.

`ROADMAP.md`:
- exactly Crossings 1–7 from the approved spec;
- current marker: Crossing 1 Genesis;
- do not claim later crossings implemented.

`ARCHITECTURE.md`:
- public protocol → fixture → mobile renderer;
- future capture/vault boundary described but not implemented;
- versioning and renderer separation.

`CHILD_FIRST.md`:
- child-first laws;
- perspective coexistence;
- memory/adult-conflict membrane;
- prohibited scoring.

`TRUST_BOUNDARY.md`:
- `TRUST RECORD != TRUST CREATION`;
- descriptive trust-state semantics;
- no authority/exemption/legal-status promotion.

`PROVENANCE.md`:
- capture-before-narration contract;
- carrier/receipt/account/descendant separation;
- original mutation prohibition.

`LEGAL_BASELINE_MN.md`:
- Minnesota baseline from approved spec;
- preserve primary-source URLs;
- clearly label it as record-preservation baseline, not legal advice/status determination.

- [ ] **Step 4: Run docs checks**

Run:

```bash
node --test scripts/check-docs.test.mjs
npm run docs:check
```

Expected: all tests pass; checker reports all required docs and no placeholders.

- [ ] **Step 5: Run public boundary again**

Run:

```bash
npm run public-boundary
```

Expected: PASS zero violations.

- [ ] **Step 6: Commit**

```bash
git add README.md docs/*.md scripts/check-docs* package.json
git commit -m "Docs: publish Trust Genesis roadmap and boundaries"
```

---

### Task 7: CI + Genesis Acceptance Gate

**Files:**
- Create: `.github/workflows/ci.yml`
- Modify: root `package.json` only if a unified `verify` script is not already present.

**Interfaces:**
- Consumes: every test/check command from Tasks 1–6.
- Produces:
  - `npm run verify`
  - GitHub Actions required green path for protocol + public-boundary + mobile smoke.

- [ ] **Step 1: Add a failing root verification-contract test/script**

Root scripts must expose exactly:

```json
{
  "test": "...",
  "typecheck": "...",
  "public-boundary": "...",
  "docs:check": "...",
  "mobile:smoke": "...",
  "verify": "..."
}
```

`verify` must execute, in order:

1. public boundary;
2. docs check;
3. protocol/mobile tests;
4. protocol/mobile typechecks;
5. mobile Expo Android export smoke.

Write `scripts/verify-contract.test.mjs` to assert those script names exist and that `verify` invokes each required category.

- [ ] **Step 2: Run contract test before root script is complete**

Run:

```bash
node --test scripts/verify-contract.test.mjs
```

Expected: FAIL until the full `verify` contract exists.

- [ ] **Step 3: Implement root verify scripts**

Keep every sub-check separately runnable; `verify` composes them rather than hiding logic in CI YAML.

- [ ] **Step 4: Run the complete local verification**

Run:

```bash
npm ci
npm run verify
```

Expected:
- public boundary: PASS, 0 violations;
- docs check: PASS;
- all protocol/mobile/unit tests: PASS;
- both workspace typechecks: exit 0;
- Expo Android export smoke: exit 0.

- [ ] **Step 5: Add GitHub Actions CI**

`.github/workflows/ci.yml`:

- trigger: pull requests + pushes to `main`;
- `ubuntu-latest`;
- Node 22;
- `npm ci`;
- `npm run verify`;
- least-privilege `contents: read`;
- no secrets required.

- [ ] **Step 6: Verify workflow syntax through the committed branch**

Before PR/merge, push the implementation branch and confirm the GitHub Actions run reaches `npm run verify` successfully. Do not merge on local green alone.

- [ ] **Step 7: Re-read Genesis acceptance criteria from the spec**

Check each criterion explicitly:

1. no private Black Star/WITNESS material;
2. public schemas validate synthetic fixtures;
3. minimal mobile app bundles on native target;
4. mobile app renders canonical synthetic Moment through protocol;
5. capture-before-interpretation contract encoded;
6. Minnesota baseline representable;
7. legal-status overclaim rejected;
8. CI exercises conformance;
9. README child-first/local-first;
10. public/private membrane documented and mechanically guarded.

Any unmet criterion is a blocker.

- [ ] **Step 8: Commit**

```bash
git add .github/workflows/ci.yml package.json scripts/verify-contract.test.mjs
git commit -m "CI: gate Trust Genesis end to end"
```

---

## Final Whole-Branch Verification

After all seven tasks:

```bash
npm ci
npm run verify
git status --short
```

Expected:

- `npm ci`: exit 0;
- `npm run verify`: exit 0 with every sub-check green;
- `git status --short`: no unexpected generated files or raw carriers.

Then inspect the branch diff specifically for:

- private identifiers/source material;
- raw evidence/media accidentally tracked;
- legal-status claims stronger than the approved spec;
- mobile-only duplicated protocol definitions;
- empty future packages added before use;
- TODO/TBD/FIXME residue.

## Implementation Boundary After Genesis

Genesis stops after proving:

```text
public protocol
→ synthetic child-first Moment
→ Minnesota trust baseline
→ mobile validation/render
→ CI
```

The next separate spec/plan is **Crossing 2 — Native Capture + Encrypted Local Vault**, using Expo native development builds. At that point evaluate:

- `expo-file-system`;
- `expo-crypto`;
- `expo-sqlite` with SQLCipher;
- `expo-secure-store`;
- camera/document/share-sheet intake;
- crash-safe original-byte preservation before narrative entry.

Do not pull Crossing 2 dependencies into Genesis merely because they are on the roadmap.
