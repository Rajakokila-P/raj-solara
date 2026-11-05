# Testing record

## Automated checks

See tests/model.test.js. Tests cover case-insensitive search, combined filters, a hand-calculated energy example, darkness, zero charge, invalid input, non-positive net load and stored-value allowlists. Results recorded below after execution.

## Manual and browser checks — pending

Record date, browser/device, steps, expected/actual results and real evidence for each. Do not mark unperformed checks as passed.

| Test | Expected | Status |
|---|---|---|
| Search and mission intersection, reset | No results then all four | Pending |
| Compare all, filter, clear | Selections retained, correct table | Pending |
| Change all studio options | Preview and summary match | Pending |
| Save, reload, reopen, delete | Persistent and correct | Pending |
| Duplicate and six-design limit | Visible feedback | Pending |
| Block/corrupt storage | Usable fallback | Pending |
| Two tabs | Update event shown; concurrent-write limitation understood | Pending |
| Energy range and invalid demand | Correct results, visible errors | Pending |
| Download brief | Matches configuration | Pending |
| Empty/invalid/valid enquiry | Correct feedback; no transmission | Pending |
| Keyboard-only and screen reader | Clear focus, names, no trap | Pending |
| Mobile, zoom, contrast | No lost controls or unreadable text | Pending |
| Back/Forward navigation | Working anchors and controls | Pending |
| Missing nested URL | Home, timer, cancellation work | Pending |
| Final live site | Matches local version; no console errors | Pending |

## Validation and deployment

W3C HTML: not run. Jigsaw CSS: not run. JavaScript lint: not run. Browser automation: attempted for the BR101 revision but blocked before execution (see below). Accessibility audit: not run. Live deployment: not performed. No screenshot evidence or user feedback has been invented.

## Bugs and fixes

Add genuine observed defects with reproduction steps, cause, change and retest. Retain unresolved issues explicitly.

## Executed checks — 5 November 2026

- Node unit tests: 8 passed, 0 failed.
- Application JavaScript and server syntax checks: passed.
- HTML parser checks: all three pages have unique IDs and one H1; referenced local files and same-page anchors exist. This is not official HTML validation.

## British imagery revision — 5 November 2026

Eight unit tests passed again. app.js and art.js syntax checks passed. Generated image visually reviewed for navy/red/white livery and Union Jack. Updated page layout has not been tested in a browser.

## BR101 integration — 5 November 2026

- `npm test`: **13 passed, 0 failed**, including five new tests for reserve stopping, empty battery, capacity capping, invalid inputs and scenario outcomes.
- New tests first failed because the system-model module did not exist; implementation then passed the tests.
- Browser automation was attempted using headless Chromium. Launch failed with `socket() failed: Operation not permitted` before a page could be tested. This is an environment limitation, not a browser pass.
- A reproducible optional browser test script is included as `tests/browser-check.cjs`. It requires Playwright and its Chromium browser to be installed separately; these are not needed to run the site. Start the local server and run `node tests/browser-check.cjs`. It has not completed successfully in this environment.

### Additional manual checks required

| Scenario | Expected result | Status |
|---|---|---|
| Four filtered concepts; fourth comparison selection | At most three compared; clear limit feedback | Pending browser run |
| Six system topics | Correct explanation and pressed state | Pending browser run |
| Hourly budget: 70%, 0 kW solar, 10 kW demand | Reserve at hour 8, then fixed energy | Unit passed; UI pending |
| Invalid daily input | Error message, no stale table | Pending browser run |
| Mission request then cancel | Progress stops, no delayed result appears | Pending browser run |
| Change scenario while waiting | Old result cannot replace new selection | Pending browser run |
| Offline scenario then clear retry | Failure feedback followed by successful simulation | Pending browser run |
| Existing and new saved designs | Reopen, save, delete; max six records | Pending browser run |
| Mobile 320/390px and keyboard | Readable panels, reachable controls, no page overflow | Pending browser run |

All previous manual, official validation, accessibility, user-feedback and live-deployment requirements remain outstanding. Unit checks alone do not establish distinction readiness.

Fresh post-integration syntax checks passed for app.js, systems.js, serve.cjs and the optional browser-check script. All three HTML pages passed local-reference, unique-ID and single-H1 checks using an HTML parser; this does not replace official W3C validation. The Windows launcher has been provided but not executed on Windows.

## Supplied picture gallery revision

All four supplied PNG files were copied without altering their pixels. File hashes and HTML image dimensions checked against the originals. Gallery image/link targets and descriptive alternatives checked. Existing 13 unit tests rerun successfully. Responsive gallery layout, focus behaviour and new-tab links still require a real browser check; no browser pass is claimed.

## Connected-browser checks and Raj Solara rename

The earlier Chromium launch limitation remains part of the historical record. On 5 November 2026, selected checks were subsequently performed successfully through the user's connected Edge browser. See [browser evidence](browser-evidence.md) for precise results and screenshots. These tested the running pre-rename version. They supersede Pending only for the specific sampled actions documented there, not for full accessibility or cross-browser coverage.

Visible branding, page titles, downloaded brief heading/filename and documentation now say Raj Solara. The existing localStorage key remains unchanged to preserve saved designs on the same origin. A different port creates a separate browser-storage origin. Final renamed-package browser verification is pending.

## Brand-symbol revision — 5 November 2026

Static checks confirmed two matching decorative SVG marks beside the header/footer name and no change to navigation destinations. Visual checking of this new symbol in the installed site remains pending.
