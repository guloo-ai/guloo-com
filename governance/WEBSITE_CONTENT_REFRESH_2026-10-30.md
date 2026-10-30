# Website content refresh — 2026-10-30

## Result

The homepage now introduces GULOO through daily meals, enterprise orders, Taiwan rice and rice gifts. About, brand story, FAQ and official brand information use the same food-led positioning and operating-entity description. Customer pages no longer expose internal rollout and integration terminology.

## Scope and authorization

Requested official website content update. This YELLOW public-copy release is limited to the requested brand and service content, associated metadata, navigation and responsive typography. No commerce, submission form, price, contact details, credential, integration or deployment-workflow changes are included. Existing brand SVG assets are retained.

## Validation before publication

- Five HTML pages: one H1 each, unique IDs, correct canonical URLs and matching Open Graph URLs.
- 71 local links/assets resolve; sitemap matches the five public URLs.
- Seven FAQ schema questions and answers match visible content.
- Chromium: five pages at 320, 390, 768 and 1440 px (20 checks), no page-level horizontal overflow or broken images.
- Hero CTA events and anchor navigation, enterprise explanation to ordering FAQ, keyboard skip link verified.
- All five pages remain readable with JavaScript disabled; no HTTP or JavaScript errors in local browser checks.
- Desktop/mobile homepage and FAQ screenshots visually reviewed; final homepage heading shortened for narrow screens.
- JavaScript syntax and whitespace checks pass.
- Existing deployment allowlist reproduced locally; internal folders excluded from `_site`.

## Publication verification and rollback

After merge, verify the GitHub Pages deployment succeeds, all five production URLs serve the new page titles and copy, and updated assets are accessible. If a release regression occurs, revert the content-refresh commit through a new commit; the pre-release main revision is `fbb036fc8a38807a2dae8c31211143c2bfbf26ae`. Do not reset shared history or change the publication allowlist.

## Remaining limit

The website is an informational site. Online orders and payment are not enabled; FAQ describes this explicitly. Specific availability and fulfilment remain subject to the actual service arrangement.
