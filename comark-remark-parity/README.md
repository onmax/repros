# Comark vs CommonMark/GFM

Ten Comark bugs, plus four defaults that differ from CommonMark/GFM. They were found by rendering 17 real projects (Docusaurus, Starlight, MDN, VS Code docs, Nuxt Content, remark's own docs, …) with remark and with Comark, then diffing the HTML. Each case here is the smallest input that still shows the problem.

Pinned: `comark@0.8.1` and `@comark/html@0.8.1` from npm, Node 24. Every case also reproduces on upstream `main` at `b17f456`.

```sh
git clone --branch repro/comark-remark-parity https://github.com/onmax/repros
cd repros/comark-remark-parity
pnpm install
pnpm verify
```

`pnpm verify` runs two checks:

- `verify.mjs` holds the first 14 cases and prints each one's input, expected result, and actual result.
- `verify-cases.mjs` checks every case reported in comarkdown/comark#525 (cases 8 to 40), against the exact tree Comark gave when the report was written (`cases.json`, which also holds the CommonMark/GFM output from remark).

Each exits 0 only when every case still reproduces. To test a source checkout instead of npm, build `packages/comark` and run `COMARK_ROOT=/path/to/comark pnpm verify`.

| case | problem | cause |
| --- | --- | --- |
| `pre-indent` | `@comark/html` indents the code of a `<pre>` nested in a list item or `<details>`, which changes the code | [`html.ts:124`](https://github.com/comarkdown/comark/blob/b17f4561833a501c2e0382fec2082b9ecf810a6e/packages/comark/src/internal/stringify/handlers/html.ts#L121-L124) indents the parent's whole content; the literal-tag check looks only at the parent's own tag |
| `tight-list` | `- a\n  - b` keeps `<p>` around `a` | [`tree.ts:482`](https://github.com/comarkdown/comark/blob/b17f4561833a501c2e0382fec2082b9ecf810a6e/packages/comark/src/internal/parse/tree.ts#L482) never reads `token.hidden`; tight lists rely on `autoUnwrap`, which only unwraps a lone paragraph |
| `html-softbreak` | `<p>\nA\nB\n</p>` renders `AB` | [`tree.ts:457`](https://github.com/comarkdown/comark/blob/b17f4561833a501c2e0382fec2082b9ecf810a6e/packages/comark/src/internal/parse/tree.ts#L456-L460) drops every softbreak while an HTML tag is open |
| `html-entities` | with `html({ markdown: false })`, `&lt;b&gt;` in an HTML block stays encoded | [`html.ts:79`](https://github.com/comarkdown/comark/blob/b17f4561833a501c2e0382fec2082b9ecf810a6e/packages/comark/src/plugins/html.ts#L79-L103) turns `html_block` content into `text` tokens ([`pushText`](https://github.com/comarkdown/comark/blob/b17f4561833a501c2e0382fec2082b9ecf810a6e/packages/comark/src/plugins/html.ts#L187)) without decoding references |
| `frontmatter-throws` | invalid YAML frontmatter makes `parseMarkdown` throw | [`frontmatter.ts:22`](https://github.com/comarkdown/comark/blob/b17f4561833a501c2e0382fec2082b9ecf810a6e/packages/comark/src/internal/frontmatter.ts#L22) calls `parseYaml` without a guard |
| `footnote-definition-markdown` | `[^1]: *b*` renders `*b*` | [`footnotes.ts:104`](https://github.com/comarkdown/comark/blob/b17f4561833a501c2e0382fec2082b9ecf810a6e/packages/comark/src/plugins/footnotes.ts#L103-L104) cuts definitions out of the source with a regex and [line 169](https://github.com/comarkdown/comark/blob/b17f4561833a501c2e0382fec2082b9ecf810a6e/packages/comark/src/plugins/footnotes.ts#L169) inserts them as plain strings |
| `footnote-code-fence` | a `[^1]: kept` line inside fenced code is deleted | the same line-anchored regex, [`footnotes.ts:27`](https://github.com/comarkdown/comark/blob/b17f4561833a501c2e0382fec2082b9ecf810a6e/packages/comark/src/plugins/footnotes.ts#L27), runs on the raw source, code included |
| `shortcut-reference` | `[a]` with `[a]: url` defined becomes a span, not a link | [`components.ts:486`](https://github.com/comarkdown/comark/blob/b17f4561833a501c2e0382fec2082b9ecf810a6e/packages/comark/src/plugins/components.ts#L486) runs before `link` and only yields to `(` or `[`, without checking `env.references` |
| `link-inline-html` | `[2<sup>53</sup>](url)` renders `253<sup></sup>` | [`tree.ts:437`](https://github.com/comarkdown/comark/blob/b17f4561833a501c2e0382fec2082b9ecf810a6e/packages/comark/src/internal/parse/tree.ts#L437): `link_open` processes children with `nestHtml` off, the cause of #505. #506 fixes this case too |
| `duplicate-attribute` | `<img alt="first" alt="second">` keeps `second`; HTML keeps the first | [`utils.ts:198`](https://github.com/comarkdown/comark/blob/b17f4561833a501c2e0382fec2082b9ecf810a6e/packages/comark/src/internal/parse/utils.ts#L198) overwrites the key |
| `auto-unwrap` (default) | `> a` loses its `<p>` | [`parse.ts:75`](https://github.com/comarkdown/comark/blob/b17f4561833a501c2e0382fec2082b9ecf810a6e/packages/comark/src/parse.ts#L75): `autoUnwrap` is on by default |
| `markdown-in-html` (default) | `<code>[a] *b*</code>` in a raw table becomes a span and emphasis | [`html.ts:64`](https://github.com/comarkdown/comark/blob/b17f4561833a501c2e0382fec2082b9ecf810a6e/packages/comark/src/plugins/html.ts#L64-L76): `markdown` defaults to `true` |
| `fuzzy-linkify` (default) | `example.com` becomes a link and `https://example.com/a_` keeps the `_` | [`parse.ts:126`](https://github.com/comarkdown/comark/blob/b17f4561833a501c2e0382fec2082b9ecf810a6e/packages/comark/src/parse.ts#L126) uses linkify-it's defaults, which include fuzzy links and differ from GFM's autolink rules |
| `html-paragraph` (default) | a paragraph holding only `<video …></video>` loses its `<p>` | [`tree.ts:527`](https://github.com/comarkdown/comark/blob/b17f4561833a501c2e0382fec2082b9ecf810a6e/packages/comark/src/internal/parse/tree.ts#L527-L548) unwraps it, or turns an all-HTML paragraph into a fragment |

The four "default" cases may be deliberate. They are listed because a document migrating from remark renders differently.

Playground links (the share preview from comarkdown/comark#526, default plugins) for the parse-tree cases:

- `tight-list`: https://comark-playground-share.vercel.app/play#code/01VI5FJQ0FVIAgA
- `html-softbreak`: https://comark-playground-share.vercel.app/play#code/symw43LkcuKy0S-wAwA
- `frontmatter-throws`: https://comark-playground-share.vercel.app/play#code/09XV5SrJLMlJtVKI5tLV1eXiUlbwyAQA
- `footnote-definition-markdown`: https://comark-playground-share.vercel.app/play#code/S4yOM4zl4gKRVgpaSVoA
- `footnote-code-fence`: https://comark-playground-share.vercel.app/play#code/S0hIyE3hio4zjLVSyE4tKOFKSEgAAA
- `shortcut-reference`: https://comark-playground-share.vercel.app/play#code/i06M5eKKToy1UsgoKSkottLXT61IzC3ISdVLzs8FAA
- `link-inline-html`: https://comark-playground-share.vercel.app/play#code/izayKS4tsDM1ttEH0bEaGSUlBcVW-vqpFYm5BTmpesn5uZoA
- `duplicate-attribute`: https://comark-playground-share.vercel.app/play#code/s8nMTVdIzCmxVUrLLCouUYKwi1OT8_NSlOwA
- `auto-unwrap`: https://comark-playground-share.vercel.app/play#code/s1NIBAA
- `markdown-in-html`: https://comark-playground-share.vercel.app/play#code/sylJTMpJtbMpKbKzKUmx47JJzk9JtYtOjFXQStKy0QfzuGz0S1LsbPRBavQh6gE
- `fuzzy-linkify`: https://comark-playground-share.vercel.app/play#code/K05NVUitSMwtyEnVS87PVUjMS1HIKCkpKLbS10cS10-MBwA
- `html-paragraph`: https://comark-playground-share.vercel.app/play#code/synLTEnNVyguSrZVStTLLTBRsrPRB4vZAQA

`pre-indent` needs `@comark/html` and `html-entities` needs `html({ markdown: false })`, which the playground can't select.
