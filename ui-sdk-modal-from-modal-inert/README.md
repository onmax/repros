# ui-sdk: confirm() from inside a modal dialog opens an inert question

With a modal `ui-dialog` open, a button inside it calls the shared `confirm()`.
The question renders as an `alertdialog` inside `ui-overlay-host`, but the open dialog makes the overlay host inert.
Focus falls to `<body>`, and the question's Discard button cannot be clicked.

Called with no dialog open, the same `confirm()` works.

Tested on Linux with Node 24.21.0, pnpm 12.18.0 and Playwright 1.63.0 Chromium (chromium-1254).
The lockfile pins `@ui-sdk/web` and `@ui-sdk/core` 0.1.0-beta.1 and Vite 8.3.8.
The page runs as a production build (`vite build`, then `vite preview` on port 5390).

```sh
git clone --single-branch --branch repro/ui-sdk-modal-from-modal-inert https://github.com/onmax/repros.git
cd repros/ui-sdk-modal-from-modal-inert
bash verify.sh
```

`verify.sh` installs from the lockfile, builds, serves, drives Chromium, stops the server and checks the port is free.
It exits 0 when the control passes and the bug reproduces:

```text
control: confirm() with no dialog open
  expected {"inert":false,"focus":"Keep editing","clicked":true,"result":"discarded"}
  actual   {"inert":false,"focus":"Keep editing","clicked":true,"result":"discarded"}
repro: confirm() from a button inside an open modal dialog
  expected {"inert":false,"focus":"Keep editing","clicked":true,"result":"discarded"}
  actual   {"inert":true,"focus":"<body>","clicked":false,"result":""}
VERIFIED: the bug reproduces and the control passes
```

`inert` says whether the question sits inside an `[inert]` ancestor, `focus` is the focused element after 300 ms, `clicked` whether Playwright could click "Discard" within 2 s, and `result` what the page wrote after `confirm()` resolved.

## Why it is wrong

ui-sdk documents that [a dialog opened inside another joins its stack](https://github.com/vercel-labs/ui/blob/d55a1d825fd19d285ef4a3bd4c4ff1622df08373/apps/docs/content/docs/web-components/components/dialog.mdx?plain=1#L215).
The [APG dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) says that when a dialog opens, focus moves to an element inside it, and only the content under the dialog is inert.

## Cause

A popup finds its parent layer only through its trigger ([popup.ts#L966](https://github.com/vercel-labs/ui/blob/d55a1d825fd19d285ef4a3bd4c4ff1622df08373/packages/core/src/foundation/popups/popup.ts#L966)).
A dialog opened by code (`confirm()`, a dialog controller or `api.open()`) has no trigger, so it gets no parent.
The open dialog's `keep` exemption ([popup.ts#L1105-L1108](https://github.com/vercel-labs/ui/blob/d55a1d825fd19d285ef4a3bd4c4ff1622df08373/packages/core/src/foundation/popups/popup.ts#L1105-L1108)) never reaches the new dialog, and the first dialog's inert marking covers it.

## Fixture

`index.html` holds one modal dialog with a button, a button outside it, an `<output>`, and `ui-overlay-host`, which renders `confirm()` questions.
`main.js` wires both buttons to the same `confirm()` call.
The dialog title was removed because the verdict does not depend on it.
The reproduction was reduced from `tests/specs/hunt-popups-confirm.spec.ts` in a vercel-labs/ui checkout at the commit above.
