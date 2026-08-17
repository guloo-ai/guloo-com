# BF-003｜GULOO B2C + B2B2C Conversion Architecture V1.0

Status: REVIEW_READY
Owner: Revenue / Growth Owner
Governance Owner: YONGGUANG-AGENT
Risk: YELLOW
Effective date: 2026-08-17

## 1. Purpose

Define a review-ready conversion architecture for GULOO across B2C and B2B2C without changing live forms, production workflows, pricing, CRM automation, LINE OA configuration, DNS, or external customer data.

This artifact is a design contract only. Any public release, live form activation, CRM automation, outbound message, production integration, or customer-data mutation requires separate approval and governed execution.

## 2. Conversion principles

1. Start from human intent, not product catalog complexity.
2. Route visitors by life/use context before asking them to understand SKU structure.
3. Separate B2C self-service conversion from B2B2C consultative conversion.
4. Ask for the minimum data necessary at each step.
5. Never make AI appear to have approved pricing, availability, medical/health claims, or contract terms unless sourced and authorized.
6. Every CTA must have an observable next event and owner.
7. Every lead must have a source, consent state where applicable, lifecycle state, and next action.

## 3. Top-level funnel map

### 3.1 B2C funnel

**Discover -> Understand -> Choose context -> Explore solution -> Intent -> Checkout/Contact -> Fulfillment -> Relationship**

Suggested entry intents:
- 今日好好吃飯 / everyday nourishment;
- 送禮 / gifting;
- 家庭日常 / family care;
- 身心靈日常照顧 / life care;
- 品牌故事 / trust discovery.

Recommended journey:

1. Visitor lands on GULOO public page.
2. Visitor chooses context rather than raw SKU category.
3. System presents 1–3 relevant solution paths.
4. Visitor may view product/solution details.
5. Visitor chooses a transactional CTA or a low-friction inquiry CTA.
6. If commerce is available and approved, checkout occurs in the authorized commerce system.
7. Post-purchase lifecycle captures fulfillment status, service needs, opt-in relationship and learning signals.

### 3.2 B2B2C funnel

**Discover -> Qualify company/use case -> Define audience/volume -> Solution design -> Commercial review -> Approval -> Order/Contract -> Fulfillment -> Employee/customer relationship -> Renewal/expansion**

Primary use cases:
- 科技廠 / science park employee meal and care programs;
- corporate gifting;
- enterprise meal programs;
- event / meeting meal solutions;
- employee wellbeing / care programs;
- channel/co-brand partnerships;
- future supply-chain or institutional food programs.

Recommended journey:

1. Enterprise visitor selects a business intent.
2. Capture minimum qualification data.
3. Route to a solution track and business owner.
4. Prepare a non-binding solution summary.
5. Commercial pricing/terms are modeled using approved finance data.
6. Any binding offer, discount, contract, payment or external communication follows approval gates.
7. Won business creates governed fulfillment and account lifecycle records.
8. Measure renewal, expansion, employee/customer usage and service quality.

## 4. CTA hierarchy

### Tier 1 — Primary conversion CTAs

Use only when the next step is clear and operationally owned.

B2C examples:
- `依今天的需要找方案`
- `開始選擇`
- `查看適合我的日常方案`
- `前往購買` (only when live commerce is actually approved and available)

B2B2C examples:
- `企業合作需求`
- `取得企業方案`
- `規劃員工餐飲／送禮方案`
- `提交企業需求`

### Tier 2 — Trust / education CTAs

- `認識 GULOO`
- `閱讀品牌故事`
- `了解 Food × Care × Life × AI`
- `查看常見問題`

### Tier 3 — Relationship CTAs

Future, only after channel approval:
- `加入 LINE`
- `訂閱消息`
- `成為會員`
- `留下聯絡方式`

These must not be shown as functional conversion endpoints until the corresponding production channel and consent flow are approved.

## 5. CTA rules

Every CTA must define:
- `cta_id`;
- visible label;
- audience (`B2C`, `B2B2C`, `BOTH`);
- journey stage;
- destination/action;
- owner;
- event name;
- live readiness state;
- approval requirement.

Rules:
- Do not use vague CTAs such as `了解更多` when a specific user action can be named.
- Do not present `購買` if commerce is not operational.
- Do not present `立即諮詢` if no response owner/SLA exists.
- External message submission is not considered complete until receipt/queue ownership is verifiable.
- Price-sensitive CTAs must not imply an unapproved discount or guaranteed quote.
- Health/care-related CTAs must avoid unsupported medical claims.

## 6. Lead capture — B2C minimum

Collect only what is required for the stated purpose.

### Low-friction inquiry

Recommended fields:
- `lead_id` — generated internally;
- `intent` — gifting / daily / family / other;
- `contact_channel` — chosen by user;
- `contact_value` — only when user elects to provide it;
- `consent_state` — where required;
- `source`;
- `created_at`;
- `owner`;
- `status`.

Optional context:
- preferred date;
- estimated quantity;
- free-text note with clear minimization guidance.

Do not request birthday, address, health information, identity number, employer or other personal details unless required for a later, explicit service step.

## 7. Lead capture — B2B2C minimum

Recommended qualification fields:
- `lead_id`;
- `company_name`;
- `contact_name`;
- `business_email_or_phone`;
- `business_intent`;
- `estimated_people_or_quantity`;
- `target_date_or_frequency`;
- `location_or_service_area`;
- `budget_range` (optional; never required for initial contact);
- `source`;
- `consent_or_contact_basis` where applicable;
- `owner`;
- `status`;
- `next_action_at`.

Do not capture confidential procurement details, credentials, banking data, employee rosters or sensitive company information in a generic public form.

## 8. Lead lifecycle states

Canonical minimum states:
- `NEW`;
- `QUALIFYING`;
- `QUALIFIED`;
- `SOLUTION_DRAFT`;
- `WAITING_CUSTOMER`;
- `WAITING_INTERNAL_APPROVAL`;
- `PROPOSAL_READY`;
- `WON`;
- `LOST`;
- `NURTURE`;
- `DISQUALIFIED`.

Rules:
- `WON` must reference a verified commercial/order/contract source.
- `PROPOSAL_READY` is not the same as sent; outbound communication requires applicable authority.
- `WAITING_INTERNAL_APPROVAL` must be used when price/terms/legal/financial gates block progression.
- Every non-terminal lead must have an owner and next action or reason for waiting.

## 9. Event taxonomy

### Public web discovery events
- `page_view`
- `brand_story_view`
- `faq_view`
- `digital_identity_view`

### Intent events
- `intent_selected`
- `solution_path_viewed`
- `product_or_solution_viewed`
- `cta_clicked`

### B2C conversion events
- `b2c_inquiry_started`
- `b2c_inquiry_submitted`
- `checkout_started` — future/live only
- `purchase_completed` — authoritative commerce event only

### B2B2C conversion events
- `b2b_intent_selected`
- `b2b_lead_started`
- `b2b_lead_submitted`
- `b2b_lead_qualified`
- `solution_draft_created`
- `proposal_approved`
- `proposal_sent` — external communication event only
- `opportunity_won`
- `opportunity_lost`

### Relationship events
- `consent_granted`
- `consent_revoked`
- `support_requested`
- `repeat_purchase`
- `renewal_started`
- `renewal_completed`

## 10. Event payload minimum

Every conversion event should contain only the minimum needed:

```json
{
  "event_id": "EVT-EXAMPLE",
  "event_name": "cta_clicked",
  "occurred_at": "2026-08-17T22:10:00+08:00",
  "anonymous_or_customer_ref": "ANON-OR-GOVERNED-ID",
  "session_ref": "SESSION-REF",
  "journey": "B2C",
  "stage": "INTENT",
  "cta_id": "CTA-B2C-CONTEXT-001",
  "source_page": "/",
  "campaign_ref": null,
  "consent_state": "NOT_APPLICABLE",
  "owner": "REVENUE_ANALYTICS"
}
```

Do not put raw secrets, payment details, unnecessary PII, free-form health data or full message contents into analytics events.

## 11. Funnel KPIs

### B2C
- landing -> context selection rate;
- context -> solution/product view rate;
- solution view -> inquiry/checkout intent rate;
- inquiry start -> submit rate;
- checkout start -> purchase rate when commerce is live;
- repeat purchase rate;
- relationship opt-in rate.

### B2B2C
- landing -> enterprise intent rate;
- lead start -> submit rate;
- submitted -> qualified rate;
- qualified -> solution draft rate;
- solution -> approved proposal rate;
- approved proposal -> won rate;
- sales cycle duration;
- average opportunity value;
- renewal / expansion rate.

## 12. Ownership model

| Domain | Accountable owner |
|---|---|
| Website journey and CTA architecture | Revenue/Growth Owner |
| Brand language | Brand Owner |
| Lead data quality | CRM/Revenue Operations Owner |
| B2B qualification | Enterprise Sales/Business Owner |
| Pricing economics | Finance Owner |
| Product facts | Product/Data Owner |
| Customer data/privacy controls | Data/Privacy Governance Owner |
| Agent routing | YONGGUANG-AGENT governed runtime |

## 13. AI Agent behavior

AI may:
- classify intent from user-provided context;
- recommend a relevant solution path;
- summarize lead information;
- flag missing qualification data;
- draft internal next-step suggestions;
- calculate non-binding commercial scenarios using approved finance sources;
- route work to the correct owner.

AI must not:
- invent availability, price, product claims or contract terms;
- submit outbound proposals without authority;
- mutate live CRM/customer records without approved execution path;
- commit discounts or below-floor pricing;
- infer sensitive traits or collect unnecessary personal data;
- represent a draft as approved/sent/contracted.

## 14. Release gates

Before any production implementation:

### Website/form gate
- public copy approved;
- form fields reviewed for minimization;
- owner and response SLA assigned;
- success/failure behavior tested;
- accessibility and mobile behavior tested;
- spam/abuse controls defined;
- privacy/consent wording approved where applicable.

### Integration gate
- CRM/commerce/LINE endpoint approved;
- credentials stored outside source control;
- idempotency/retry/error handling defined;
- audit trail enabled;
- test/sandbox evidence exists;
- rollback plan exists.

### Revenue gate
- Product Master source is available;
- pricing source and price-floor rules are available;
- stock/availability claims come from authoritative source;
- binding terms require applicable approval.

## 15. Recommended MVP sequence

1. Fix public domain delivery and Pages publication boundary.
2. Add clear B2C/B2B2C context-entry CTAs without data capture.
3. Add one minimal B2B2C inquiry form with named business owner and no automation.
4. Add one minimal B2C inquiry/relationship path only if operational ownership exists.
5. Instrument anonymous intent/CTA events.
6. Connect CRM/LINE only after governed sandbox/UAT.
7. Connect commerce after Product Master, stock, pricing and reconciliation sources are reliable.

## 16. Impact

Expected benefits:
- visitors understand what to do next;
- B2C and B2B2C journeys no longer compete on one generic path;
- data collection stays minimal and purposeful;
- AI can reason over explicit funnel states and event names;
- finance/product/governance gates remain intact.

## 17. Rollback

Because this artifact makes no live change, rollback is simply to reject/supersede this design version.

For future implementation, every public form, CTA behavior, CRM automation or channel integration must have its own reversible release plan.

## 18. Definition of Done

BF-003 requires:
- review-ready B2C + B2B2C funnel map;
- CTA rules;
- lead capture events;
- no live form mutation.

All are defined in this artifact. No production/customer-facing mutation was executed.

**BF-003 preparation result: PASS / WAITING_APPROVAL for any live implementation.**
