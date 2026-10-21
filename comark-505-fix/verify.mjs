// Inline HTML inside a `::` block component should keep its text, as it does in a paragraph.
import { strictEqual } from "node:assert/strict";
import { createHtmlRenderer } from "@comark/html";
import { parseMarkdown } from "comark";

const render = createHtmlRenderer({
  components: {
    foo: async ([, , ...children], state) =>
      `<div class="foo">${(await Promise.all(children.map((child) => state.one(child, state)))).join("")}</div>`,
  },
});

const cases = [
  { name: "paragraph", source: "Note <b>x</b> end", expected: "<p>Note <b>x</b> end</p>" },
  { name: "block component", source: "::foo\nNote <b>x</b> end\n::", expected: '<div class="foo">Note <b>x</b> end</div>' },
];

let failed = 0;
for (const { name, source, expected } of cases) {
  const html = (await render(source)).replace(/\s*\n\s*/g, " ").replace(/<p> /g, "<p>").replace(/ <\/p>/g, "</p>");
  const tree = JSON.stringify((await parseMarkdown(source)).nodes);
  try {
    strictEqual(html, expected);
    console.log(`ok   ${name}: ${html}`);
  } catch {
    failed++;
    console.log(`FAIL ${name}\n  expected: ${expected}\n  actual:   ${html}\n  tree:     ${tree}`);
  }
}
process.exit(failed ? 1 : 0);
