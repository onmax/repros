# Vite dev cannot serve a virtual module whose id contains `#`

A plugin resolves `virtual:with-hash` to `\0#app/abilities`. In dev, Vite rewrites the import in `/main.js` to `/@id/__x00__#app/abilities`. The browser treats `#app/abilities` as a fragment and requests `/@id/__x00__`, which is not the module, so the page's module graph fails to load. The same plugin with `\0virtual:app/abilities` works.

`wrapId()` (`packages/vite/src/shared/utils.ts`) replaces `\0` with `__x00__` but leaves `#` as is.

## Verify

```sh
pnpm install
pnpm verify
```

`verify.mjs` starts the dev server on port 48761, reads the import URLs that Vite wrote into `/main.js`, resolves each one with `new URL()` (the same parser the browser uses, which drops the fragment), and requests it. It exits 1 when a virtual module does not load.

## Result

vite 8.3.8, Node 24.21.0, Linux:

```
/@id/__x00__#app/abilities
  browser requests /@id/__x00__ -> 500 null (not the module)
/@id/__x00__virtual:app/abilities
  browser requests /@id/__x00__virtual:app/abilities -> 200 text/javascript

FAIL: a virtual module whose id contains `#` cannot be loaded by the browser
```

In headless Chromium the page shows the same: `GET /@id/__x00__` answers 500 and `main.js` never runs. When `/@id/__x00__` is requested before `/main.js`, it answers the SPA `index.html` with 200 instead.
