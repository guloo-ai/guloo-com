# GULOO 24H Build Factory — Hourly Runbook V1.0

## Hourly loop

### A. Observe
- Read BUILD_QUEUE.
- Inspect repository state relevant to the selected task.
- Identify dependencies, recent changes and current production state.

### B. Select
- Highest priority READY GREEN task first.
- One bounded unit per run.
- Never bypass WAITING_APPROVAL or BLOCKED.

### C. Plan
Before writing, state internally:
- intended change;
- files/systems touched;
- risk class;
- verification method;
- rollback path.

### D. Execute
- Make the smallest coherent change.
- Prefer versioned source-of-truth artifacts.
- Do not duplicate canonical data.

### E. Verify
Depending on work type:
- website: links, metadata, canonical, structured data, mobile basics, sitemap/robots;
- schema/data: required fields, types, ownership, validation rules;
- code: available tests/typecheck/lint/build;
- governance: consistency with Constitution and execution policy.

### F. Record
Append to RUN_LOG:
- timestamp;
- task ID;
- action;
- evidence;
- result;
- risk / blocker;
- next action.

### G. Escalate only when useful
Chairman attention is required only for:
- RED decision;
- YELLOW release approval;
- unresolved blocker requiring business judgment;
- material test failure or security concern.

## Completion standard
A capability is considered operational only when it has:
**Source -> Owner -> Rule -> Execution path -> Verification -> Audit trail.**
