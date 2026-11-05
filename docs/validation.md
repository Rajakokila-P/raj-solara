# Raj Solara — validation evidence

Checked on 5 November 2026 against GitHub commit b99bbb9, with the local corrections described below. These corrections have not been pushed or deployed. Raw reports and SHA-256 source hashes are in [evidence/validation](evidence/validation/).

| Check | Fresh result | Evidence |
| --- | --- | --- |
| Official W3C Nu HTML checker: index.html | 0 errors, 0 warnings | index-html-final.json |
| Official W3C Nu HTML checker: about.html | 0 errors, 0 warnings | about-html-final.json |
| Official W3C Nu HTML checker: 404.html | 0 errors, 0 warnings | 404-html-final.json |
| Official Jigsaw CSS, CSS3, all warnings enabled (level 2) | Valid: true; 0 errors, 101 warnings | css-final.xml |
| ESLint 10.14.0, recommended correctness rules, all project JS/CJS | 0 errors, 0 warnings | eslint-final.json |
| Node unit tests | 13 passed, 0 failed | unit-tests.txt |

## Changes and rationale

The initial index HTML had two errors and three warnings. Each slider label contained both an output element and an input, which are both labelable elements. Replace the numeric output with a styled span, retaining the IDs used by JavaScript and the visual float alignment. Native range inputs still expose their current values. The initially empty technology article now has a fallback heading and explanation; JavaScript continues replacing it when a topic is selected. All three pages were then resubmitted to W3C.

Added ESLint configuration, a lint script and a dependency lockfile for reproducible checks. Browser modules use browser globals; Node scripts use Node globals. The Playwright test has explicit document and innerWidth globals because its callbacks run inside the browser. Initial lint findings were these five environment configuration findings; no JavaScript runtime logic was altered.

Implementation and validation assistance: OpenAI Codex. Project concept and ownership: Rajakokila-P. This record does not claim independent student testing or understanding.

## CSS warnings — retained, not hidden

The official Jigsaw report records 81 redefinition warnings, 12 no-color warnings and 8 no-background-color warnings. The stylesheet uses cascading brand overrides and responsive media rules. Transparent controls inherit colours from their surrounding sections. These patterns explain the warning categories; they do not independently prove accessible contrast. No CSS validation errors remain, but this is **not a warning-free result**. Full computed-colour, contrast, focus and mobile checks remain outstanding. The full warning messages and line references are saved.

The first CSS POST submission returned HTTP 500. A subsequent URL-based request and a GET direct-input request both returned HTTP 200 and valid CSS. css-live.xml applies to the existing public stylesheet; css-final.xml applies to the corrected local stylesheet, including the control-value selector. No failed service response was counted as a pass.

## Reproduce

From the project root on Windows:

```powershell
npm.cmd ci
npm.cmd run lint
npm.cmd test
```

Use a current supported Node version compatible with ESLint 10 (the recorded check used Node 24.22.1; the student's Node 26 also meets its engine range). ESLint is development tooling and is not shipped to site visitors.

For official HTML validation, open https://validator.w3.org/nu/ and upload each of dist/index.html, dist/about.html and dist/404.html. The saved JSON reports were obtained by POSTing each file as text/html to https://validator.w3.org/nu/?out=json.

For CSS, open https://jigsaw.w3.org/css-validator/ and submit dist/css/style.css using direct input. Select CSS3 and all warnings. The saved SOAP response used profile=css3, warning=2 and output=soap12. A reproducible curl command is:

```sh
curl -G https://jigsaw.w3.org/css-validator/validator --data-urlencode text@dist/css/style.css --data 'profile=css3&output=soap12&warning=2'
```

## Install this update

The update ZIP contains changed files and validation evidence only. Back up your project, then copy its contents into the existing raj-solara project folder, keeping the existing dist/assets and Git history. Review git diff before committing. Run the commands above and open the site to check the two energy sliders and technology buttons. These final markup changes have not been browser-tested in this validation run. No Git commit, push or deployment was performed by the assistant.

The optional tests/browser-check.cjs still targets port 4174 while scripts/serve.cjs uses 4177. That pre-existing mismatch is recorded here; the optional browser suite was not run or counted as passing in this task.

After you publish the corrections, repeat validation against the live URLs, including the deployed 404 page. Validation and 13 unit tests do not establish full accessibility, complete user journeys or a distinction grade.
