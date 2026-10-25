# Comark alert revisits the stable streaming prefix

Given Comark 0.8.1 and a streaming parser, appending one character should let the default alert plugin skip nodes already processed and reused unchanged. Instead, alert checks every element in the stable prefix again, even when the document contains no alerts.

Two paragraphs and one append are enough to fail the desired-behavior check. The larger cases measure how that work grows.

## Run

Use Node **24.21.0**, pnpm **11.18.0**, and the committed lockfile. Install Node first and make pnpm available directly or through Corepack. No browser, server, or credentials are needed.

From this directory:

```sh
bash verify.sh
```

This installs with `--frozen-lockfile --ignore-scripts`, fetching missing packages when needed, checks the exact operation counts, verifies the controls, and prints timing samples. It exits 0 only when the current bug is confirmed. On Slimbook it runs the install through `HEAVY_WAIT=0 heavy` and the runtime through `heavy --light`. Other machines run the same commands without that local scheduler. The script has mode 100644 and must be invoked through Bash.

The exact offline command verified for this report is:

```sh
bash verify.sh --offline
```

`REPRO_OFFLINE=1 bash verify.sh` is equivalent. Offline mode also disables Corepack downloads and requires the pinned pnpm version and lockfile packages in the local cache. Every install performed while preparing this fixture used offline mode through `heavy`.

The desired-behavior command is separate:

```sh
bash verify.sh --check
```

Add `--offline` to use cached packages. It currently exits 1 with:

```text
CHECK stable_element_nodes=2 appends=1 actual_alert_revisits=2 expected=0
AssertionError [ERR_ASSERTION]: Default alert must not revisit unchanged stable nodes on an incremental append
2 !== 0
```

After dependencies are installed, the runtime-only commands are:

```sh
heavy --light pnpm verify
heavy --light pnpm check
```

`--check` contains no assertions requiring the current broken count or tokenizer suffix lengths. Its expected value is zero reads of the protected stable prefix. When evaluating a future package, update the pinned dependency and lockfile, then run this mode. The tracer and observed object identities must remain available; a change to those measurement boundaries needs a probe update.

## Deterministic result

Each seed paragraph is the 32-character string `Plain paragraph with **bold**.\n\n`. On the first append, the parser reuses every seed paragraph except the last as a stable prefix. Each observed paragraph contains two element nodes, `p` and `strong`.

The verifier appends `x` 40 times using the same `createMarkdownParser()` instance with `{ streaming: true }` on every parse.

| Seed paragraphs | Seed characters | Stable paragraphs observed | Element reads per append in alert | Reads across 40 appends | Characters presented for tokenization across appends |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 2 | 64 | 1 | 2 | 80 | 892 |
| 1,000 | 32,000 | 999 | 1,998 | 79,920 | 892 |
| 4,000 | 128,000 | 3,999 | 7,998 | 319,920 | 892 |
| 8,000 | 256,000 | 7,999 | 15,998 | 639,920 | 892 |

Every protected element is read exactly once inside every alert post hook. The total is `2 * (seedParagraphs - 1) * appends`. These are reads on the original stable prefix only; the newly parsed suffix and text nodes are excluded.

The final user plugin's `pre` hook records the source handed to the tokenizer. It sees 34 characters on the first append and 3 through 41 on the remaining appends, totaling 892, independent of prefix size. Initial parsing is excluded. The first append reparses the seed's last paragraph; subsequent appends reparse the growing `x` paragraph. The stable prefix is reused by object identity before and after every alert hook.

## How the probe isolates alert

The fixture uses Comark's public `tracer` option and observes the `comark:post:alert` span. After the initial parse, it replaces index `0` on stable `p` and `strong` arrays with getters and setters that preserve their values. Getters count only while that span is active. No package files, visitor functions, or globals are modified.

The fixture checks that every watched node retains its identity and getter, that each append reaches the output, and that JSON serialization outside the alert span does not increment the counter. A real alert smoke test verifies that the tracing boundary remains observable. A missing boundary or detached observation cannot silently turn the regression green.

The baseline default plugins are unchanged. The diagnostic control overrides only alert with `{ name: 'alert' }`, which Comark's plugin deduplication treats as a replacement. On this no-alert corpus, that control has zero alert reads and an identical final AST, including streaming position metadata. This no-op is cost attribution only. It removes alert functionality and is not a fix or a compatibility-tested replacement.

A separate default-plugin smoke test parses a real `> [!NOTE]` alert both in one call and in four streamed chunks, including a split marker. Both must preserve `as: 'note'` and the message text.

## Diagnosis and scope

The published 0.8.1 JavaScript makes the boundary explicit:

- `dist/parse.js:139` constructs `state.tree.nodes` from reused nodes followed by newly parsed nodes. Lines 157 to 160 then invoke each post hook on that whole tree.
- `dist/plugins/alert.js:33` calls `visit(state.tree, ...)` with `Array.isArray(node) && node[0] === 'blockquote'` as its predicate.
- `dist/utils/index.js:21` begins the recursive visitor. It descends into children even when their parent does not match the predicate.
- `dist/internal/parse/utils.js:64` selects reusable prefix nodes by a shallow slice.
- `dist/utils/trace.js:9` exposes the span used by the probe.

This demonstrates repeated alert work proportional to stable prefix size on this input. It does not establish the complexity of the complete parser; prefix extraction and other hooks may have separate costs.

A proposed upstream PR would limit default alert processing to changed nodes during incremental parsing, with regressions for stable-prefix reuse, streamed alert markers, completed alerts retained in the prefix, and full reparses when reuse is invalidated. This branch contains no implementation of that proposal.

## Timings and limitations

The verifier also measures 8,000 seed paragraphs and 40 appends without any AST getters. It runs two warm-up pairs and five measured pairs, alternating baseline/control order. Each run has a fresh parser; seed parsing and final serialization are outside the timer. It prints total parse time, time inside the default alert span, and the disabled-alert total, then the medians. Every timed AST must equal the instrumented run's final AST.

The clean run recorded medians of 158.418 ms total, 135.286 ms inside alert, and 21.935 ms with alert disabled, a 7.22x total-time ratio.

Timings are descriptive on shared Slimbook hardware. No elapsed-time or ratio threshold decides the verdict. See `evidence/confirmation.txt` for the actual sample values and `evidence/check.txt` for the failing desired-behavior run.

The getter probe changes array property descriptors, so its elapsed time is never used. The operation count measures tag inspection, not allocations or every visitor step. Real-alert correctness coverage is a smoke test, not a compatibility suite. A future shallow scan of stable paragraph roots would still fail this fixture's stricter requirement to skip the unchanged prefix entirely.

## Provenance

- Repro branch: `repro/comark-stream-alert`, based on `onmax/repros` main `b4f238c`.
- Runtime tested: Node 24.21.0, pnpm 11.18.0, Linux x64.
- Executed package: npm `comark@0.8.1`, pinned with transitive dependency integrity hashes in `pnpm-lock.yaml`. The workspace overrides `js-yaml` to 5.4.3, matching the installed study graph and its `argparse@2.0.1`. Without that pin, cached metadata selected `js-yaml@5.5.0` and an uncached `argparse@3.0.4`, which the first offline install correctly refused to download. The lockfile retains the study graph for all dependencies. Optional renderer peers are not installed.
- The task's upstream-main reference is `comarkdown/comark@1003f5ceb75ed8088568b8e21ef4346c2c083cbf`, reported verified on 2026-10-25. This fixture executes the published npm package; it does not build that Git commit.
- Source hashes and clean-install evidence are in `evidence/`.
- Source report: the parent task's observation that alert dominated incremental parsing of this no-alert corpus. No upstream issue, PR, push, or comment was created by this task.

Only the corpus, public parser call, scoped getter probe, control, assertions, and timing loop remain. There is no application framework or renderer because the repeated work happens inside the parser's alert hook.
