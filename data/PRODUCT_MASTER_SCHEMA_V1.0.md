# GULOO Product Master Schema V1.0

Status: ACTIVE
Owner: Product/Data Owner
Governance Owner: YONGGUANG-AGENT
Scope: Minimum AI-native product master contract for GULOO
Version: 1.0
Effective date: 2026-08-17

## 1. Purpose

Create one minimum, versioned product data contract that can be understood consistently by people, AI Agents, ERP, commerce, inventory and future supply-chain systems.

This schema separates:
- **Master data**: relatively stable product identity and governance fields;
- **Reference data**: mappings to external/internal systems;
- **Operational snapshots**: live stock and safety stock used for current decision support;
- **BOM relationships**: ingredients/components required to produce or assemble a sellable item.

The product master is the canonical identity layer. It must not become a duplicate transaction ledger.

## 2. Required minimum fields

| Field | Type | Required | Owner | Meaning / rule |
|---|---|---:|---|---|
| `sku` | string | YES | Product/Data Owner | Stable internal product identifier. Unique, immutable after activation except governed migration. |
| `name` | string | YES | Product Owner | Official product name used internally. Must be human-readable and non-empty. |
| `spec` | object | YES | Product Owner | Sellable/operational specification, including quantity, unit and optional pack configuration. |
| `bom` | array<object> | YES | Product + Supply Chain | Bill of materials. May be empty only for a non-manufactured/non-assembled item with documented reason. |
| `standard_cost` | object | YES | Finance Owner | Governed standard cost snapshot with currency, amount, effective date and source. |
| `live_stock` | object | YES | Inventory Owner | Current stock snapshot/reference, with quantity, unit, as-of timestamp and source system. |
| `safety_stock` | object | YES | Inventory/Supply Chain Owner | Minimum target buffer with quantity, unit and policy owner. |
| `quickin_sku` | string/null | YES | Commerce/System Owner | Quickin SKU mapping. Null allowed only when channel mapping is not applicable or not yet activated, with status recorded. |
| `allergens` | array<string> | YES | Food Safety/Product Owner | Declared allergen codes/names. Empty array means explicitly reviewed and none declared; null is not allowed. |
| `owner` | object | YES | Governance | Accountable business owner plus steward/contact role for data maintenance. |

## 3. Recommended governance fields

These fields are not part of the original BF-004 minimum list, but are required to make the minimum schema operable and auditable.

| Field | Type | Required | Purpose |
|---|---|---:|---|
| `schema_version` | string | YES | Declares the contract version, initially `1.0`. |
| `status` | enum | YES | `DRAFT`, `ACTIVE`, `INACTIVE`, `DISCONTINUED`. |
| `product_type` | enum/string | YES | Distinguishes finished goods, raw material, packaging, service, bundle, semi-finished item, etc. |
| `base_uom` | string | YES | Canonical unit of measure used for inventory and conversions. |
| `effective_from` | date | YES | Date this product-master version becomes valid. |
| `effective_to` | date/null | YES | Null for current version; populated when superseded/retired. |
| `updated_at` | datetime | YES | Last master-data update timestamp. |
| `updated_by` | string | YES | Human or Agent identity responsible for the change. |
| `source_refs` | array<object> | YES | References to ERP, Quickin, documents or source systems; avoids duplicating source-of-truth data. |

## 4. Canonical object shape

```json
{
  "schema_version": "1.0",
  "sku": "GULOO-EXAMPLE-001",
  "name": "Example Product",
  "status": "DRAFT",
  "product_type": "FINISHED_GOOD",
  "base_uom": "EA",
  "spec": {
    "quantity": 1,
    "unit": "EA",
    "net_weight": null,
    "net_weight_unit": null,
    "pack_config": null
  },
  "bom": [
    {
      "component_sku": "RAW-EXAMPLE-001",
      "quantity": 0.1,
      "unit": "KG",
      "yield_loss_pct": 0,
      "effective_from": "2026-08-17",
      "effective_to": null
    }
  ],
  "standard_cost": {
    "amount": 0,
    "currency": "TWD",
    "effective_date": "2026-08-17",
    "source": "FINANCE_STANDARD_COST"
  },
  "live_stock": {
    "quantity": 0,
    "unit": "EA",
    "as_of": "2026-08-17T00:00:00+08:00",
    "source_system": "ERP"
  },
  "safety_stock": {
    "quantity": 0,
    "unit": "EA",
    "policy_owner": "SUPPLY_CHAIN"
  },
  "quickin_sku": null,
  "quickin_mapping_status": "NOT_MAPPED",
  "allergens": [],
  "owner": {
    "accountable_role": "PRODUCT_OWNER",
    "data_steward_role": "PRODUCT_DATA_STEWARD"
  },
  "effective_from": "2026-08-17",
  "effective_to": null,
  "updated_at": "2026-08-17T00:00:00+08:00",
  "updated_by": "YONGGUANG-AGENT",
  "source_refs": []
}
```

## 5. Field rules

### 5.1 SKU
- Must be unique across the enterprise product namespace.
- Must not encode volatile facts such as price, current supplier, current location or current stock.
- Once `ACTIVE`, changing the SKU requires an explicit governed migration and mapping from old to new identifier.
- Human-friendly product classification may exist separately; identity must not depend on a fragile fixed-length code.

### 5.2 Name
- Must be the official internal product name.
- Channel display names may differ and should live in channel-specific presentation data.
- Name changes must not create a new SKU unless the underlying product identity materially changes.

### 5.3 Specification
At minimum:
- `quantity` > 0;
- `unit` present;
- weight/volume fields use explicit units when populated;
- pack configuration must be structured rather than hidden inside free text when operationally relevant.

### 5.4 BOM
Each BOM line must contain:
- `component_sku`;
- positive `quantity`;
- `unit`;
- effective-date range.

Rules:
- Component SKU must resolve to another governed item master record.
- BOM must not contain the parent SKU directly as its own component.
- Duplicate component lines for the same effective period should be consolidated unless a documented process reason exists.
- Yield loss, if used, must be >= 0 and expressed as a percentage.

### 5.5 Standard cost
- `amount` must be >= 0.
- Currency must use an explicit code such as `TWD`, `USD`, `JPY`.
- Cost must include an effective date and source.
- This field is a governed standard-cost snapshot, not an invoice ledger or bank record.
- Margin and price rules belong to the finance/pricing model, not this product identity schema.

### 5.6 Live stock
- Quantity may be zero or positive; negative values are allowed only if the source system intentionally supports negative inventory and the exception is flagged upstream.
- `as_of` timestamp and `source_system` are mandatory.
- Live stock is a snapshot/reference. The transaction ledger remains in the inventory/ERP source system.

### 5.7 Safety stock
- Quantity must be >= 0.
- Unit must be convertible to the product `base_uom`.
- Policy owner must be defined.
- A zero value means intentionally no buffer, not “unknown”. Unknown values must be treated as validation failures for an ACTIVE SKU.

### 5.8 Quickin mapping
- `quickin_sku` must be unique when populated.
- Mapping status must be one of: `MAPPED`, `NOT_MAPPED`, `NOT_APPLICABLE`, `PENDING_VERIFICATION`.
- An ACTIVE, Quickin-sellable SKU cannot be `NOT_MAPPED`.

### 5.9 Allergens
- Must always be an array.
- `[]` means explicitly reviewed with no declared allergens.
- `null` is invalid because it cannot distinguish “none” from “not reviewed”.
- Allergen vocabulary should later be normalized to the company food-safety reference taxonomy; free-text aliases should not become canonical codes.

### 5.10 Owner
Every ACTIVE SKU must have:
- one accountable business role;
- one data steward role or owner;
- a resolvable organizational identity outside this document.

AI Agents may maintain records under delegated authority, but accountability remains assigned to an approved business role.

## 6. Status gates

### DRAFT -> ACTIVE
Activation is allowed only when:
- all required fields are present;
- SKU uniqueness passes;
- specification validates;
- BOM is valid or documented as legitimately empty;
- standard cost is current and sourced;
- live stock has a valid source and timestamp;
- safety stock is explicitly set;
- Quickin mapping state is valid for channel applicability;
- allergen review is explicit;
- owner is assigned.

### ACTIVE -> INACTIVE / DISCONTINUED
Must retain historical identity and mappings. Do not delete the SKU merely because it is no longer sold.

## 7. Validation checklist

A record is **PASS** only when every applicable item below passes.

- [ ] `schema_version` equals a supported version.
- [ ] `sku` is present, normalized and globally unique.
- [ ] `name` is present and non-empty.
- [ ] `status` is a supported lifecycle state.
- [ ] `product_type` is present.
- [ ] `base_uom` is present.
- [ ] `spec.quantity` is numeric and > 0.
- [ ] `spec.unit` is present and compatible with the product definition.
- [ ] Every BOM component has a resolvable `component_sku`.
- [ ] Every BOM quantity is > 0 and has a unit.
- [ ] BOM contains no direct self-reference.
- [ ] BOM effective dates do not create unintended overlapping active definitions.
- [ ] `standard_cost.amount` is numeric and >= 0.
- [ ] `standard_cost.currency`, `effective_date` and `source` are present.
- [ ] `live_stock.quantity`, `unit`, `as_of` and `source_system` are present.
- [ ] `safety_stock.quantity` is numeric and >= 0.
- [ ] `safety_stock.unit` is compatible/convertible with `base_uom`.
- [ ] `quickin_mapping_status` is valid.
- [ ] `quickin_sku` is unique when populated.
- [ ] Quickin-sellable ACTIVE products are mapped.
- [ ] `allergens` is an array and never null.
- [ ] Allergen review is explicit before activation.
- [ ] `owner.accountable_role` is present.
- [ ] `owner.data_steward_role` is present.
- [ ] `effective_from`, `updated_at` and `updated_by` are present.
- [ ] `source_refs` identifies canonical source systems where applicable.
- [ ] No secret, credential, personal data or payment data is stored in the product master.

## 8. Minimum ownership model

| Domain | Accountable owner |
|---|---|
| Product identity/name/spec | Product Owner |
| BOM/material relationship | Product + Supply Chain |
| Standard cost | Finance Owner |
| Live stock | Inventory Owner / ERP source |
| Safety stock | Supply Chain / Inventory Owner |
| Quickin mapping | Commerce/System Owner |
| Allergens | Food Safety/Product Owner |
| Schema/governance | YONGGUANG-AGENT + approved Data Owner |

## 9. Source-of-truth rule

The Product Master is the canonical cross-system identity contract, but it must reference rather than duplicate authoritative operational ledgers.

Examples:
- ERP/inventory system remains authoritative for stock movements and transaction history.
- Finance system remains authoritative for accounting entries.
- Quickin remains authoritative for its platform-specific identifiers/configuration.
- Product Master stores the governed mapping and current approved snapshot needed for enterprise coordination.

## 10. AI Agent contract

An Agent consuming this schema must:
1. identify records by `sku`, not by ambiguous product name;
2. check `status` and effective dates before acting;
3. use source timestamps for stock-sensitive decisions;
4. treat missing allergens, owners, costs, safety stock or unresolved mappings as data-quality exceptions;
5. never infer missing mandatory values and write them as fact without an approved source;
6. preserve source references and audit identity for all governed mutations.

## 11. Definition of Done verification

BF-004 requires: SKU, name, spec, BOM, standard cost, live stock, safety stock, Quickin mapping, allergen and owner fields documented, plus a validation checklist.

This V1.0 contract explicitly defines all required fields, ownership, lifecycle gates, source-of-truth boundaries and validation checks.

**BF-004 schema result: PASS.**
