// Each case parses one input with Comark and checks for the reported symptom.
// Exit 0 means every case reproduced. Set COMARK_ROOT to a built comark checkout to run against it instead of the pinned 0.8.1 packages.
import { pathToFileURL } from "node:url";

const root = process.env.COMARK_ROOT;
const load = (pkg, sub, dist) =>
  import(root ? pathToFileURL(`${root}/packages/comark/dist/${dist}`).href : sub ? `${pkg}/${sub}` : pkg);
const { parseMarkdown } = await load("comark", "", "index.js");
const footnotes = (await load("comark", "plugins/footnotes", "plugins/footnotes.js")).default;
const html = (await load("comark", "plugins/html", "plugins/html.js")).default;
const { renderHtmlFromDocument } = root
  ? await import(pathToFileURL(`${root}/packages/comark/dist/render/html.js`).href)
  : await import("@comark/html");

const tree = async (md, options) => JSON.stringify((await parseMarkdown(md, options)).nodes);

const cases = [
  {
    id: "pre-indent",
    title: "@comark/html indents the code of a <pre> nested in a list item",
    md: "- x\n\n  ```\n  a\n    b\n  ```",
    expected: "the code reads `a\\n  b`",
    run: async (md) => renderHtmlFromDocument(await parseMarkdown(md)),
    bug: (out) => out.includes("<code>a\n      b</code>"),
  },
  {
    id: "tight-list",
    title: "A tight list item with a sublist keeps a <p> around its text",
    md: "- a\n  - b",
    expected: '[["ul",{},["li",{},"a",["ul",{},["li",{},"b"]]]]]',
    run: (md) => tree(md),
    bug: (out) => out === '[["ul",{},["li",{},["p",{},"a"],["ul",{},["li",{},"b"]]]]]',
  },
  {
    id: "html-softbreak",
    title: "A line break inside an HTML element is dropped, joining the words",
    md: "<p>\nA\nB\n</p>",
    expected: "text `A\\nB` (renders `A B`)",
    run: async (md) => renderHtmlFromDocument(await parseMarkdown(md)),
    bug: (out) => out === "<p>AB</p>",
  },
  {
    id: "html-entities",
    title: "With html({ markdown: false }), character references in an HTML block stay encoded",
    md: "<div>\n&lt;b&gt; &amp; x\n</div>",
    expected: "text `<b> & x`",
    run: (md) => tree(md, { plugins: [html({ markdown: false })] }),
    bug: (out) => out.includes('"&lt;b&gt; &amp; x"'),
  },
  {
    id: "frontmatter-throws",
    title: "Frontmatter that isn't valid YAML makes parseMarkdown throw",
    md: "---\ntitle: [\n---\n\n# Hi",
    expected: "the document parses and the problem is reported",
    run: async (md) => {
      try { return await tree(md) } catch (error) { return `throws: ${error.message.split("\n")[0]}` }
    },
    bug: (out) => out.startsWith("throws:"),
  },
  {
    id: "footnote-definition-markdown",
    title: "The footnotes plugin leaves a definition's Markdown unparsed",
    md: "a[^1]\n\n[^1]: *b*",
    expected: 'the definition holds ["em",{},"b"]',
    run: (md) => tree(md, { plugins: [footnotes()] }),
    bug: (out) => out.includes('"*b*"'),
  },
  {
    id: "footnote-code-fence",
    title: "The footnotes plugin deletes `[^x]: ...` lines inside fenced code",
    md: "```md\n[^1]: kept\n```",
    expected: "the code block keeps `[^1]: kept`",
    run: (md) => tree(md, { plugins: [footnotes()] }),
    bug: (out) => out.includes('["code",{"class":"language-md"},""]'),
  },
  {
    id: "shortcut-reference",
    title: "A shortcut reference `[a]` with a definition becomes a span, not a link",
    md: "[a]\n\n[a]: https://example.com",
    expected: '[["p",{},["a",{"href":"https://example.com"},"a"]]]',
    run: (md) => tree(md),
    bug: (out) => out === '[["p",{},["span",{},"a"]]]',
  },
  {
    id: "link-inline-html",
    title: "Inline HTML inside link text loses its content",
    md: "[2<sup>53</sup>](https://example.com)",
    expected: '[["p",{},["a",{"href":"https://example.com"},"2",["sup",{"$":{"html":1,"block":0}},"53"]]]]',
    run: (md) => tree(md),
    bug: (out) => out.includes('"253",["sup",{"$":{"html":1,"block":0}}]'),
  },
  {
    id: "duplicate-attribute",
    title: "A duplicated HTML attribute keeps the last value; HTML keeps the first",
    md: '<img alt="first" alt="second">',
    expected: 'alt="first"',
    run: (md) => tree(md),
    bug: (out) => out.includes('"alt":"second"'),
  },
  // Behaviour that differs from CommonMark/GFM by default and may be deliberate.
  {
    id: "auto-unwrap",
    design: true,
    title: "autoUnwrap (on by default) removes the <p> of a one-paragraph blockquote",
    md: "> a",
    expected: '[["blockquote",{},["p",{},"a"]]]',
    run: (md) => tree(md),
    bug: (out) => out === '[["blockquote",{},"a"]]',
  },
  {
    id: "markdown-in-html",
    design: true,
    title: "Markdown is parsed inside HTML blocks, which CommonMark keeps raw",
    md: "<table><tr><td>\n<code>[a] *b*</code>\n</td></tr></table>",
    expected: "`<code>` holds the text `[a] *b*`",
    run: (md) => tree(md),
    bug: (out) => out.includes('["em",{},"b"]'),
  },
  {
    id: "fuzzy-linkify",
    design: true,
    title: "Linkify links bare domains and keeps a trailing `_`; GFM does neither",
    md: "see example.com and https://example.com/a_",
    expected: "plain `example.com`; link `https://example.com/a` then `_`",
    run: (md) => tree(md),
    bug: (out) => out.includes('"href":"http://example.com"') && out.includes('"https://example.com/a_"'),
  },
  {
    id: "html-paragraph",
    design: true,
    title: "A paragraph holding only inline HTML loses its <p>",
    md: '<video src="a.mp4"></video>',
    expected: '[["p",{},["video",{...,"src":"a.mp4"}]]]',
    run: (md) => tree(md),
    bug: (out) => out.startsWith('[["video"'),
  },
];

let missing = 0;
for (const c of cases) {
  const actual = await c.run(c.md);
  const ok = c.bug(actual);
  if (!ok) missing += 1;
  console.log(`${ok ? "REPRODUCED" : "NOT REPRODUCED"}${c.design ? " (default)" : ""}  ${c.id}: ${c.title}`);
  console.log(`  input:    ${JSON.stringify(c.md)}`);
  console.log(`  expected: ${c.expected}`);
  console.log(`  actual:   ${JSON.stringify(actual)}\n`);
}
console.log(`${cases.length - missing}/${cases.length} cases reproduced against ${root ?? "comark@0.8.1 from npm"}`);
process.exit(missing ? 1 : 0);
