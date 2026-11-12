# ui-sdk: PageDown wraps around in a combobox

A `ui-combobox` lists Item 1 to Item 12.
With Item 12, the last item, highlighted, PageDown moves the highlight back to Item 10 instead of staying on Item 12.
A `ui-select` with the same items stays on Item 12.

Tested on Linux with Node 24.21.0, pnpm 12.18.0 and Playwright 1.63.0 Chromium (chromium-1254).
The lockfile pins `@ui-sdk/web` and `@ui-sdk/core` 0.1.0-beta.1 and Vite 8.3.8.
The page runs as a production build (`vite build`, then `vite preview` on port 5394).

```sh
git clone --single-branch --branch repro/ui-sdk-combobox-pagedown-wraps https://github.com/onmax/repros.git
cd repros/ui-sdk-combobox-pagedown-wraps
bash verify.sh
```

`verify.sh` installs from the lockfile, builds, serves, drives Chromium, stops the server and checks the port is free.
It exits 0 when the control passes and the bug reproduces:

```text
control: ui-select, PageDown on the last of 12 items
  expected {"before":"Item 12","afterPageDown":"Item 12"}
  actual   {"before":"Item 12","afterPageDown":"Item 12"}
repro: ui-combobox, PageDown on the last of 12 items
  expected {"before":"Item 12","afterPageDown":"Item 12"}
  actual   {"before":"Item 12","afterPageDown":"Item 10"}
VERIFIED: the bug reproduces and the control passes
```

`before` and `afterPageDown` are the text of the item with `data-highlighted`.
The combobox opens on its last item with ArrowUp.
The select opens with ArrowDown, then End moves to its last item, because Home and End stay with the caret in a combobox input.

## Why it is wrong

The [APG listbox keyboard interaction](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/#keyboardinteraction) describes Page Down as moving focus down about 10 options, and the [combobox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/#keyboardinteraction) as jumping down one or more options.
Neither moves backwards.
ui-sdk's own Select keeps the highlight on the last item, and the combobox docs describe wrapping only for [ArrowDown and ArrowUp](https://github.com/vercel-labs/ui/blob/d55a1d825fd19d285ef4a3bd4c4ff1622df08373/apps/docs/content/docs/web-components/components/combobox.mdx?plain=1#L853).

## Cause

PageDown asks for a step of 10 ([listbox-keyboard.ts#L24-L25](https://github.com/vercel-labs/ui/blob/d55a1d825fd19d285ef4a3bd4c4ff1622df08373/packages/core/src/foundation/lists/listbox-keyboard.ts#L24-L25)).
The listbox engine passes it to `moveIndex` with the list's `loop` setting ([listbox-engine.ts#L633](https://github.com/vercel-labs/ui/blob/d55a1d825fd19d285ef4a3bd4c4ff1622df08373/packages/core/src/foundation/lists/listbox-engine.ts#L633)), and `moveIndex` takes `(index + step) mod count` when looping ([collection.ts#L138-L141](https://github.com/vercel-labs/ui/blob/d55a1d825fd19d285ef4a3bd4c4ff1622df08373/packages/core/src/foundation/focus/collection.ts#L138-L141)).
From index 11 of 12, that gives index 9, Item 10.
By the same arithmetic, PageDown from the first of 10 items returns to the first; the hunt also saw PageDown on the last of 10,000 items land on Item 10.

## Fixture

`index.html` holds one combobox and one select; `main.js` loads both elements and fills each with the same 12 items.
Twelve items, more than a page of 10, make the wrap visible from the last item.
The original hunt also saw it in Autocomplete and Command; this fixture tests only the web combobox.
The reproduction was reduced from `tests/specs/hunt-coll-page.spec.ts` in a vercel-labs/ui checkout at the commit above.
