# Minnesota Religious / Charitable Trust Record-Preservation Baseline

This document defines **record classes Trust should be able to preserve**. It is not legal advice and does not assert that using Trust creates a valid trust, grants fiduciary authority, establishes church status, or proves an exemption.

## Governing boundary

**TRUST RECORD != TRUST CREATION.**

**RECORDED AUTHORITY != LEGAL AUTHORITY.**

**EXEMPTION CLAIM != EXEMPTION ESTABLISHED.**

Minnesota law includes religious purposes within charitable purposes. Trust therefore models a religious/charitable trust context without treating the word "ecclesiastical" as a magic statutory status.

Primary sources:
- Minn. Stat. § 501B.35 — https://www.revisor.mn.gov/statutes/cite/501B.35
- Minnesota Trust Code, Chapter 501C — https://www.revisor.mn.gov/statutes/cite/501C/full

## Formation records

Minnesota recognizes trust creation methods including transfer of property to a trustee and declaration that identifiable property is held in trust. The product should preserve, where applicable:

- governing instrument/declaration;
- instrument date;
- settlor identity;
- stated purpose;
- identifiable initial property;
- transfer/declaration carrier;
- trustee designation and duties;
- amendments/restatements.

Sources:
- § 501C.0401 — https://www.revisor.mn.gov/statutes/cite/501C.0401
- § 501C.0402 — https://www.revisor.mn.gov/statutes/cite/501C.0402
- § 501C.0404 — https://www.revisor.mn.gov/statutes/cite/501C.0404

## Trustee acceptance

Preserve designation, recorded acceptance method/conduct, carrier references, effective dates, powers/limitations, and resignation/removal/succession history.

Source:
- § 501C.0701 — https://www.revisor.mn.gov/statutes/cite/501C.0701

## Adequate administration records and property separation

Minnesota requires adequate records of trust administration and separation of trust property from the trustee's own property. Trust should therefore represent:

- asset identity and ownership state;
- acquisition/disposition;
- title/ownership carriers;
- custody/account identity;
- restrictions/designations;
- contributions, expenditures, distributions, transfers, reimbursements;
- reconciliations;
- explicit trust-property versus personal-property state.

Categorizing something in the app does not transfer title.

Source:
- § 501C.0810 — https://www.revisor.mn.gov/statutes/cite/501C.0810

## Loyalty and conflicts

Preserve related-party/conflict disclosure, the affected action or transaction, recusal/nonparticipation, authority basis, approvals/consents/order carriers where present, effective date, and later ratification/challenge.

Source:
- § 501C.0802 — https://www.revisor.mn.gov/statutes/cite/501C.0802

## Information and reporting trail

Where applicable, preserve requests, requester/audience, furnished materials, furnished time, waiver carrier, and governing-instrument basis.

Source:
- § 501C.0813 — https://www.revisor.mn.gov/statutes/cite/501C.0813

## Certificate-ready data

The protocol preserves compact identity/authority inputs useful for a later Minnesota certificate-of-trust workflow: trust name, instrument date, acting trustees, addresses, powers/limitations, number required to act, and termination/revocation state.

The in-app object remains `draft_data_only`; execution/formality state requires its own carriers.

Source:
- § 501C.1013 — https://www.revisor.mn.gov/statutes/cite/501C.1013

## Charitable-trust registration and religious exemption position

Minnesota charitable-trust registration/reporting law includes religious exemptions in specified circumstances. The Attorney General provides current charitable-organization/trust guidance and an exemption-notification process.

Trust records this as a `CompliancePosition`: obligation type, jurisdiction, claimed status, authority source, factual basis, filing carriers, acknowledgment carriers, effective window, and supersession.

It never turns a recorded filing or claim into `legally_exempt=true`.

Sources:
- § 501B.36 — https://www.revisor.mn.gov/statutes/cite/501B.36
- Minnesota Attorney General — https://www.ag.state.mn.us/charity/InfoCharitableorgandTrusts.asp
