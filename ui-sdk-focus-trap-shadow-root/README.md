# ui-sdk: Tab escapes a modal dialog whose last control is in a shadow root

A modal `ui-dialog` contains an input and, last, a custom element whose button lives in an open shadow root.
With focus on that button, Tab leaves the dialog instead of wrapping to the input.
Focus goes to `<body>`, and the next Tab reaches the page behind the dialog while the dialog stays open.

When the last control is a light-DOM `<button>`, Tab wraps correctly.

Tested on Linux with Node 24.21.0, pnpm 12.18.0 and Playwright 1.63.0 Chromium (chromium-1254).
The lockfile pins `@ui-sdk/web` and `@ui-sdk/core` 0.1.0-beta.1 and Vite 8.3.8.
The page runs as a production build (`vite build`, then `vite preview` on port 5391).

```sh
git clone --single-branch --branch repro/ui-sdk-focus-trap-shadow-root https://github.com/onmax/repros.git
cd repros/ui-sdk-focus-trap-shadow-root
bash verify.sh
```

`verify.sh` installs from the lockfile, builds, serves, drives Chromium, stops the server and checks the port is free.
It exits 0 when the control passes and the bug reproduces:

```text
control: last control is a light-DOM <button>
  expected {"tab1":"First (in dialog)","tab2":"Last (in dialog)","dialogOpen":true}
  actual   {"tab1":"First (in dialog)","tab2":"Last (in dialog)","dialogOpen":true}
repro: last control is a <button> in an open shadow root
  expected {"tab1":"First (in dialog)","tab2":"Last (in dialog)","dialogOpen":true}
  actual   {"tab1":"<body> (outside dialog)","tab2":"Open light (outside dialog)","dialogOpen":true}
VERIFIED: the bug reproduces and the control passes
```

`tab1` and `tab2` name the focused element, looking through shadow roots, after the first and second Tab from the last control.

## Why it is wrong

ui-sdk's dialog docs say [`true`, the default, makes the page inert, locks scrolling, and keeps Tab inside](https://github.com/vercel-labs/ui/blob/d55a1d825fd19d285ef4a3bd4c4ff1622df08373/apps/docs/content/docs/web-components/components/dialog.mdx?plain=1#L191).
The [APG dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) says Tab from the last tabbable element inside the dialog moves focus to the first.

## Cause

The trap builds its list of stops with `tabbables(popup)` ([popup.ts#L1254-L1259](https://github.com/vercel-labs/ui/blob/d55a1d825fd19d285ef4a3bd4c4ff1622df08373/packages/core/src/foundation/popups/popup.ts#L1254-L1259)), which is a light-DOM `querySelectorAll` ([tabbable.ts#L61-L62](https://github.com/vercel-labs/ui/blob/d55a1d825fd19d285ef4a3bd4c4ff1622df08373/packages/core/src/foundation/focus/tabbable.ts#L61-L62)).
The shadow button is not in that list, so the trap never sees focus at the end and lets Tab move natively out of the dialog.

## Fixture

`index.html` holds two modal dialogs that differ only in their last control: a `<button>` or a `<shadow-button>`.
`main.js` loads `@ui-sdk/web/dialog` and defines `<shadow-button>` with an open shadow root holding one `<button>`.
The first input gives Tab a target to wrap to.
The reproduction was reduced from `tests/specs/hunt-popups-trap.spec.ts` in a vercel-labs/ui checkout at the commit above.
The hunter also saw it with `modal="trap-focus"` and on the other adapters and engines; this fixture checks only the default `modal` on web in Chromium.
