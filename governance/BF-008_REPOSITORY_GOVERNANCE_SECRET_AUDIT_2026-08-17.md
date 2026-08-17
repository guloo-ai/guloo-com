# BF-008｜Repository Governance & Secret-Exposure Audit

Date: 2026-08-17
Owner: YONGGUANG-AGENT
Risk: GREEN (audit/report only)
Status: COMPLETE

## Executive result

Overall: **PASS for audit deliverable / REPOSITORY GOVERNANCE AMBER**

No high-confidence secret exposure was found in the current `main` branch using targeted repository searches for common credential indicators including `OPENAI_API_KEY`, `api_key`, `password`, `private_key`, `token`, `BEGIN PRIVATE KEY`, and `sk-`.

However, the repository is **public** and currently mixes public website source with internal governance, Agent OS, product-data and finance contracts. In addition, the GitHub Pages workflow uploads the repository root (`path: .`) as the Pages artifact. This creates an avoidable information-exposure boundary problem even when no credential is present.

## Scope

Audited:
- repository visibility and basic repository metadata;
- root directory composition;
- `.github` and GitHub Pages workflow;
- targeted current-branch secret indicators;
- separation between public website source and internal company/governance artifacts;
- basic repository hygiene controls visible from the current tree.

Not performed / limitation:
- no credential rotation, deletion or permission change;
- no repository visibility change;
- no branch-protection mutation;
- no full Git history entropy scan or third-party secret-scanner execution;
- no organization-wide audit across other repositories;
- no GitHub Advanced Security configuration changes.

Therefore, "no high-confidence secret exposure found" applies to the inspected current `main` content and search surface, not an absolute guarantee over all historical commits or external systems.

## Findings

### SEC-001 — P1 — Public repository contains internal operating artifacts

**Result: FAIL / AMBER**

Repository metadata reports `visibility: public`. The same repository contains internal-oriented directories/files including:
- `governance/`;
- `agent-os/`;
- `data/`;
- `finance/`.

Examples include Build Factory policy/run logs, Chairman Command Center data contract, Product Master contract and Unit Economics/Pricing contract.

**Impact:**
- internal operating architecture and governance logic are externally discoverable;
- future contributors may mistakenly commit non-public commercial, operational or governance detail into a repository assumed to be an internal digital headquarters;
- the public/private boundary is unclear, increasing future leakage risk.

**Recommended remediation:**
1. Keep `guloo-com` as a narrowly scoped public website repository.
2. Move internal governance/Agent OS/data/finance artifacts to the governed private YONGGUANG-AGENT/company repository or another approved private source of truth.
3. Define an explicit public-content allowlist.
4. Do not change repository visibility or migrate history automatically; prepare a reviewed migration plan first because repository/public-site behavior may be affected.

### SEC-002 — P1 — GitHub Pages artifact scope is repository root

**Result: FAIL / AMBER**

`.github/workflows/pages.yml` uses `actions/upload-pages-artifact@v3` with:

```yaml
with:
  path: .
```

**Impact:**
When Pages deployment is functioning, this design can package files outside the intended public web surface. Even if GitHub Pages behavior or dotfile handling excludes some paths, internal directories should not rely on implicit exclusions for confidentiality.

**Recommended remediation:**
1. Create an explicit public web root such as `public/` or a build output such as `_site/`.
2. Copy only approved website files/assets into that directory.
3. Upload only that directory in `upload-pages-artifact`.
4. Add a CI assertion that forbidden internal paths (`governance/`, `agent-os/`, `data/`, `finance/`) are absent from the Pages artifact.
5. Treat deployment workflow mutation as YELLOW because it affects production publication behavior.

### SEC-003 — PASS — No high-confidence current-main secret indicators found

Targeted repository searches returned no matches for:
- `OPENAI_API_KEY`;
- `api_key`;
- `password`;
- `private_key`;
- `token`;
- `BEGIN PRIVATE KEY`;
- `sk-`.

**Interpretation:** No obvious credential material was found in the current searchable `main` content using this bounded audit.

**Residual risk:** Historical commits, binary assets, encoded values, non-indexed content or novel secret formats are not exhaustively covered by these keyword searches.

**Recommended remediation:** Add automated secret scanning in CI and/or GitHub secret scanning where available. Never store real credentials in source; use approved secret-management facilities.

### SEC-004 — P2 — No root `.gitignore` visible

**Result: FAIL / LOW-MEDIUM**

The inspected root listing does not show a `.gitignore` file.

**Impact:** Future local development may accidentally stage OS files, environment files, build artifacts, editor state or local credentials.

**Recommended remediation:** Add a conservative `.gitignore` covering at minimum `.env*` (while allowing safe examples), OS/editor files, temporary/build outputs and local secret/config files. This is a GREEN source-control hardening change if it does not remove tracked production files.

### SEC-005 — P2 — Repository governance files are minimal

**Result: PARTIAL**

The visible `.github/` tree contains only `workflows/`; no `CODEOWNERS` or repository security policy was observed in the inspected tree.

**Impact:** Ownership/review expectations for sensitive website, governance and deployment changes are not encoded at repository level.

**Recommended remediation:**
- add `CODEOWNERS` with explicit ownership for deployment, website identity and governance files;
- add `SECURITY.md` defining how to report security issues without placing sensitive details in public issues;
- evaluate branch protection/rulesets separately with authorized repository settings access.

### SEC-006 — P2 — GitHub Actions references use moving major-version tags

**Result: PARTIAL**

Workflow actions are referenced as `actions/checkout@v4`, `actions/configure-pages@v5`, `actions/upload-pages-artifact@v3`, and `actions/deploy-pages@v4` rather than immutable commit SHAs.

**Impact:** Major-version tags are standard and convenient but provide weaker supply-chain immutability than commit-SHA pinning.

**Recommended remediation:** For hardened production workflows, evaluate pinning third-party/official Actions to reviewed commit SHAs and use a controlled dependency-update process.

### SEC-007 — PASS — Workflow permissions are scoped to Pages deployment needs

The Pages workflow declares:
- `contents: read`;
- `pages: write`;
- `id-token: write`.

No broader repository write permission was observed in this workflow.

## Priority remediation plan

### P1 — Before restoring/activating public Pages delivery
1. Separate public website artifacts from internal company/governance artifacts.
2. Change Pages artifact source from repository root to an explicit public/build directory.
3. Add CI verification that internal directories cannot enter the Pages artifact.

These changes affect publication architecture and should be prepared as a YELLOW review-ready patch before live release.

### P2 — Repository hardening
1. Add `.gitignore`.
2. Add `CODEOWNERS`.
3. Add `SECURITY.md`.
4. Add automated secret scanning / high-confidence secret checks.
5. Evaluate immutable action pinning.
6. Review branch protection/rulesets and required reviews in a separate authorized governance task.

## Secret handling rule

If a real credential is ever found:
1. stop propagation;
2. do not paste the secret into issues, logs or reports;
3. treat rotation/revocation as RED/high-impact credential action requiring the appropriate authorized path;
4. preserve only non-secret evidence such as file path, secret type, commit/reference and remediation status;
5. consider history remediation only under an approved destructive-change plan.

## Closure decision

BF-008 Definition of Done requires: **No secret writes; report issues and remediation plan only.**

This audit made no secret writes, no credential changes and no destructive repository mutations. It documents findings, limitations, severity and remediation actions.

**BF-008 task result: DONE (audit complete).**

Repository governance health: **AMBER** until SEC-001 and SEC-002 are resolved before reliable public deployment.
