# @pierre/trees: the search input has no label and sits inside `role="tree"`

With `search: true`, `FileTree` renders its search input with only `placeholder="Search…"`. The input has no `aria-label`, no `aria-labelledby`, and no `<label>`. `FileTreeOptions` has no option to set a label or change the placeholder. The browser falls back to the placeholder for the accessible name, so a screen reader announces "Search…" in English, whatever the page language is. The input also renders inside the element with `role="tree"`, and axe reports it as a child that the tree role does not allow.

## Environment

- `@pierre/trees` 1.0.0-beta.6, the `latest` and `beta` tag at the time of writing. Pierre's main branch at [`70d1e348`](https://github.com/pierrecomputer/pierre/blob/70d1e3487fb9413be4a51b72f367015a764edbaf/packages/trees/src/render/FileTreeView.tsx#L3743-L3792) renders the same input.
- Chromium 1248 from Playwright 1.64.1, axe-core 4.14.0, esbuild 0.28.2, Node 24.21.0, pnpm 11.18.0.
- The app is the vanilla `FileTree` with one path and `search: true`, rendered into a `<div>`. See [`src/main.js`](src/main.js).

## Verify

```sh
git clone --branch repro/pierre-trees-search-input-label https://github.com/onmax/repros.git
cd repros/pierre-trees-search-input-label
pnpm install
pnpm verify
```

`verify` bundles `src/main.js` with esbuild and loads it into a blank page in headless Chromium. Then it reads the search input's attributes, the accessible name that Chromium computes for it, and the results of axe's `label` and `aria-required-children` rules. It starts no server.

| Check | Expected | Actual on 1.0.0-beta.6 |
| --- | --- | --- |
| `aria-label`, `aria-labelledby`, or `<label>` on the search input | one of them | none |
| Source of Chromium's accessible name for the input | the label | `placeholder`, so the name is "Search…" |
| Search input inside the `role="tree"` element | no | yes |

The script exits 1 when a check fails. Output on 1.0.0-beta.6:

```text
@pierre/trees 1.0.0-beta.6, Chromium chromium-1248
dist/render/FileTreeView.js:1806: placeholder: "Search…",

Search input markup: {
  ariaLabel: null,
  ariaLabelledby: null,
  labelElements: 0,
  placeholder: 'Search…',
  insideTree: true
}
Chromium accessible name: role=textbox name="Search…" from=placeholder
axe label: passes (non-empty-placeholder, hidden-explicit-label)
axe aria-required-children: violations (aria-required-children)
  Fix any of the following:
    Element has children which are not allowed: input[aria-controls]

FAIL on @pierre/trees 1.0.0-beta.6:
- the search input has no aria-label, no aria-labelledby, and no <label>
- the search input's accessible name "Search…" comes from its placeholder
- the search input is inside the role="tree" element
```

## Notes

- axe's `label` rule passes this input through its `non-empty-placeholder` check, so an automated audit does not report the missing label. The placeholder still disappears once you type, and no option can translate it.
- The placeholder is a string literal in `dist/render/FileTreeView.js`. The search options in `publicTypes.ts` control behavior only: [`fileTreeSearchMode`, `initialSearchQuery`, `onSearchChange`](https://github.com/pierrecomputer/pierre/blob/70d1e3487fb9413be4a51b72f367015a764edbaf/packages/trees/src/model/publicTypes.ts#L89-L92) and [`search`, `searchFakeFocus`, `searchBlurBehavior`](https://github.com/pierrecomputer/pierre/blob/70d1e3487fb9413be4a51b72f367015a764edbaf/packages/trees/src/model/publicTypes.ts#L242-L250).
- esbuild bundles the app, and axe-core inspects the page. The fixture needs nothing else.
- `@pierre/trees` declares `react` and `react-dom` as peers, so pnpm installs them. The vanilla entry does not use them.
