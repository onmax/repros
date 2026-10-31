# Fixed control: `copied` only after a successful copy

Same page and verifier as [`../vueuse-clipboard-copied-on-failure`](../vueuse-clipboard-copied-on-failure), with `patches/@vueuse__core@15.0.0.patch` applied to `@vueuse/core` 15.0.0. The patch makes `legacyCopy()` return what `execCommand('copy')` returns, sets `copied` only when the copy worked, and sets a new `error` ref when it didn't.

```sh
git clone --branch repro/vueuse-clipboard-copied-on-failure https://github.com/onmax/repros
cd repros/vueuse-clipboard-copied-on-failure-fix
pnpm install
pnpm verify
```

```text
PASS copy() from a click: clipboard "COPIED TEXT", button "Copied"
PASS copy() outside a user gesture: clipboard "BEFORE", button "Share"
PASS: `copied` is true only when the text reached the clipboard
```
