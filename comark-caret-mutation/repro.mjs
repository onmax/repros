import assert from 'node:assert/strict';
import { parseMarkdown } from 'comark';
import { MarkdownDocument as ReactDocument } from '@comark/react';
import { MarkdownDocument as VueDocument } from '@comark/vue';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createSSRApp, h } from 'vue';
import { renderToString } from '@vue/server-renderer';

const check = process.argv.includes('--check');
const caret = { class: 'repro-caret' };
const renderers = {
  react: (value, enabled) => renderToStaticMarkup(createElement(ReactDocument, {
    value, streaming: true, caret: enabled ? caret : false,
  })),
  vue: (value, enabled) => renderToString(createSSRApp({
    render: () => h(VueDocument, { value, streaming: true, caret: enabled ? caret : false }),
  })),
};

async function sample(render, enabled, fresh) {
  const document = await parseMarkdown('Hello.');
  const before = JSON.stringify(document);
  const counts = [];
  const lengths = [];
  for (let i = 0; i < 3; i++) {
    const value = fresh ? structuredClone(document) : document;
    const html = await render(value, enabled);
    assert.match(html, /Hello\./, 'The actual public renderer must render the input');
    counts.push((html.match(/class="repro-caret"/g) || []).length);
    lengths.push(value.nodes[0].length);
  }
  return { counts, lengths, inputChanged: JSON.stringify(document) !== before };
}

const results = {};
for (const [framework, render] of Object.entries(renderers)) {
  const noCaret = await sample(render, false, false);
  assert.deepEqual(noCaret, { counts: [0, 0, 0], lengths: [3, 3, 3], inputChanged: false });
  const freshInput = await sample(render, true, true);
  assert.deepEqual(freshInput.counts, [1, 1, 1]);
  assert.equal(freshInput.inputChanged, false);
  if (!check) assert.deepEqual(freshInput.lengths, [4, 4, 4]);
  results[framework] = { sharedInput: await sample(render, true, false), noCaret, freshInput };
}

console.log(JSON.stringify({
  node: process.version,
  boundary: 'Public MarkdownDocument components rendered through React and Vue SSR',
  expected: { counts: [1, 1, 1], lengths: [3, 3, 3], inputChanged: false },
  results,
}, null, 2));

for (const [framework, { sharedInput }] of Object.entries(results)) {
  if (check) {
    assert.deepEqual(sharedInput, { counts: [1, 1, 1], lengths: [3, 3, 3], inputChanged: false },
      `${framework}: repeated caret rendering must leave the shared AST unchanged`);
  } else {
    assert.deepEqual(sharedInput, { counts: [1, 2, 3], lengths: [4, 5, 6], inputChanged: true },
      `${framework}: the pinned caret-mutation claim no longer reproduces`);
  }
}
console.log(check ? 'PASS: input is unchanged and each render has one caret' : 'REPRODUCED: both frameworks mutate the shared AST and accumulate carets');
