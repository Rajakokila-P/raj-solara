# Raj Solara

An interactive fictional solar-assisted aircraft concept studio, now featuring the user’s BR101 platform. Project owner: **Rajakokila-P**.

## Run locally

On Windows, extract the archive and open `raj-solara/start-windows.bat`. Alternatively, with Node.js installed, open a terminal in the `raj-solara` folder and run:

```powershell
node scripts/serve.cjs
```

Open http://127.0.0.1:4174. Keep the terminal running. If Node is not on your Windows PATH:

```powershell
& "C:\Program Files\nodejs\node.exe" scripts/serve.cjs
```

No npm install, paid API, account or backend is required.

## Purpose and audience

Aviation enthusiasts and students can explore fictional aircraft, compare design assumptions and see why sunlight alone does not establish an aircraft's feasibility. No operational aircraft, flight-control system or certified performance is represented.

## User stories

1. Find an aircraft by name or mission, with clear empty results.
2. Compare up to three concepts without losing selections when filtering.
3. Change energy assumptions and understand the resulting calculation.
4. Configure aircraft, exterior finish and interior, then download a brief.
5. Save, reopen and delete up to six configurations, with a storage fallback.
6. Explore six systems: solar, storage, autonomy, curved wings, satellite communication and optical/thermal sensing.
7. Use the interface by keyboard and on a small screen.
8. Receive clear invalid-input feedback and recover from a missing URL.

## Implementation

`dist/` contains the website. HTML structure, CSS presentation and JavaScript behaviour are separate. `model.js` holds pure filtering, validation and energy functions. `app.js` manages DOM events and state. `art.js` generates a controlled SVG schematic, with only allowlisted colours and fixed geometry. Arbitrary text uses textContent. The enquiry never submits data.

Native anchors preserve browser history. LocalStorage is synchronous; storage events from another tab arrive asynchronously. Concurrent edits use last-writer-wins, not atomic collaboration. Downloads revoke object URLs after a delay. The cancellable missing-page timer is approximate because browser scheduling can delay it.

## Energy assumptions

All aircraft figures are fictional educational inputs. Solar power uses 1 kW/m² reference irradiance and 22% assumed efficiency. Available energy retains 20% of starting battery energy. Endurance assumes a constant electrical load minus constant solar input. It omits aircraft mass, drag, take-off, thermal effects, battery degradation, weather variation and conversion losses. It is not a flight-planning tool.

## Testing

Run `npm test` or `node --test tests/*.test.js`. See [testing](docs/testing.md) for verified results and outstanding manual checks. Automated checks are not a claim of full accessibility or distinction.

## Deployment

Publish the **contents of dist** at the root of a static host. Configure missing pages to use 404.html. For GitHub Pages, use a deployment workflow or branch that publishes dist contents; the repository root has no index.html. For a project URL such as /aether-solara/, update all four root-relative paths in 404.html and HOME in js/recovery.js to that exact base path. Test a nested missing URL, cancellation and timed recovery after publishing. Record the actual live URL, deployed commit/date and local/live equivalence in docs/testing.md. No deployment is claimed by this package.

## Git and ownership

This archive has no .git directory and no fabricated history. No commits or co-author trailers have been created. Initialise your repository yourself and configure your own name and verified GitHub email. Commit your genuine work in focused steps; do not claim this generated starting package was independently developed over time. The Contributors display is controlled by GitHub's attribution of actual commits, not this README.


## Assessment status

Working starting implementation, not a guaranteed grade. All pass and merit criteria must be met before distinction can be considered. Official W3C HTML/Jigsaw CSS validation, JS lint, real user feedback, personal reflection, browser/accessibility evidence and final deployment checks remain outstanding. See docs/design.md and docs/testing.md.

## British aircraft imagery revision

A modern fictional aircraft render now replaces the hero and collection schematics. It uses navy blue, white and red with a Union Jack tail. All cards share this concept image; it does not represent three independently engineered aircraft. The studio retains an interactive schematic so finish and interior changes remain visible. Navy and red replace the previous blue/copper finish colours. Existing stored finish keys are retained for compatibility.

Image: dist/assets/solara-british-aircraft.png, generated using the built-in OpenAI image tool. Prompt: premium photorealistic fictional solar-assisted autonomous aircraft above clouds, swept solar-panel wings, royal navy blue, pearl white and red livery, Union Jack tail, no airline logo or performance claims. The flag is a design motif, not an assertion of government or airline affiliation.

## BR101 integration — 5 November 2026

The supplied **Platform_BR101.pptx** is the concept source. BR101 is the flagship research design; Aurora, Stratos and Courier remain alternative studies. Compare up to three of the four designs. Existing saved-design keys remain compatible.

Your ideas now appear as six selectable system topics, a four-stage operations loop, the original cover reference, a 24-hour battery-budget calculator and a delayed mission-update demonstration. See [source mapping](docs/br101-source-map.md) for slide-by-slide traceability and distinctions between ambition and evidence.

BR101's 160 kWh capacity, 90 m² panel area and 30 kW default demand are **new invented teaching inputs**, not figures taken from your deck. All aircraft performance remains unverified. The daily calculator is a separate illustration with independently selected peak solar and demand. It uses a 160 kWh battery, fixed 32 kWh reserve, sinusoidal 06:00–18:00 solar input sampled at hourly midpoints, 90% charging efficiency and no discharge loss. At reserve the illustrative mission stops and energy is frozen. This does not simulate a real flight, landing or night-time operation.

### Asynchronous behaviour

`systems.js` snapshots the selected scenario before starting a 1.2-second timer. It displays an indeterminate progress indicator and prevents duplicate requests. Changing scenario or cancelling clears the timer and increments a request version. The completion callback checks its version before updating shared DOM state, so an obsolete response cannot overwrite a newer selection. The offline scenario reports failure and enables retry. This is a local timing demonstration, not an API or satellite connection.

### Evidence and credits

The presentation's cover image is included unchanged at `dist/assets/br101-design-reference.png`, retaining its embedded Gemini Notebook mark. Its original assertions are not adopted as verified specifications. Concept direction and supplied presentation: Rajakokila-P. Implementation, additional explanations and tests: The existing British-livery render remains an illustrative interpretation; it is not an engineering drawing or model-specific photograph.

Thirteen Node tests passed after integration. Browser automation was attempted but Chromium could not launch in the execution environment, so browser results are not claimed. See the testing record for remaining checks.

## Supplied aircraft pictures — 5 November 2026

The Pictures navigation link opens a responsive four-image gallery: the BR101 vision board, silver/cobalt BR202, deep-cobalt BR202 and pearl/slate BR303. Original image pixels are preserved. Each image has descriptive alternative text, a caption and a full-size link explicitly labelled as opening a new tab. The images are bundled locally and lazy-loaded. The BR101 caption qualifies the artwork's infinite-endurance statement as unverified.

Source: four images supplied by Rajakokila-P in this conversation. New filenames: `br101-vision.png`, `br202-silver.png`, `br202-cobalt.png`, `br303-pearl.png` in `dist/assets`. The existing interactive catalogue is unchanged; these livery studies are not assigned invented performance specifications. The attached MP4 is not included in this pictures-only update.

## Raj Solara branding and browser evidence

The public name is now **Raj Solara**, including titles, navigation branding, footer, About, missing-page recovery, server message and downloaded brief. The internal storage key is retained for compatibility. See [browser evidence](docs/browser-evidence.md) for the executed Edge checks and screenshots. The renamed package still needs a final browser smoke test after installation.

Extract this archive into a new directory. Open the `raj-solara` folder in VS Code. Stop the old local server with Ctrl+C before starting this copy, or change both port references in scripts/serve.cjs if that port is occupied. Do not overwrite your personal changes without comparing them first.

## British-colour brand symbol

A decorative three-line red, white and navy mark appears beside Raj Solara in the header and footer, inspired by the user-supplied British-flag light-trail reference. The white line has an outline for visibility. This is a colour motif, not a literal Union Jack. It uses inline SVG, requires no image download and is hidden from assistive technology because the adjacent name supplies the link text.

## Code validation — 5 November 2026

See [validation results and remaining warnings](docs/validation.md) for official HTML/CSS reports, ESLint configuration and reproducible commands. These results apply to the corrected local source; live deployment must be updated and rechecked.
