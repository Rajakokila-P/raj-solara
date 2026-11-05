# Testing record: Raj Solara

**Status:** draft for review. Replaces the earlier version of this file, which contained older statements that conflict with later results. Only checks listed under "Completed checks" have evidence. Everything else is pending and must not be marked as passed until it has been carried out and recorded.

## Completed checks (5 November 2026)

| Check | Result | Evidence |
| --- | --- | --- |
| Node unit tests (`npm test`) | 13 passed, 0 failed | `docs/evidence/validation/unit-tests.txt` |
| ESLint 10.14.0 (`npm run lint`) | 0 errors, 0 warnings | `docs/evidence/validation/eslint-final.json` |
| W3C Nu HTML checker: index.html, about.html, 404.html | 0 errors, 0 warnings on each page | `index-html-final.json`, `about-html-final.json`, `404-html-final.json` |
| Jigsaw CSS validator, CSS3, all warnings | Valid; 0 errors; **101 warnings** kept, not hidden | `docs/evidence/validation/css-final.xml` |
| `npm audit` on the repository's `package.json` and `package-lock.json` | 0 known vulnerabilities (run by the student on Windows) | Terminal output to be saved as `docs/evidence/validation/windows-audit.txt` |

Notes:
- The 101 CSS warnings are the official Jigsaw count. They are mainly redefinition, no-colour and no-background-colour warnings. Their causes are described in [validation.md](validation.md). They are not accessibility results.
- The `npm audit` result depends on the repository's `overrides` entry for `minimatch` (11.0.4). A version of `package.json` without that entry resolves `minimatch` to 10.2.6 and reports 4 moderate vulnerabilities. Keep the overrides entry and its lock file together.

## Browser checks

- Automated browser tests were attempted in the reviewing environment. Chromium failed to start there, so **no automated browser pass is claimed**.
- Selected actions were performed by the student in their connected Edge browser on 5 November 2026. See [browser-evidence.md](browser-evidence.md). Those results cover only the sampled actions listed there, and the tested version was the one before the Raj Solara rename.
- The optional script `tests/browser-check.cjs` uses port 4174, while `scripts/serve.cjs` uses 4177. Align the two before running it. It has not been completed successfully.

## Manual checks (pending)

Record the date, browser or device, steps, expected result, actual result and screenshot for each. Do not mark a check as passed until it has been carried out.

| Scenario | Expected result | Status |
| --- | --- | --- |
| Concept search and filters, then reset | Correct results; reset restores all | Pending |
| Compare up to three concepts | Limit feedback at four; table correct | Pending |
| Change all studio options | Preview and summary match the selection | Pending |
| Save, reload, reopen and delete designs | Saved correctly; maximum six | Pending |
| Block or corrupt browser storage | Usable fallback shown | Pending |
| Two tabs open | Update shown; concurrent-write limitation understood | Pending |
| Energy example: 70% reserve, 0 kW solar, 10 kW demand | Reserve reached at hour 8, then fixed energy | Unit test passed; interface pending |
| Invalid energy input | Visible error; no stale table | Pending |
| Download brief | Matches the configuration | Pending |
| Empty, invalid and valid enquiry | Correct feedback; nothing transmitted | Pending |
| Mission request, then cancel | Progress stops; no late result | Pending |
| Change scenario while waiting | Old result cannot replace the new selection | Pending |
| Keyboard-only use and screen reader | Visible focus; clear names; no keyboard trap | Pending |
| Mobile 320 and 390 px, zoom, contrast | No lost controls or overflow; readable text | Pending |
| Back and forward navigation | Anchors and controls keep working | Pending |
| Missing nested URL | Home link; timer and cancellation work | Pending |
| Picture gallery: new-tab links and alt text | Links open as described; alt text meaningful | Pending |
| Live site, after deployment | Same behaviour as local; no console errors | Pending |

## Deployment

- The GitHub Pages workflow is in `.github/workflows/pages.yml`. Its source must be set to **GitHub Actions** in repository Settings → Pages.
- The live site has **not yet been checked** after the latest push. Record the workflow run, the live address and the result.

## Bugs and fixes

Record each defect found during testing: steps to reproduce, cause, change made, retest result. Keep unresolved issues in the record.

- The earlier slider-label defect (an `<output>` element inside a `<label>`) was fixed. The W3C checker now reports no errors on index.html.

## Not yet done

- Automated accessibility audit (for example axe).
- Full keyboard and screen-reader pass.
- Contrast check of computed colours.
- Cross-browser testing.
- User feedback from a target user.
- Reflection on what the testing showed.
