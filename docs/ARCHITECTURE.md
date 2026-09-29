# Architecture

## One graph, multiple lawful renderings

Trust stores addressable life and stewardship records. A **Moment** is the central life primitive. It may connect to carriers, capture receipts, accounts, direct statements, people, memory relations, trust relations, privacy policies, and descendants.

```text
original carrier
      ↓
capture receipt
      ↓
Moment
 ├─ accounts / perspectives
 ├─ memory relations
 ├─ trust relations
 └─ descendants
      ↓
renderers
 scrapbook | chronology | trust ledger | provenance export
```

A renderer does not mutate its ancestors or gain authority merely because it is printable.

## Genesis packages

### `@trust/protocol`

Runtime-neutral public contract. JSON Schema Draft 2020-12 provides durable interchange definitions; TypeScript/Ajv provides the first executable validator.

The canonical synthetic examples are exported from `@trust/protocol/examples` so mobile code consumes the same fixture the protocol tests validate.

### `@trust/mobile`

Expo/React Native shell. Genesis renders a validated synthetic Moment and keeps memory, perspective divergence, and provenance visually separate.

## Future capture/vault boundary

Crossing 2 adds the app-controlled vault. Its contract is already fixed conceptually:

```text
bytes arrive
→ original copied to vault
→ SHA-256 computed
→ receipt persisted
→ Moment attached
→ narration begins
```

Edits become descendants. Original carriers are never overwritten.

## Versioning

Trust software begins at `0.1.0`. Protocol versions are explicit in serialized objects. Future schema evolution must not silently assign meaning to unknown core properties; extension data belongs under namespaced `extensions`.

## Storage posture

Genesis has no mandatory cloud account. The target architecture is local-first. Shared synchronization is a later crossing and must preserve multiple perspectives rather than convert disagreement into last-write-wins truth.
