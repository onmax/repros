import assert from 'node:assert/strict';
import { performance } from 'node:perf_hooks';
import { Window } from 'happy-dom';

process.env.NODE_ENV = 'development';
const window = new Window();
globalThis.window = window;
globalThis.document = window.document;
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const { act, createElement } = await import('react');
const { createRoot } = await import('react-dom/client');
const { MarkdownClient, MarkdownDocument } = await import('@comark/react');
const { createMarkdownParser } = await import('comark');

const check = process.argv.includes('--check');
const large = process.argv.includes('--large');
const options = Object.freeze({ autoClose: false, registerDefaultPlugins: false });
const values = [];
if (large) {
  let source = '';
  let html = '';
  for (let index = 1; index <= 400; index++) {
    const text = `Paragraph ${String(index).padStart(4, '0')} with **bold** and plain text`;
    source += `${text}\n\n`;
    html += `<p>${text.replace('**bold**', '<strong>bold</strong>')}</p>`;
    values.push({ source, html });
  }
} else {
  for (const tail of ['omega', 'omega one', 'omega one two']) {
    values.push({ source: `alpha\n\n${tail}`, html: `<p>alpha</p><p>${tail}</p>` });
  }
}

function probe() {
  const inputs = [];
  const plugin = { name: 'tokenizer-input-probe', pre: state => { inputs.push(state.markdown); } };
  return { inputs, plugins: [plugin] };
}

function assertDom(container, html) {
  assert.equal(container.children.length, 1, 'MarkdownClient must commit a content element');
  assert.equal(container.firstElementChild.className.trim(), 'comark-content');
  assert.equal(container.firstElementChild.innerHTML, html, 'Every requested paragraph must reach the DOM');
}

async function reactClient(streaming) {
  const { inputs, plugins } = probe();
  const container = document.createElement('div');
  document.body.append(container);
  const root = createRoot(container);
  const perCommit = [];
  const start = performance.now();
  try {
    for (const { source, html } of values) {
      const before = inputs.length;
      await act(async () => {
        root.render(createElement(MarkdownClient, { value: source, streaming, options, plugins }));
      });
      assertDom(container, html);
      const observed = inputs.slice(before);
      assert.equal(observed.length, 1, 'Each settled value must run the probe exactly once');
      perCommit.push(observed[0]);
    }
    const elapsedMs = performance.now() - start;
    await act(async () => {
      root.render(createElement(MarkdownClient, {
        value: values.at(-1).source, streaming, options, plugins,
      }));
    });
    assert.equal(inputs.length, values.length, 'Identical content must not cause another parse');
    assertDom(container, values.at(-1).html);
    return { inputs: perCommit, elapsedMs };
  } finally {
    await act(async () => { root.unmount(); });
    container.remove();
  }
}

async function retainedParser() {
  const { inputs, plugins } = probe();
  const parse = createMarkdownParser({ ...options, plugins });
  let parsed;
  const start = performance.now();
  for (const { source } of values) parsed = await parse(source, { streaming: true });
  const elapsedMs = performance.now() - start;
  assert.equal(inputs.length, values.length);
  const container = document.createElement('div');
  document.body.append(container);
  const root = createRoot(container);
  try {
    await act(async () => { root.render(createElement(MarkdownDocument, { value: parsed })); });
    assertDom(container, values.at(-1).html);
  } finally {
    await act(async () => { root.unmount(); });
    container.remove();
  }
  return { inputs, elapsedMs };
}

const sum = inputs => inputs.reduce((total, input) => total + input.length, 0);
const summarize = result => ({
  tokenizerCalls: result.inputs.length,
  tokenizerInputCharacters: sum(result.inputs),
  firstInputLengths: result.inputs.slice(0, 4).map(input => input.length),
  lastInputLength: result.inputs.at(-1).length,
  elapsedMs: Number(result.elapsedMs.toFixed(2)),
});

try {
  const streaming = await reactClient(true);
  const nonStreaming = await reactClient(false);
  const retained = await retainedParser();
  const fullInputs = values.map(value => value.source);
  const expectedRetained = large
    ? fullInputs.map((source, index) => index < 2 ? source : source.slice(-91))
    : [values[0].source, '\nomega one', '\nomega one two'];
  assert.ok(sum(retained.inputs) < sum(fullInputs));

  console.log(JSON.stringify({
    case: large ? '400 paragraph values' : 'three values, two paragraphs',
    boundary: 'react-dom/client createRoot in Happy DOM, development React, no StrictMode',
    committedValues: values.length,
    contentUpdatesAfterMount: values.length - 1,
    finalSourceCharacters: values.at(-1).source.length,
    fullPrefixCharacters: sum(fullInputs),
    reactStreaming: summarize(streaming),
    reactNonStreaming: summarize(nonStreaming),
    retainedParserDiagnostic: summarize(retained),
    inputVolumeRatio: Number((sum(streaming.inputs) / sum(retained.inputs)).toFixed(2)),
    dom: 'exact HTML verified after every React value; retained final document verified',
    timing: 'descriptive only; React includes DOM assertions, retained timing measures parser calls only',
  }, null, 2));

  if (check) {
    for (let index = 0; index < values.length; index++) {
      if (retained.inputs[index].length >= values[index].source.length) continue;
      assert.ok(streaming.inputs[index].length < values[index].source.length,
        `streaming=true value ${index + 1} tokenized all ${values[index].source.length} characters; ` +
        `the retained parser tokenized ${retained.inputs[index].length}`);
    }
    console.log('PASS: streaming React updates reuse completed paragraph prefixes.');
  } else {
    assert.deepEqual(nonStreaming.inputs, fullInputs, 'The non-streaming control must tokenize full values');
    assert.deepEqual(retained.inputs, expectedRetained, 'The retained parser must demonstrate reusable prefixes');
    assert.deepEqual(streaming.inputs, fullInputs, 'The claimed whole-content reparse must occur');
    console.log('CONFIRMED: streaming=true and streaming=false tokenize every full content value.');
  }
} finally {
  await window.happyDOM.close();
}
