# BF-002｜GULOO.com Public Website Audit

Date: 2026-08-17
Owner: YONGGUANG-AGENT
Risk: GREEN (audit/report only; no website, deployment or DNS mutation)
Status: COMPLETE

## Executive result

Overall: **FAIL — public delivery blocker**

The repository contains a coherent static website baseline, but the public `https://guloo.com` endpoint was observed redirecting to an Afternic domain-for-sale page rather than serving the GULOO website. This blocks public discoverability, brand trust, SEO indexing and conversion regardless of source quality.

## Scope

Audited:
- public root endpoint behavior;
- repository pages: `/`, `about.html`, `brand-story.html`, `digital-identity.html`, `faq.html`;
- logo and favicon asset presence and references;
- page titles, descriptions, canonical URLs and structured data;
- robots.txt and sitemap.xml;
- internal navigation/link targets from source;
- responsive/mobile CSS baseline.

Not performed:
- DNS or registrar changes;
- deployment changes;
- production content mutation;
- browser-device lab testing or Lighthouse performance testing.

## PASS / FAIL matrix

| Area | Result | Evidence / finding |
|---|---|---|
| Public root availability | **FAIL / P0** | `https://guloo.com` redirects to an Afternic for-sale destination instead of the GULOO site. |
| Repository website source | PASS | `index.html`, `about.html`, `brand-story.html`, `digital-identity.html`, `faq.html` are present on `main`. |
| Brand naming consistency | PASS | Reviewed pages consistently use `GULOO 穀露` and identify 品飯屋事業有限公司 as operating entity. |
| Logo consistency in source | PASS | Pages consistently reference `assets/guloo-logo.svg?v=20260816-master`. |
| Favicon baseline | PASS | `assets/favicon.svg` exists and reviewed pages reference it. |
| Viewport baseline | PASS | Reviewed pages include responsive viewport metadata. |
| Mobile navigation | **FAIL / P1** | CSS hides `.nav-links` at widths <= 860px, with no replacement hamburger/menu control in reviewed HTML/JS. |
| Page title + description | PASS | All reviewed HTML pages include distinct title and meta description values. |
| Canonical URLs | PASS | Reviewed pages contain explicit `https://guloo.com/...` canonical URLs. |
| Structured data | PASS | Organization/WebSite/WebPage, AboutPage, ProfilePage and FAQPage JSON-LD are present where appropriate. |
| Open Graph baseline | PARTIAL / P2 | Home and digital identity pages include OG metadata; about, brand story and FAQ do not. |
| Twitter card baseline | PARTIAL / P2 | Home has a Twitter card declaration; remaining reviewed pages do not. |
| robots.txt | PASS in source | Allows crawling and points to `https://guloo.com/sitemap.xml`. Public effectiveness is blocked by current root redirect. |
| sitemap.xml | PASS in source | Lists five reviewed canonical pages with lastmod values. Public effectiveness is blocked by current root redirect. |
| Internal source links | PASS | Reviewed navigation targets resolve to files/anchors present in the repository. |
| CNAME source | PASS in repository | `CNAME` contains `guloo.com`; this does not match observed public delivery behavior and therefore requires external DNS/hosting verification. |

## Actionable defects

### WEB-001 — P0 — Public domain does not serve GULOO
**Impact:** Critical. The primary digital headquarters is not publicly delivering the repository website, so users and search engines cannot reliably reach the intended GULOO identity.

**Required next action:**
1. Verify registrar ownership/status and authoritative DNS for `guloo.com`.
2. Verify GitHub Pages/custom-domain publication target and whether `main` is the active source.
3. Compare required GitHub Pages DNS records with the current authoritative records.
4. Prepare a review-ready DNS/deployment correction plan with rollback and verification steps.
5. Do **not** change DNS or production hosting under GREEN authority.

**Verification after approved correction:**
- `https://guloo.com/` returns the GULOO homepage without third-party parking redirect;
- HTTPS is valid;
- `/robots.txt`, `/sitemap.xml`, `/about.html`, `/brand-story.html`, `/digital-identity.html`, `/faq.html` return the intended content;
- canonical URLs match the live hostname.

### WEB-002 — P1 — Mobile navigation disappears
**Impact:** High on mobile usability. At <= 860px, navigation links are hidden and no alternate mobile navigation control is present.

**Required next action:** Create a review-ready responsive navigation patch with accessible hamburger/menu behavior, keyboard support, focus state, `aria-expanded`/`aria-controls`, and no-JS fallback where practical. Public release is YELLOW.

### WEB-003 — P2 — Social metadata inconsistent across pages
**Impact:** Medium. Shared links for about, brand story and FAQ may produce weaker or inconsistent social previews.

**Required next action:** Add page-specific Open Graph and Twitter card metadata using a production-safe image asset. Review before public release.

### WEB-004 — P2 — SVG logo used as social preview image
**Impact:** Medium. Some crawlers/social platforms have inconsistent support for SVG preview images.

**Required next action:** Produce an approved raster social preview asset (e.g. 1200×630) derived from the sealed brand identity and reference it in OG/Twitter metadata. Brand review required before release.

## Brand / content notes

The reviewed source is internally consistent around the positioning `GULOO 穀露`, `A Gentle Companion for Life`, `Food × Care × Life × AI`, Life Embrace / 生命之抱, and 品飯屋事業有限公司 as the operating entity. No source-level brand naming conflict was found in this audit.

This BF-002 audit does **not** certify that the current SVG geometry is the final approved trademark artwork; it only verifies that the same repository asset is used consistently across reviewed pages.

## Closure decision

BF-002 Definition of Done requires an audit report with PASS/FAIL and actionable defects. That deliverable is satisfied.

**BF-002 task result: DONE (audit complete).**

Website operating health remains **RED** until WEB-001 public delivery is resolved and verified.
