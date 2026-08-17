# GULOO Unit Economics & Pricing Data Model V1.0

Status: ACTIVE
Owner: Finance Owner
Governance Owner: YONGGUANG-AGENT
Version: 1.0
Effective date: 2026-08-17
Risk class: GREEN for model/documentation; live price changes remain YELLOW/RED per execution policy

## 1. Purpose

Define the minimum financial data contract required to evaluate whether a GULOO product, service or commercial offer creates economically sustainable value.

This contract standardizes:
- standard cost;
- selling price basis;
- gross margin;
- variable selling/fulfillment costs;
- contribution margin;
- price floor;
- ownership and approval boundaries.

The model is for analysis, planning, recommendation and governance. It does **not** grant authority to change live prices, issue discounts, commit commercial terms, make payments or alter accounting records.

## 2. Minimum record

| Field | Type | Required | Owner | Meaning |
|---|---|---:|---|---|
| `economics_id` | string | YES | Finance/Data | Immutable record ID for the economics snapshot/version. |
| `sku` | string | YES | Product/Data | Product/service identifier linked to Product Master. |
| `currency` | string | YES | Finance | Currency code, e.g. `TWD`. |
| `selling_price` | object | YES | Commercial + Finance | Current/reference price basis used for analysis; not a live mutation instruction. |
| `standard_cost` | object | YES | Finance | Approved standard unit cost snapshot. |
| `gross_margin` | object | YES | Finance | Price less standard cost, in amount and percentage. |
| `variable_costs` | array<object> | YES | Finance + Functional Owner | Costs that vary with a unit/order/channel. |
| `contribution_margin` | object | YES | Finance | Gross profit less modeled variable selling/fulfillment costs. |
| `price_floor` | object | YES | Finance | Minimum governed price threshold for the specified scope/scenario. |
| `owner` | object | YES | Governance | Accountable finance owner and business/commercial owner. |
| `effective_from` | date | YES | Finance | Start date for this version. |
| `effective_to` | date/null | YES | Finance | End date; null for current. |
| `updated_at` | datetime | YES | Governance | Last update timestamp. |
| `updated_by` | string | YES | Governance | Human/Agent identity making the governed change. |
| `source_refs` | array<object> | YES | Finance/Data | References to Product Master, ERP/accounting, channel or approved assumptions. |

## 3. Canonical object shape

```json
{
  "schema_version": "1.0",
  "economics_id": "UE-GULOO-EXAMPLE-001-20260817",
  "sku": "GULOO-EXAMPLE-001",
  "currency": "TWD",
  "selling_price": {
    "amount": 100,
    "price_type": "REFERENCE_LIST_PRICE",
    "channel": "DIRECT",
    "tax_inclusive": true,
    "source": "APPROVED_PRICE_REFERENCE"
  },
  "standard_cost": {
    "amount": 40,
    "effective_date": "2026-08-17",
    "source": "PRODUCT_MASTER_STANDARD_COST"
  },
  "gross_margin": {
    "amount": 60,
    "pct": 0.60
  },
  "variable_costs": [
    {
      "cost_type": "PAYMENT_FEE",
      "amount": 3,
      "basis": "PER_UNIT_EQUIVALENT",
      "source": "MODELED_ASSUMPTION"
    },
    {
      "cost_type": "FULFILLMENT",
      "amount": 7,
      "basis": "PER_UNIT_EQUIVALENT",
      "source": "MODELED_ASSUMPTION"
    }
  ],
  "contribution_margin": {
    "amount": 50,
    "pct": 0.50
  },
  "price_floor": {
    "amount": 55,
    "floor_type": "CONTRIBUTION_PROTECTED",
    "scope": "DIRECT_CHANNEL",
    "approval_required_below_floor": true,
    "rationale": "Protect minimum required contribution after modeled variable costs"
  },
  "owner": {
    "accountable_role": "FINANCE_OWNER",
    "commercial_owner": "COMMERCIAL_OWNER",
    "data_steward_role": "FINANCE_DATA_STEWARD"
  },
  "effective_from": "2026-08-17",
  "effective_to": null,
  "updated_at": "2026-08-17T21:04:00+08:00",
  "updated_by": "YONGGUANG-AGENT",
  "source_refs": []
}
```

## 4. Core formulas

Let:
- `P` = selling price amount used for analysis;
- `SC` = standard unit cost;
- `VC` = sum of modeled variable selling/fulfillment costs;
- `GM` = gross margin amount;
- `CM` = contribution margin amount.

### Gross margin

`GM = P - SC`

`gross_margin_pct = GM / P` when `P > 0`.

### Contribution margin

`CM = P - SC - VC`

`contribution_margin_pct = CM / P` when `P > 0`.

Gross margin is **not** contribution margin. Payment fees, marketplace commissions, variable delivery/packaging, sales commissions, per-order service costs and other unit-variable costs can materially reduce economic value after gross profit.

## 5. Standard cost contract

Standard cost must:
- be numeric and >= 0;
- use the same currency or an explicitly governed conversion basis;
- carry an effective date;
- reference an approved source;
- align with the Product Master standard-cost snapshot or explain the approved analytical adjustment.

Standard cost should represent the governed planning/accounting cost basis appropriate to the business model. It must not silently mix invoice cost, cash payment timing, sunk cost and fully allocated overhead into one ambiguous number.

## 6. Selling price contract

`sellling_price` / `selling_price` in this contract is a reference basis for analysis.

Required subfields:
- `amount`;
- `price_type`;
- `channel`;
- `tax_inclusive`;
- `source`.

Recommended `price_type` values:
- `REFERENCE_LIST_PRICE`;
- `CURRENT_APPROVED_PRICE`;
- `CONTRACT_PRICE`;
- `PROMOTIONAL_SCENARIO`;
- `MODELED_PRICE`.

Rules:
- A modeled price must never be presented as a live approved price.
- Contract/customer-specific prices require a source reference and applicable approval state.
- Tax treatment must be explicit before margin calculations are compared across channels.

## 7. Variable cost taxonomy

Typical variable costs may include:
- payment processing fee;
- marketplace/platform commission;
- incremental pick/pack cost;
- variable packaging;
- variable delivery/logistics subsidy;
- affiliate/sales commission;
- per-order customer-service cost where meaningfully measurable;
- channel-specific fulfillment cost;
- promotion/coupon funding borne by GULOO.

Each cost line must include:
- `cost_type`;
- `amount` or formula reference;
- `basis`;
- `source`.

Do not include fixed overhead here merely to force contribution margin to equal operating profit. Fixed overhead and full P&L allocation belong to a later profitability layer.

## 8. Price floor contract

Price floor is a **governed threshold**, not an autonomous pricing instruction.

Minimum subfields:
- `amount`;
- `floor_type`;
- `scope`;
- `approval_required_below_floor`;
- `rationale`.

Recommended floor types:
- `STANDARD_COST_PROTECTED` — price cannot fall below standard cost without exceptional approval;
- `GROSS_MARGIN_PROTECTED` — minimum gross margin threshold;
- `CONTRIBUTION_PROTECTED` — minimum contribution threshold after variable costs;
- `CONTRACTUAL` — imposed by an approved commercial/legal arrangement;
- `STRATEGIC_EXCEPTION` — temporary governed exception with explicit owner and expiry.

Rules:
- Floor must specify whether tax is included/excluded.
- Floor must specify channel/customer scope.
- Floor amount must be >= 0.
- A price below floor must not be auto-published or auto-committed.
- Any below-floor exception requires an applicable approval record, reason, owner and expiry/validity scope.

## 9. Owner contract

Every ACTIVE economics record must have:
- `accountable_role`: Finance Owner accountable for model integrity;
- `commercial_owner`: business owner accountable for market/commercial context;
- `data_steward_role`: role maintaining data quality.

Responsibilities:
- Finance owns cost definitions, formulas, margin integrity and floor methodology.
- Commercial/Product provides market/channel/customer context.
- Product Master owns SKU identity and product standard-cost source relationship.
- YONGGUANG-AGENT may calculate, compare, flag and recommend within delegated authority, but may not self-authorize a live pricing change requiring approval.

## 10. Approval and risk boundary

### GREEN
Allowed automatically when reversible and internal:
- calculate unit economics;
- compare scenarios;
- flag products below threshold;
- generate pricing recommendations/drafts;
- identify missing data;
- update documentation/model contracts.

### YELLOW
Prepare review-ready result but stop before live effect:
- change public list price;
- modify live commerce pricing rule;
- activate promotion/discount logic;
- alter CRM pricing automation;
- publish a customer-facing offer.

### RED
Never execute automatically:
- commit binding commercial terms outside delegated authority;
- execute payments/refunds/financial transfers;
- alter bank/accounting credentials;
- issue legally binding contract pricing requiring authorized sign-off;
- override a governed price floor when classified as high-impact/financial approval.

## 11. Data quality states

Each economics record should be classified as:
- `COMPLETE` — all required values sourced and current;
- `ESTIMATED` — one or more approved assumptions are used;
- `STALE` — cost/price/source age exceeds policy threshold;
- `INCOMPLETE` — mandatory values missing;
- `CONFLICT` — multiple authoritative sources disagree.

AI Agents must not silently convert `ESTIMATED` or `INCOMPLETE` data into factual certainty.

## 12. Validation checklist

A unit-economics record is PASS only when all applicable checks pass:

- [ ] `economics_id` is unique and immutable.
- [ ] `sku` resolves to the Product Master.
- [ ] currency is present and consistent across compared amounts.
- [ ] selling price amount is numeric and >= 0.
- [ ] selling price type, channel, tax treatment and source are explicit.
- [ ] standard cost amount is numeric and >= 0.
- [ ] standard cost effective date and source are present.
- [ ] gross margin amount equals `P - SC` within allowed rounding tolerance.
- [ ] gross margin percentage equals `GM / P` when `P > 0`.
- [ ] every variable cost has type, amount/formula basis and source.
- [ ] contribution margin amount equals `P - SC - VC` within allowed rounding tolerance.
- [ ] contribution margin percentage equals `CM / P` when `P > 0`.
- [ ] price floor amount is numeric and >= 0.
- [ ] price floor scope, type, rationale and approval rule are explicit.
- [ ] below-floor scenario is flagged and cannot be mistaken for approved live price.
- [ ] accountable finance owner is assigned.
- [ ] commercial owner is assigned where applicable.
- [ ] data steward is assigned.
- [ ] effective dates and update identity are present.
- [ ] source references identify canonical systems/documents.
- [ ] no secret, bank credential, payment credential or unnecessary personal data is stored.
- [ ] live pricing mutation authority is not embedded in this model.

## 13. Chairman minimum view

For each material SKU/offer, the Chairman view should be able to surface:

| Indicator | Meaning |
|---|---|
| Reference price | Price basis used for current analysis |
| Standard cost | Governed unit cost |
| Gross margin % | Product margin before variable selling/fulfillment cost |
| Contribution margin % | Economic contribution after modeled variable costs |
| Price floor | Lowest governed threshold for stated scope |
| Gap to floor | `selling_price - price_floor` |
| Data quality | COMPLETE / ESTIMATED / STALE / INCOMPLETE / CONFLICT |
| Owner | Finance + commercial accountability |
| Exception | Any below-floor, negative contribution or stale-cost warning |

Chairman default view should prioritize red-light exceptions rather than exposing every formula line.

## 14. Source-of-truth boundaries

- Product Master remains authoritative for SKU identity and its governed standard-cost reference.
- ERP/accounting systems remain authoritative for accounting entries and actual transaction history.
- Commerce/channel systems remain authoritative for live channel configuration once approved and deployed.
- This economics model is the canonical cross-functional analytical contract for unit economics and pricing governance.

## 15. AI Agent contract

An Agent using this model must:
1. bind every calculation to a SKU, currency, channel and time-effective source;
2. distinguish actual/source values from modeled assumptions;
3. show gross margin and contribution margin separately;
4. flag negative contribution margin, below-floor price and stale/incomplete sources;
5. never fabricate missing costs or prices;
6. never treat a recommendation as an approved live price;
7. route any live pricing mutation through applicable approval/runtime governance;
8. preserve calculation inputs, output and evidence references for audit.

## 16. Definition of Done verification

BF-006 requires standard cost, gross margin, contribution margin, price floor and owner fields documented.

This V1.0 contract defines all required fields, calculation rules, source boundaries, ownership, price-floor governance, validation checks and the distinction between analysis authority and live pricing authority.

**BF-006 model result: PASS.**
