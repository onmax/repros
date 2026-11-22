# Comark behind vitehub markdown-template's workarounds

vite-hub/vitehub#5217 lists five workarounds in `packages/markdown-template`. This fixture asserts what Comark does with the input behind each one, parsed with the options markdown-template uses: `{ autoClose: false, autoUnwrap: false, linkify: false, plugins: [html({ markdown: false }), binding()] }`.

```sh
git clone --branch repro/comark-vitehub-workarounds https://github.com/onmax/repros
cd repros/comark-vitehub-workarounds
pnpm install
pnpm verify
```

It runs on Node 24 and pnpm 12, against three builds:

- `comark` and `@comark/html` 0.9.2, the latest release;
- `main` at `74ba41bd` (2026-11-19), from pkg.pr.new;
- comarkdown/comark#530 at `c7dc995`, from pkg.pr.new, as the control for item 3.

`pnpm-workspace.yaml` sets `blockExoticSubdeps: false` because pnpm otherwise refuses the pkg.pr.new tarballs' URL dependencies.

| Item | Workaround | Comark behavior | Bug? |
| --- | --- | --- | --- |
| 1 | `inlineHtml` | `<policy>Use it.</policy>` alone in a paragraph becomes a block element (`$.block: 1`). | No: Comark's HTML contract and `SPEC/HTML/inline.md` freeze this. |
| 2 | `prepareTemplate` masking | `::if` on its own line ends the paragraph, so a code span can't cross it. `# h` splits the code span the same way. A single-colon `:insert{}` line stays in the code span. | No: CommonMark parses blocks before inlines. |
| 3 | Script line-break strip | The text of `<script>\nlet a\n</script>` is `"\nlet a\n"`, and `renderMarkdown` and `@comark/html` both write `<script>\n\nlet a`. Each save adds a line. `<style>` and `<textarea>` too, `<pre>` not. | Yes. #530 writes the break once. |
| 4 | `labelStart` fallback | `[a\]b](u)` has link text `a]b` and saves back as `[a\]b](u)`. With a bound destination, the text before the binding is `[a]b](`. | No: CommonMark decodes backslash escapes. |
| 5 | `isJsonLiteral` | `comark`, `comark/render`, and `comark/utils` export `resolveAttributes` but no predicate for "this value is a JSON literal". | No, but an export would let vitehub drop its copy. |

`probe.mjs <comark> <@comark/html>` prints the raw output for each item. `cases-525.mjs <body.md> <comark> [numbers]` runs every playground link in a comarkdown/comark#525 body through one build.
