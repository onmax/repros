# ui-sdk Select label mixes the page language with English

A multiple Select with `maxLabels: 2` joins its labels with `Intl.ListFormat` in the page's language, but the default count text is hardcoded English.
On a Spanish page or runtime the label reads `Apple, Banana y 2 more`.

Found in a bug hunt of [vercel-labs/ui](https://github.com/vercel-labs/ui) at commit d55a1d82.
The default count is [`${count} more`](https://github.com/vercel-labs/ui/blob/d55a1d825fd19d285ef4a3bd4c4ff1622df08373/packages/core/src/foundation/lists/listbox-value.ts#L21) and the list format uses [`pageLocale()`](https://github.com/vercel-labs/ui/blob/d55a1d825fd19d285ef4a3bd4c4ff1622df08373/packages/core/src/foundation/lists/listbox-value.ts#L34).
The package's own unit test `packages/core/test/listbox-rows.test.ts` fails under `LANG=es_ES.UTF-8` for the same reason.

Tested on Linux with Node 24.21.0 (ICU 78.3) and pnpm 10.34.5.
The lockfile pins the published `@ui-sdk/core@0.1.0-beta.1`.

```sh
git clone --single-branch --branch repro/ui-sdk-format-labels-locale https://github.com/onmax/repros.git
cd repros/ui-sdk-format-labels-locale
bash verify.sh
```

The verifier exits 0 when the bug reproduces and the control passes.
It reads the Select value part's state through `partState` from `@ui-sdk/core/renderer`, the same state the adapters render.
Without a `document`, `pageLocale()` falls back to the runtime's default locale, so the verifier runs the same code in two child processes with `LC_ALL` set to `en_US.UTF-8` (control) and `es_ES.UTF-8` (repro).
In a browser, `<html lang="es">` gives the same text.

Expected: the label in one language.
Actual:

```text
node v24.21.0, icu 78.3
control en_US: expected "Apple, Banana, and 2 more", actual "Apple, Banana, and 2 more"
repro   es_ES: expected one language, not Spanish "y" with English "more"; actual "Apple, Banana y 2 more"
Reproduced: the list joins in Spanish but the default count stays English.
```
