# VueUse `useClipboard`: `copied` is true after a failed copy

`useClipboard().copy()` sets `copied` to `true` even when the browser refuses the copy. If `navigator.clipboard.write` rejects, it falls back to `document.execCommand('copy')`, ignores the `false` that call returns, and reports success. The docs say `copied` is "`true` after successful copy".

In Safari this shows "Copied" while the clipboard keeps its old contents, for example when Monaco cancels the write ([comarkdown/comark#526](https://github.com/comarkdown/comark/pull/526)).

## Run

```sh
git clone --branch repro/vueuse-clipboard-copied-on-failure https://github.com/onmax/repros
cd repros/vueuse-clipboard-copied-on-failure
pnpm install
pnpm verify
```

`pnpm verify` serves `index.html` on localhost, opens it in Playwright's Chromium, and runs two copies. Before each one it puts `BEFORE` on the clipboard, then pastes afterwards to see what the clipboard holds. It exits 1 when `copied` doesn't match the clipboard.

1. `copy()` from a click. The copy works.
2. `copy()` outside a user gesture. The page waits until `navigator.userActivation.isActive` is false, then calls `copy()` itself. Chromium refuses both the Clipboard API write and `execCommand('copy')`. Playwright's `evaluate()` counts as a gesture, so the call has to come from the page.

## Expected and actual

Pinned: `@vueuse/core` 15.0.0 (same `copy()` as `main` at `bd187a7f`), `vue` 3.5.44, `playwright` 1.64.1 (Chromium 156).

```text
PASS copy() from a click: clipboard "COPIED TEXT", button "Copied"
FAIL copy() outside a user gesture: clipboard "BEFORE", button "Copied"
FAIL: `copied` does not match whether the text reached the clipboard
```

Expected: the second copy leaves the button on "Share".

The fixed control in [`../vueuse-clipboard-copied-on-failure-fix`](../vueuse-clipboard-copied-on-failure-fix) runs the same page and verifier against a `pnpm patch` of 15.0.0 that sets `copied` only on success and exposes an `error` ref. It prints `PASS` for both copies.

Playwright's WebKit lets pages use the clipboard without a gesture, so it can't show the refused copy. Chromium can.
