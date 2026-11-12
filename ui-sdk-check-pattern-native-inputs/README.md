# ui-sdk checkPattern fails native range and radio inputs

`checkPattern` from `@ui-sdk/core/testing` reports keyboard problems on a native `<input type="range">` and a native radio group that work with real keys.
It presses keys by dispatching synthetic `keydown` events, and a synthetic event doesn't run the browser's default action, so the value and focus never move.
The checker only simulates the default action for Tab, printable text, Enter on buttons and links, and Space on checkboxes and radios, in [`keys`](https://github.com/vercel-labs/ui/blob/d55a1d825fd19d285ef4a3bd4c4ff1622df08373/packages/core/src/testing/input.ts#L183).

Tested on Linux with Node 24.21.0, pnpm 12.18.0 and Playwright 1.63.0's Chromium headless shell (revision 1243).
The lockfile pins `@ui-sdk/core` 0.1.0-beta.1 from npm and Vite 8.3.8.

```sh
git clone --single-branch --branch repro/ui-sdk-check-pattern-native-inputs https://github.com/onmax/repros.git
cd repros/ui-sdk-check-pattern-native-inputs
bash verify.sh
```

`verify.sh` installs from the lockfile and runs `verify.mjs`, which starts Vite on port 5385, loads `index.html` in Chromium, reads the `checkPattern` results from `main.js`, and stops Vite.
It exits 0 when the false problems appear and the controls pass. It doesn't download browsers; run `pnpm exec playwright install chromium-headless-shell` if yours is missing.

Expected: `checkPattern(el, "slider")` and `checkPattern(el, "radio-group")` pass on native controls, because the page's real keys operate them.
The testing docs say `checkPattern` "checks its roles, names, states, references between parts, and keyboard interactions" ([testing.mdx](https://github.com/vercel-labs/ui/blob/d55a1d825fd19d285ef4a3bd4c4ff1622df08373/apps/docs/content/docs/core/testing.mdx?plain=1#L12)).

Actual:

```text
  slider: checkPattern found 6 problems with the slider pattern:
- input: ArrowUp should raise the value from 5, but it's 5 (APG slider).
...
  radio-group: checkPattern found 4 problems with the radio-group pattern:
- input: ArrowDown should move focus to the next radio, input, but focus stayed (APG radio group).
...
real ArrowRight on the range: 5 -> 6
real ArrowDown on radio S: checked m
```

Controls in the same page:

- A native checkbox passes, because the checker clicks checkboxes on Space itself.
- Playwright's real `ArrowRight` moves the range from 5 to 6, and real `ArrowDown` checks the next radio. The failures are false positives.
