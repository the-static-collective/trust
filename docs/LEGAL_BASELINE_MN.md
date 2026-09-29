# Minnesota Religious / Charitable Trust Record Baseline

This document defines a **record-preservation baseline for product design**. It is not a determination that a particular trust exists, has ecclesiastical status, is tax-exempt, or satisfies all execution/filing requirements.

## Governing boundary

**TRUST RECORD != TRUST CREATION.**

**RECORDED AUTHORITY != LEGAL AUTHORITY.**

**EXEMPTION CLAIM != EXEMPTION ESTABLISHED.**

Trust uses Minnesota's charitable/religious trust rules as a floor for the kinds of records the software should be able to preserve.

## Religious / charitable purpose

Minnesota includes religious purposes within charitable purposes. Product data should preserve stated purpose and governing instrument rather than infer special status from the word "ecclesiastical."

Primary sources:

- Minn. Stat. § 501B.35 — https://www.revisor.mn.gov/statutes/cite/501B.35
- Minnesota Trust Code definitions — https://www.revisor.mn.gov/statutes/cite/501C/full

## Creation records

The protocol can preserve:

- governing instrument / declaration;
- instrument date;
- settlor identity where applicable;
- stated purpose;
- identifiable initial property;
- transfer/declaration carrier;
- trustee designation and duties;
- amendments/restatements and their ancestry.

Primary sources:

- Minn. Stat. § 501C.0401 — https://www.revisor.mn.gov/statutes/cite/501C.0401
- Minn. Stat. § 501C.0402 — https://www.revisor.mn.gov/statutes/cite/501C.0402
- Minn. Stat. § 501C.0404 — https://www.revisor.mn.gov/statutes/cite/501C.0404

## Trustee acceptance

Trustee tenure records preserve designation, acceptance status/method, acceptance carrier references, powers, limitations, and tenure dates.

Primary source:

- Minn. Stat. § 501C.0701 — https://www.revisor.mn.gov/statutes/cite/501C.0701

## Adequate records + property separation

The protocol makes asset ownership state, custody location, ownership/title carriers, restrictions, acquisitions/dispositions, receipts, expenditures, distributions, transfers, reimbursements, and reconciliations addressable.

A user's categorization cannot silently promote personal property into trust property.

Primary source:

- Minn. Stat. § 501C.0810 — https://www.revisor.mn.gov/statutes/cite/501C.0810

## Loyalty / conflicts

ConflictDisclosure preserves related parties, action/transaction reference, disclosure carrier, recusal state, approvals/consents/court-order references, and time.

The record does not issue a loyalty verdict.

Primary source:

- Minn. Stat. § 501C.0802 — https://www.revisor.mn.gov/statutes/cite/501C.0802

## Information / reporting

DisclosureEvent can preserve a request, requester/audience, material furnished, timestamps, waiver/governing-instrument basis, and furnishing carrier.

Primary source:

- Minn. Stat. § 501C.0813 — https://www.revisor.mn.gov/statutes/cite/501C.0813

## Certificate-ready identity

The draft packet can preserve trust name, instrument date, trustees, addresses, powers/limitations, number of trustees required to act, and termination/revocation state.

Its mandatory authority boundary is `draft_data_only`.

Primary source:

- Minn. Stat. § 501C.1013 — https://www.revisor.mn.gov/statutes/cite/501C.1013

## Charitable-trust registration / claimed exemption

CompliancePosition preserves obligation type, jurisdiction, claimed status, authority sources, factual basis, filed carriers, acknowledgments, effective window, and supersession.

It can record `claimed_exempt`; it cannot state `legally_exempt` as an automated verdict.

Primary sources:

- Minn. Stat. § 501B.36 — https://www.revisor.mn.gov/statutes/cite/501B.36
- Minnesota Attorney General charitable organizations/trusts information — https://www.ag.state.mn.us/charity/InfoCharitableorgandTrusts.asp

## Product bar

Genesis meets the record-model bar when the public synthetic fixture can represent the categories above while every authority/exemption conclusion remains attributed, descriptive, and reversible through explicit descendant records.
