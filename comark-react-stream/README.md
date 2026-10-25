# React streaming reparses completed paragraphs

With `@comark/react` 0.8.1, updating a mounted `MarkdownClient` with `streaming: true` tokenizes the entire new string on every update. Completed paragraphs render correctly but pass through tokenization again. This fixture uses the actual React client component, `react-dom/client.createRoot`, and Happy DOM.

The expected behavior is to reuse completed paragraph prefixes in an append-only stream. The same package's retained `createMarkdownParser` can do so for these inputs. That parser is a diagnostic control, not a fixed or compatibility-tested React component.

## Run

From this branch's fixture directory, with Node 24.21.0 and Corepack-enabled `pnpm` or pnpm 11.18.0:

```sh
bash verify.sh
```

This unattended command installs the frozen lockfile, runs the three-value correctness case, then runs the 400-value case. It exits zero only when the reported full-content reparse and the narrower retained-parser control both reproduce. It uses `heavy` when available and allows package downloads when the dependency cache is empty.

This task uses the following offline variant, with the package manager and locked dependencies already cached:

```sh
REPRO_OFFLINE=1 bash verify.sh
```

Offline mode also disables Corepack network access. Every install performed while preparing this branch uses offline mode and the shared heavy-job lock.

The separate regression check expects incremental input and fails on the pinned release:

```sh
heavy --light pnpm check
```

Use `pnpm check` where `heavy` is unavailable. After testing a future package version and regenerating the lockfile, this check should pass when React reuses every prefix that the diagnostic parser demonstrates is reusable. `pnpm verify` instead preserves the present-bug assertion and should fail after that behavior changes.

## Results

The actual React client reproduced full-content tokenization in both cases:

| Case | Final source | React, streaming true | React, streaming false | Retained parser diagnostic |
| --- | ---: | ---: | ---: | ---: |
| Three committed values | 20 characters | 48 characters | 48 characters | 36 characters |
| 400 committed values | 18,000 characters | 3,609,000 characters | 3,609,000 characters | 36,353 characters |

The large case feeds 99.28 times as many characters into tokenization through the React component as through the diagnostic API. Both paths make 400 parser calls. React's last call receives all 18,000 characters; the retained parser's last call receives 91. This is an input-volume comparison, not a measured component speedup.

The desired-behavior check exits 1 with this assertion:

```text
AssertionError [ERR_ASSERTION]: streaming=true value 2 tokenized all 16 characters; the retained parser tokenized 10
```

[verification.txt](verification.txt) records the clean install and both confirmation runs. [regression-check.txt](regression-check.txt) records `heavy --light pnpm check`, including its nonzero exit. The clean verification starts with `node_modules` moved aside to an ignored `.cache/initial-node_modules` directory, then runs `REPRO_OFFLINE=1 bash verify.sh`.

## What is measured

The small case sends these three values to one mounted client, awaiting `act` and asserting exact rendered HTML after each value:

```js
['alpha\n\nomega', 'alpha\n\nomega one', 'alpha\n\nomega one two']
```

A single read-only public plugin records `state.markdown` in its `pre` hook immediately before tokenization. `autoClose: false` and `registerDefaultPlugins: false` leave that hook as the only preprocessor and keep the source unchanged. The same options object, plugins array, plugin object, root, and component identity survive every update. StrictMode is absent. Repeating the final value must not parse again. A separate mounted client with `streaming: false` changes only that prop.

The quantitative case appends 400 separate 45-character paragraphs. It has 400 committed content values, comprising one mount and 399 content updates, and ends with 18,000 source characters. The full-prefix sum is `45 * 400 * 401 / 2`, or 3,609,000 characters. Every React value must commit all expected paragraphs and bold text before the next update begins. Both roots are unmounted, and Happy DOM is closed.

The retained-parser control keeps one parser and passes `{ streaming: true }` on every invocation. Its final document is rendered with `MarkdownDocument` through a separate client root and must match the same expected HTML. The React component itself is never replaced or patched.

String lengths count UTF-16 code units. All fixture input is ASCII, so these also equal source bytes. The probe measures tokenizer input volume, not total parser work, allocation volume, React scheduling, or browser frame rate. React timing includes client rendering and DOM assertions; retained timing covers parser calls only. Their times are descriptive and must not be interpreted as a component speedup. Deterministic strings and DOM assertions decide the verdict.

## Environment and provenance

- Node 24.21.0 and pnpm 11.18.0.
- `@comark/react` 0.8.1, `comark` 0.8.1, React and React DOM 19.3.1, Happy DOM 20.9.0. Direct dependencies are exact and transitive dependencies are locked. The workspace overrides `js-yaml` to 5.4.3 to match the installed study graph and its cached `argparse` 2.0.1 dependency.
- Branch `repro/comark-react-stream`, based on `onmax/repros` main `b4f238c`, supplied by the coordinating task.
- The coordinating task verified upstream main as `1003f5ceb75ed8088568b8e21ef4346c2c083cbf` on 2026-10-25. This fixture executes the published 0.8.1 packages; it does not build that upstream commit.
- No upstream issue was supplied or opened. Package source is from `comarkdown/comark`. This branch contains only a reproduction and diagnosis.

In the published `@comark/react/dist/components/MarkdownClient.js`, lines 17 through 19 call `parseMarkdown(content, ...)` in a memo depending on `content`. In `comark/dist/parse.js`, lines 167 through 169 create a fresh parser and invoke it without streaming options. The retained parser's reuse is at lines 83 through 91, before the public `pre` hook at lines 105 through 109 and tokenization at line 111. The React `streaming` prop reaches the renderer instead.

## Limits and proposed upstream scope

This is a deterministic DOM client test with React's development build, not browser automation or server rendering. It covers sequential append-only paragraph updates with stable configuration. It does not cover interrupted concurrent renders, overlapping parser work, replacements, frontmatter, reference definitions, custom components, default plugins, or hydration. It makes no compatibility claim for switching the component to the retained parser.

A future React-focused PR could preserve parser state for a mounted streaming client and pass the streaming parse option, with explicit reset behavior for replacement content and configuration changes. It would need client regression tests for append-only updates, option changes, async plugins, and unmounting. That implementation and validation are outside this branch.

Local directory prefixes in the recorded output are replaced with `<fixture>` and `<home>` for publication. Observed values and errors are unchanged.
