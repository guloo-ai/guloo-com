# GULOO Chairman Command Center — Minimum Data Contract V1.0

Status: ACTIVE
Owner: YONGGUANG-AGENT
Executive Sponsor: Chairman
Version: 1.0
Effective date: 2026-08-17
Risk class: GREEN (data/interface contract only)

## 1. Purpose

Define the minimum canonical data contract the Chairman Command Center needs to understand company work without creating a second execution authority.

The Command Center is a governed **control and observability interface**. It may display, route and summarize authorized work, but executable authority remains in the approved YONGGUANG-AGENT governance/runtime path and its Constitution, Permission, Approval, Budget and Audit controls.

Minimum operating chain:

**Command -> Status -> Owner -> Risk -> Approval -> Execution reference -> Verification -> Audit**

## 2. Minimum record

Every command/task surfaced to the Chairman Command Center MUST be representable by this record.

| Field | Type | Required | Meaning |
|---|---|---:|---|
| `command_id` | string | YES | Globally unique immutable command identifier. |
| `command` | object | YES | Chairman/business intent and bounded requested outcome. |
| `status` | enum | YES | Current lifecycle state. |
| `owner` | object | YES | Accountable owner and current execution owner. |
| `risk` | object | YES | Risk class, rationale and applicable gates. |
| `approval` | object | YES | Approval requirement and current decision state. |
| `execution` | object | YES | Execution authority/path reference; never an embedded credential. |
| `verification` | object | YES | Definition of Done and evidence state. |
| `audit` | object | YES | Immutable trace references for material state transitions. |
| `priority` | enum | YES | `P0`, `P1`, `P2`, `P3`. |
| `created_at` | datetime | YES | Creation timestamp with timezone. |
| `updated_at` | datetime | YES | Last state update timestamp with timezone. |
| `parent_command_id` | string/null | YES | Parent when work is decomposed; null for a root command. |
| `source_refs` | array<object> | YES | References to canonical source artifacts/systems. |

## 3. Canonical object shape

```json
{
  "schema_version": "1.0",
  "command_id": "CMD-20260817-0001",
  "parent_command_id": null,
  "priority": "P0",
  "command": {
    "title": "Define Chairman Command Center minimum data contract",
    "intent": "Create the minimum governed command/status/owner/risk/approval/audit contract.",
    "requested_by": "CHAIRMAN",
    "requested_outcome": "Versioned reviewable contract committed to source of truth",
    "scope": ["documentation", "data contract"],
    "out_of_scope": ["production activation", "credential mutation", "external write"]
  },
  "status": "DONE",
  "owner": {
    "accountable_role": "CHAIRMAN",
    "execution_owner": "YONGGUANG-AGENT",
    "business_owner": "AGENT_OS_OWNER"
  },
  "risk": {
    "class": "GREEN",
    "rationale": "Reversible internal contract; no live system mutation",
    "gates": ["CONSTITUTION", "PERMISSION", "VERIFICATION", "AUDIT"]
  },
  "approval": {
    "required": false,
    "state": "NOT_REQUIRED",
    "approval_id": null,
    "approved_by": null,
    "approved_at": null,
    "expires_at": null,
    "decision_scope_digest": null
  },
  "execution": {
    "authority": "YONGGUANG-AGENT_GOVERNED_RUNTIME",
    "mode": "DOCUMENTATION_ONLY",
    "execution_ref": "BF-005",
    "external_write": false
  },
  "verification": {
    "definition_of_done": "Command/status/owner/risk/approval/audit fields documented",
    "state": "PASS",
    "evidence_refs": []
  },
  "audit": {
    "trace_id": "AUDIT-EXAMPLE",
    "latest_event": "TASK_CLOSED",
    "event_refs": []
  },
  "created_at": "2026-08-17T20:53:00+08:00",
  "updated_at": "2026-08-17T20:53:00+08:00",
  "source_refs": []
}
```

## 4. Status contract

Canonical status values:

- `BACKLOG` — recognized but not eligible to execute yet.
- `READY` — prerequisites satisfied and eligible for routing.
- `IN_PROGRESS` — one approved execution path currently owns work.
- `VERIFY` — execution output exists and awaits verification.
- `DONE` — Definition of Done verified with evidence.
- `BLOCKED` — cannot safely continue because of dependency/test/data/runtime failure.
- `WAITING_APPROVAL` — a YELLOW/RED gate requires an authorized decision.
- `CANCELLED` — explicitly removed from scope; audit history retained.

Rules:
- `DONE` requires verification evidence; file creation alone is insufficient.
- `WAITING_APPROVAL` cannot be bypassed by routing or delegation.
- `BLOCKED` cannot auto-transition to execution without the blocker being resolved and recorded.
- State transitions must be auditable.

## 5. Command contract

`command` must capture business intent without hiding executable authority in prose.

Required subfields:
- `title` — short human-readable command.
- `intent` — why the work matters.
- `requested_by` — resolvable identity/role.
- `requested_outcome` — observable result.
- `scope` — bounded allowed work.
- `out_of_scope` — explicit exclusions when material.

A command MUST NOT contain:
- API keys, passwords, secrets or session tokens;
- implicit permission escalation;
- instructions that override Constitution/Permission/Approval/Budget/Audit gates.

## 6. Owner contract

Every non-cancelled command must have accountable ownership.

Minimum subfields:
- `accountable_role` — who is accountable for business outcome.
- `execution_owner` — Agent/human currently responsible for bounded execution.
- `business_owner` — functional owner when different.

Rules:
- Delegation transfers execution responsibility, not governance accountability.
- Owner identities must resolve to an approved role/identity registry outside this document.
- No task may be `IN_PROGRESS` without an `execution_owner`.

## 7. Risk contract

`risk.class` must be one of:
- `GREEN` — reversible, internal/low-risk; may execute within delegated authority.
- `YELLOW` — review-ready preparation allowed; live/irreversible effect requires approval.
- `RED` — execution prohibited until explicit authorized approval and all mandatory gates pass.

Minimum subfields:
- `class`;
- `rationale`;
- `gates` — applicable governance gates.

Risk cannot be lowered merely to make a command executable. Any reclassification requires a recorded rationale and audit event.

## 8. Approval contract

Minimum subfields:
- `required` — boolean;
- `state` — `NOT_REQUIRED`, `PENDING`, `APPROVED`, `REJECTED`, `EXPIRED`, `REVOKED`;
- `approval_id` — immutable approval reference when applicable;
- `approved_by`;
- `approved_at`;
- `expires_at`;
- `decision_scope_digest` — digest binding the approval to the exact decision scope/artifact when used by runtime governance.

Rules:
- Approval is scope-bound, time-bound when expiry applies, and identity-bound.
- Approval for one command cannot authorize a materially different command.
- Expired/revoked/rejected approval is non-executable.
- The Command Center stores/references approval state; it does not self-approve.

## 9. Execution contract

Minimum subfields:
- `authority` — named governed runtime/authority source;
- `mode` — e.g. `READ_ONLY`, `DOCUMENTATION_ONLY`, `DRAFT`, `STAGING`, `PRODUCTION`;
- `execution_ref` — workflow/task/run reference;
- `external_write` — boolean.

Rules:
- Command Center UI/data is never itself executable authority.
- No credentials are stored here.
- Any production/external write must independently satisfy runtime governance.
- A delegated tool call must remain inside the authority and scope recorded for the command.

## 10. Verification contract

Minimum subfields:
- `definition_of_done`;
- `state` — `NOT_STARTED`, `PENDING`, `PASS`, `FAIL`;
- `evidence_refs` — artifacts, tests, checks, commits or acceptance evidence.

Rules:
- `DONE` requires `verification.state = PASS`.
- Verification must match the task type: tests for code, validation for schemas/data, link/meta checks for web, diff/consistency checks for governance.
- Failed verification transitions to `BLOCKED` or back to an executable pre-DONE state with evidence preserved.

## 11. Audit contract

Minimum subfields:
- `trace_id` — durable trace identifier;
- `latest_event` — latest material lifecycle event;
- `event_refs` — references to append-only audit events.

Material events that must be auditable include:
- command creation;
- scope/risk/owner changes;
- approval request/decision/expiry/revocation;
- routing/delegation;
- execution start/finish/failure;
- verification result;
- blocker creation/resolution;
- cancellation/closure.

Audit references must preserve actor, time, action, result and relevant artifact/execution reference. Sensitive payloads should be minimized rather than copied into the Command Center record.

## 12. Chairman view — minimum projection

The Chairman should be able to understand company state in under three minutes. The default projection should therefore expose only:

| View field | Source |
|---|---|
| What needs attention? | `status`, `priority`, `risk.class` |
| What is being done? | `command.title`, `requested_outcome` |
| Who owns it? | `owner.*` |
| Can it proceed automatically? | `risk`, `approval`, `execution.mode` |
| What is blocked? | `status=BLOCKED` + blocker/audit reference |
| What needs Chairman approval? | `status=WAITING_APPROVAL` + approval reference |
| Is it really done? | `verification.state` + evidence refs |
| Can we reconstruct what happened? | `audit.trace_id` + event refs |

Default Chairman UI should suppress routine GREEN detail unless requested and surface RED/YELLOW exceptions prominently.

## 13. Routing and delegation rules

1. Route by capability and approved authority, not by arbitrary Agent name.
2. Exactly one current `execution_owner` is accountable for a bounded unit of work.
3. Delegated subtasks receive their own `command_id` and `parent_command_id` when independent verification/audit is needed.
4. Delegation cannot enlarge scope, risk authority, budget or permissions.
5. A downstream Agent cannot mark a parent command `DONE` unless parent Definition of Done is independently verified.

## 14. Data minimization and security

The Command Center contract must not store:
- secrets or raw credentials;
- payment card/banking secrets;
- unnecessary customer/personnel personal data;
- full sensitive payloads when an immutable reference is sufficient.

Prefer IDs, digests and source references over duplicated sensitive records.

## 15. Validation checklist

A Command Center record is PASS only when all applicable checks pass:

- [ ] `command_id` is present and immutable.
- [ ] command intent, outcome and scope are explicit.
- [ ] lifecycle `status` is valid.
- [ ] accountable and execution owners are resolvable.
- [ ] risk class and rationale are present.
- [ ] applicable governance gates are declared.
- [ ] approval requirement/state is internally consistent.
- [ ] approved work has a valid approval reference when approval is required.
- [ ] expired/revoked/rejected approvals cannot execute.
- [ ] execution authority and mode are explicit.
- [ ] no secret or credential is embedded in the record.
- [ ] Definition of Done is explicit.
- [ ] `DONE` implies verification `PASS` and evidence exists.
- [ ] material transitions have audit references.
- [ ] source references identify canonical artifacts/systems.
- [ ] child commands cannot exceed parent scope/authority.
- [ ] Command Center data does not create a second executable authority.

## 16. Definition of Done verification

BF-005 requires command/status/owner/risk/approval/audit fields documented.

This V1.0 contract defines all six required domains plus execution, verification, routing/delegation, security and the minimum Chairman projection while preserving existing YONGGUANG-AGENT governance authority.

**BF-005 contract result: PASS.**
