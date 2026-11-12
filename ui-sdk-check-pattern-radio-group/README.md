# ui-sdk checkPattern fails ui-sdk's own RadioGroup

`checkPattern(root, "radio-group")` from `@ui-sdk/core/testing` fails on `@ui-sdk/react`'s `RadioGroup`: "has 2 checked radios", plus arrow-key focus errors.
The same check on a `CheckboxGroup` reports "input: has no accessible name".

Each radio and checkbox renders a hidden native input for forms, marked `aria-hidden="true"`.
[`withRole`](https://github.com/vercel-labs/ui/blob/d55a1d825fd19d285ef4a3bd4c4ff1622df08373/packages/core/src/testing/aria.ts#L61-L69) collects elements by role and leaves out only `hidden`, `inert` and `display: none` elements, so those inputs count as radios and checkboxes.
The checked radio is counted twice, and the checker expects arrows to move focus to the hidden inputs.

Tested on Linux with Node 24.21.0, pnpm 12.18.0 and Playwright 1.63.0's Chromium headless shell (revision 1243).
The lockfile pins `@ui-sdk/core` and `@ui-sdk/react` 0.1.0-beta.1 from npm, React 19.3.1 and Vite 8.3.8.

```sh
git clone --single-branch --branch repro/ui-sdk-check-pattern-radio-group https://github.com/onmax/repros.git
cd repros/ui-sdk-check-pattern-radio-group
bash verify.sh
```

`verify.sh` installs from the lockfile and runs `verify.mjs`, which starts Vite on port 5386, loads `index.html` in Chromium, runs both checks in the page, and stops Vite.
It exits 0 when both false problems appear and the controls pass. It doesn't download browsers; run `pnpm exec playwright install chromium-headless-shell` if yours is missing.
`main.js` uses `createElement` so the fixture needs no JSX plugin.

Expected: both checks pass. The testing docs say `checkPattern` "checks its roles, names, states, references between parts, and keyboard interactions", and that `root` is "the widget's element, or an element around it" ([testing.mdx](https://github.com/vercel-labs/ui/blob/d55a1d825fd19d285ef4a3bd4c4ff1622df08373/apps/docs/content/docs/core/testing.mdx?plain=1#L12-L21)).

Actual:

```text
accessibility tree: 2 radios, 1 checked
RadioGroup checkPattern:
checkPattern found 7 problems with the radio-group pattern:
- div[role=radiogroup]: has 2 checked radios; one is checked at most (APG radio group).
- button[role=radio] "Standard": ArrowDown should move focus to the next radio, input, but focus went to button[role=radio] "Express" (APG radio group).
...
CheckboxGroup checkPattern:
checkPattern found 1 problem with the checkbox pattern:
- input: has no accessible name; give it aria-label or aria-labelledby (APG checkbox).

without the aria-hidden inputs: radio-group PASS, checkbox PASS
```

Controls in the same page:

- Playwright's accessibility tree has 2 radios with 1 checked, so a screen reader sees a valid group.
- Removing only the `aria-hidden` inputs from the rendered DOM makes both checks pass, which isolates them as the cause.
