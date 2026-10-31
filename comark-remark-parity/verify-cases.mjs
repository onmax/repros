// Every case in the comark#525 update: Comark must still give the exact tree recorded in cases.json, which differs
// from the CommonMark/GFM output recorded next to it. Exit 0 means every case reproduced.
import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const root = process.env.COMARK_ROOT;
const load = (sub, dist) => import(root ? pathToFileURL(`${root}/packages/comark/dist/${dist}`).href : sub);
const { parseMarkdown } = await load("comark", "index.js");
const footnotes = (await load("comark/plugins/footnotes", "plugins/footnotes.js")).default;
const html = (await load("comark/plugins/html", "plugins/html.js")).default;
const { renderHtmlFromDocument } = root ? await import(pathToFileURL(`${root}/packages/comark/dist/render/html.js`).href) : await import("@comark/html");

// Cases the playground can't show, checked by their symptom.
const special = {
  "`@comark/html` indents code nested in a block, and escapes `>` in `<style>` and `<script>`": async () => {
    const out = await renderHtmlFromDocument(await parseMarkdown("- x\n\n  ```\n  a\n    b\n  ```\n\n<style>\na > b {}\n</style>"));
    return out.includes("a\n      b") && out.includes("a &gt; b");
  },
  "With `html({ markdown: false })`, character references in HTML blocks stay encoded": async () =>
    JSON.stringify((await parseMarkdown("<div>\n&lt;b&gt; &amp; x\n</div>", { plugins: [html({ markdown: false })] })).nodes).includes("&lt;b&gt; &amp; x"),
  "A paragraph with about 65,000 children overflows the stack": async () => {
    try {
      await parseMarkdown("https://x.com/a ".repeat(65536));
      return false;
    } catch (error) {
      return error instanceof RangeError;
    }
  },
};

const cases = JSON.parse(readFileSync(new URL("./cases.json", import.meta.url), "utf8"));
let missing = 0;
for (const item of cases) {
  let ok;
  if (item.markdown === undefined) ok = await special[item.title]();
  else {
    try {
      ok = JSON.stringify((await parseMarkdown(item.markdown, { plugins: [footnotes()] })).nodes) === JSON.stringify(item.nodes);
    } catch (error) {
      ok = item.comark.startsWith("throws:");
    }
  }
  if (!ok) missing++;
  console.log(`${ok ? "REPRODUCED" : "NOT REPRODUCED"}  ${item.number}. ${item.title}${item.kind === "default" ? " (default)" : ""}`);
  if (item.markdown !== undefined) console.log(`  input:    ${JSON.stringify(item.markdown)}\n  expected: ${item.expected}\n  comark:   ${item.comark}\n`);
}
console.log(`${cases.length - missing}/${cases.length} cases reproduced against ${root ?? "comark@0.8.1 from npm"}`);
process.exit(missing ? 1 : 0);
