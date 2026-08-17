# GULOO 24H BUILD_QUEUE

Status: ACTIVE
Owner: YONGGUANG-AGENT
Executive Sponsor: Chairman
Cadence: Hourly review

## Purpose
This queue is the single execution backlog for the GULOO 24H Build Factory. Only tasks listed here may be advanced automatically by the hourly factory loop.

## Status machine
`BACKLOG -> READY -> IN_PROGRESS -> VERIFY -> DONE`

Exception states:
- `BLOCKED` — external dependency, missing credential, missing source data, or failed test.
- `WAITING_APPROVAL` — YELLOW or RED decision required.
- `CANCELLED` — explicitly removed from scope.

## Risk classes
- **GREEN** — reversible, low-risk, internal or draft work. May be executed automatically.
- **YELLOW** — may affect public content, workflow behavior, business rules, or production configuration. Produce a review-ready result; do not perform irreversible release without approval.
- **RED** — legal, financial, credential, deletion, permission escalation, outbound communication, purchase, payment, live customer data mutation, or other high-impact action. Never execute automatically.

## P0 Operating Goal
Make GULOO capable of receiving demand, converting it, fulfilling it, recording it, and learning from it with governed AI assistance.

## Active Queue

| ID | Priority | Risk | Status | Workstream | Task | Definition of Done |
|---|---|---|---|---|---|---|
| BF-001 | P0 | GREEN | DONE | Governance | Establish 24H Build Factory governance baseline | BUILD_QUEUE, EXECUTION_POLICY, RUNBOOK, REPORT templates committed to main |
| BF-002 | P0 | GREEN | DONE | Web | Audit guloo.com public pages for brand/logo consistency, broken links, metadata, sitemap and mobile baseline | Audit report with PASS/FAIL and actionable defects |
| BF-003 | P0 | YELLOW | DONE | Revenue | Draft GULOO conversion architecture for B2C + B2B2C | Review-ready funnel map, CTA rules, lead capture events, no live form mutation |
| BF-004 | P0 | GREEN | DONE | Data | Define minimum product master schema for SKU, name, spec, BOM, standard cost, live stock, safety stock, Quickin mapping, allergen, owner | Versioned schema and validation checklist committed |
| BF-005 | P0 | GREEN | DONE | Agent OS | Define Chairman Command Center minimum data contract | Command/status/owner/risk/approval/audit fields documented |
| BF-006 | P0 | GREEN | DONE | Finance | Define minimum unit economics and pricing data model | Standard cost, gross margin, contribution margin, price floor and owner fields documented |
| BF-007 | P1 | YELLOW | DONE | People | Create first-management-hire JD and 90-day scorecard | Review-ready COO/Chairman Office Lead JD and scorecard |
| BF-008 | P1 | GREEN | DONE | Security | Run repository governance and secret-exposure audit | No secret writes; report issues and remediation plan only |

## Dispatch rule
At each hourly run:
1. Select the highest-priority `READY` GREEN task.
2. If none exists, advance a GREEN `BACKLOG` task to `READY` only when prerequisites are satisfied.
3. Execute one bounded unit of work.
4. Validate the result.
5. Record outcome in `governance/RUN_LOG.md`.
6. Move the task to `VERIFY` or `DONE` only when Definition of Done is met.
7. For YELLOW tasks, create review-ready artifacts and move to `WAITING_APPROVAL` before any production change.
8. For RED tasks, do not execute; create a chairman decision packet.

## WIP limit
Maximum automatic work in progress: **1 task per hourly run**.
This prevents uncontrolled parallel mutation and preserves traceability.

## Approval note
Chairman approved the BF-003 Revenue Conversion Architecture and BF-007 First Management Hire Design on 2026-08-18. This approval closes the design artifacts only. It does **not** by itself authorize live forms, CRM/LINE/commerce activation, public pricing changes, 104 publication, candidate outreach, hiring commitments, compensation commitments, or other external/live actions.
