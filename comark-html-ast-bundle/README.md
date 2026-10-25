# HTML AST renderer retains Markdown and YAML serializers

Given `@comark/html@0.8.1` and esbuild `0.28.2`, bundle only this public export for the browser:

```js
export { renderHtmlFromDocument } from '@comark/html';
```

The desired result is an HTML renderer without Markdown serializer handlers or YAML code. The current bundle retains both. The verifier identifies modules with positive `bytesInOutput` in the emitted bundle, rather than treating every module esbuild reads as retained code. It also executes that bundle against seven explicit AST cases.

This is a local bundle investigation, with no upstream issue filed. The fixture is on local branch `repro/comark-html-ast-bundle`, based on `onmax/repros` main `b4f238c6bb321e315264c2748ab600354ebd60e8`. The parent investigation verified [Comark main at `1003f5c`](https://github.com/comarkdown/comark/commit/1003f5ceb75ed8088568b8e21ef4346c2c083cbf) on 2026-10-25. This fixture runs the published npm packages, not a build of that commit. It does not independently establish the same result for upstream main.

The fixture's installed dependencies reproduced these measurements:

- Baseline: **75,766 raw bytes / 32,951 gzip bytes**, with 2 retained YAML inputs and 20 Markdown handler modules.
- Diagnostic: **8,289 raw bytes / 3,576 gzip bytes**, with zero retained YAML inputs or Markdown handlers.
- Difference: **67,477 raw bytes / 29,375 gzip bytes**, about 89% of each baseline size. This is a diagnostic estimate subject to the contract limits below.

Both bundles passed all seven literal HTML cases. `pnpm check` exited 1 with `FAIL: expected 0 unrelated YAML/Markdown inputs; actual 22`. The diagnostic separately confirmed that two existing behaviors break when the extra handlers are removed.

The baseline metafile attributes 32,123 emitted bytes to `js-yaml`, 23,858 to `entities`, and 8,120 to the 20 Markdown handler modules. The diagnostic removes those contributions plus other serializer helpers. `markdown-exit` contributes zero emitted bytes in this bundle. The retained code here is serialization code and its dependencies.

## Run

Use Node `24.21.0` and pnpm `11.18.0`. The recorded run used Linux x64. `package.json`, `.node-version`, and the lockfile pin the runtime and package inputs. The runner uses the shared `heavy` lock when available, including on Slimbook, and runs directly on other machines.

`pnpm-workspace.yaml` pins transitive `js-yaml` to `5.4.3`, matching the original measured installation. An initial offline resolution selected `5.5.0`, whose `argparse@3.0.4` tarball was absent from the cache. The explicit pin preserves the measured graph; the committed lockfile freezes the remaining transitive dependencies. Optional peers are not auto-installed.

From the branch root, run:

```sh
bash comark-html-ast-bundle/reproduce.sh
```

This installs the frozen lockfile, downloading dependencies if the local store is empty, then builds the unmodified package export and one diagnostic variant. It exits zero only when the retained-dependency symptom and all output assertions hold. An absent bug, failed build, or output mismatch fails the command. `node_modules` can be removed before this command to exercise a clean install.

The exact offline command used for verification here is:

```sh
bash comark-html-ast-bundle/reproduce.sh --offline
```

`REPRO_OFFLINE=1` also selects offline mode. This requires the locked packages and pnpm version in the existing local caches, passes `--offline` to pnpm, and disables Corepack network access. All installs performed during this investigation used offline mode through `heavy`. The empty-cache network installation path is provided for other users and was not exercised here.

The separate desired-behavior check exits **1** for the affected package:

```sh
cd comark-html-ast-bundle
pnpm check
```

On Slimbook, run that last command as `HEAVY_WAIT=0 heavy --light pnpm check`.

It builds only the real public export, verifies the HTML corpus, and expects zero retained YAML modules or Markdown handlers. It skips the diagnostic and its version-specific contract counterexamples, so a future implementation that removes these dependencies can pass this check. Updating the package version and lockfile is a separate action.

Each run writes its full metafiles under ignored `.output/`. Reproduction mode also writes `.output/report.json` with per-module contributions, corpus output, bundle hashes, byte counts, and build durations. The committed `evidence/` records the verified run. Byte counts describe these pinned builds; timing is descriptive and does not decide any assertion.

The documented offline command passed after removing the fixture's `node_modules`. It installed all 15 packages from cache with zero downloads. `evidence/clean-install.txt` records its output and exit 0; `evidence/desired-check.txt` records the expected exit 1. `evidence/metafile-outputs.json` preserves both esbuild output records. `evidence/repeatability.json` records identical bundle hashes and sizes before and after the clean install; the retained inputs and all seven HTML outputs also matched.

## Diagnostic and contract limits

`@comark/html/dist/render.js` calls `comark/render`. The latter creates serializer state whose `handlers` value is the shared registry in `comark/dist/internal/stringify/handlers/index.js`. The registry imports the Markdown handlers. The MDC handler uses `comarkYamlAttributes`, which reaches `stringifyYaml` and `js-yaml`.

The diagnostic changes exactly one module through an esbuild `onLoad` hook, in memory:

```js
import { html } from './html.js';
import { comment } from './comment.js';
export const handlers = { html, comment };
```

No installed or upstream source is edited. The same public package export, browser build settings, and HTML corpus are used for both bundles. The control must remove all retained YAML code and Markdown handlers. It must preserve every literal expected HTML output, including escaping, bound attributes, comments, an async custom component using `state.render`, and a conditional custom handler using `state.handlers.html`.

This is a diagnostic estimate of the code tied to the shared registry. It is **not a compatible fix**. Two executable counterexamples show why:

- `renderHtmlFromDocument` spreads caller options after `format: 'text/html'`. A caller can currently request `format: 'markdown/comark'`. The baseline renders a heading as `# Title`; the diagnostic throws a `TypeError` when it reaches the removed `mdc` fallback.
- The public `NodeHandler` receives serializer `State`, including `handlers`, `context`, `one`, `flow`, and `applyContext`. A custom component can call `state.handlers.strong`. The baseline returns `**value**`; the diagnostic throws a `TypeError` because that handler is absent. Custom code can also change rendering context.

Seven HTML cases establish only the explicitly tested behavior. They do not validate all custom-handler contracts, alternate formats, raw HTML behavior, sanitization, browser execution, or every AST shape. The browser ESM output is executed in Node without a DOM because this renderer returns strings. Build mode uses minification, target `es2022`, no externalized dependencies, and `write: false`.

The retained serializers remain reachable through the existing public contract. This finding identifies an HTML API dependency boundary to reconsider; it does not establish a tree-shaking defect in esbuild.

The fixture needs no Markdown parser input, UI framework, dev server, network fetch, or full application. `@comark/html` is the only application dependency; `comark` and YAML arrive transitively. esbuild provides both the real browser build and the deterministic retained-input evidence. The HTML corpus and the one registry override diagnose the dependency relationship, not the baseline import itself.

## Proposed upstream scope

Agree on the HTML renderer's alternate-format and custom-state contracts first. Then isolate an HTML rendering path without implicitly importing the complete Markdown registry, while preserving the existing generic serializer contract. If preserving the current `renderHtmlFromDocument` behavior requires all handlers, consider a separate explicitly restricted entry rather than silently deleting capabilities. Add a public-export browser bundle assertion and HTML/custom-handler regressions. The diagnostic byte reduction is an opportunity estimate, not a promise for a compatibility-preserving implementation.
