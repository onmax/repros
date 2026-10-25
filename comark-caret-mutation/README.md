# Caret rendering mutates shared Comark documents

In Comark 0.8.1, rendering the same parsed paragraph three times with a streaming caret produces one, then two, then three carets. Both React and Vue append into the caller's nested AST node. Rendering must leave that document unchanged and emit one caret each time.

This reproduction uses the public `MarkdownDocument` components through React and Vue server rendering. It proves render-time mutation and accumulation across repeated renders of a shared document. It does not measure browser hydration, component update latency, or heap bytes.

## Run

Use Node 24.21.0 and pnpm 11.18.0. From this fixture directory:

```sh
sh verify.sh
```

The command installs the locked dependencies, runs both renderers, checks the controls, and exits 0 only when the pinned bug reproduces. Pass `--offline` to reuse a populated pnpm store. On the shared Slimbook, run the command through `HEAVY_WAIT=0 heavy`.

The desired-behavior assertion is separate:

```sh
pnpm check
```

It exits 1 on 0.8.1 because the AST changes and caret counts accumulate. It should exit 0 after a correct fix. The verifier prints evidence for both frameworks before asserting.

The [recorded clean-install run](evidence/README.md) confirms both command exit codes and contains the complete output.

## Expected and observed

| Measurement, in both frameworks | Expected | Comark 0.8.1 |
| --- | --- | --- |
| Carets across three shared-document renders | 1, 1, 1 | 1, 2, 3 |
| Paragraph array length after each render | 3, 3, 3 | 4, 5, 6 |
| Caller input changed | No | Yes |
| Carets with caret disabled | 0, 0, 0 | 0, 0, 0 |
| Carets with a fresh input copy each render | 1, 1, 1 | 1, 1, 1 |

The disabled-caret control isolates the trigger. Fresh input copies show that reuse causes accumulation. Those copies are a diagnostic control, not a proposed deep-cloning fix. Each temporary copy is still mutated. One paragraph is enough to reach the nested-array append; no plugins or browser are needed.

## Cause and proposed PR

Both components copy the root node list, then the caret helper appends into an existing nested array. Copy the affected ancestor path, or render the caret without changing the document. Preserve placement after the last text and the no-text fallback. Avoid cloning the entire AST on every update.

The primary fixture contains no package patches or upstream changes. No upstream issue or PR has been opened for this repro.

## Provenance

- Baseline: `comark`, `@comark/react`, and `@comark/vue` 0.8.1.
- Renderers: React and React DOM 19.3.1; Vue and its server renderer 3.5.44.
- The YAML dependency is pinned to 5.4.3 to match the study's installed graph. Caret behavior does not use YAML, but this keeps dependency resolution stable across fixtures.
- Node 24.21.0, pnpm 11.18.0, Linux x64.
- Upstream main was still [`1003f5c`](https://github.com/comarkdown/comark/tree/1003f5ceb75ed8088568b8e21ef4346c2c083cbf) when checked on 2026-10-25.
- [React document component](https://github.com/comarkdown/comark/blob/1003f5ceb75ed8088568b8e21ef4346c2c083cbf/packages/comark-react/src/components/MarkdownDocument.tsx) and [caret helper](https://github.com/comarkdown/comark/blob/1003f5ceb75ed8088568b8e21ef4346c2c083cbf/packages/comark-react/src/utils/caret.ts).
- [Vue document component](https://github.com/comarkdown/comark/blob/1003f5ceb75ed8088568b8e21ef4346c2c083cbf/packages/comark-vue/src/components/MarkdownDocument.ts) and [caret helper](https://github.com/comarkdown/comark/blob/1003f5ceb75ed8088568b8e21ef4346c2c083cbf/packages/comark-vue/src/utils/caret.ts).
- Reproduction branch: `repro/comark-caret-mutation`; directory: `comark-caret-mutation/`.
