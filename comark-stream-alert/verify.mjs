import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { performance } from 'node:perf_hooks';
import { createMarkdownParser } from 'comark/parse';

const mode = process.argv[2] ?? '--confirm';
assert.ok(['--confirm', '--check'].includes(mode), 'Use --confirm or --check');
assert.equal(process.versions.node, '24.21.0', 'Use Node 24.21.0');
const pkg = JSON.parse(await readFile(new URL('../package.json', import.meta.resolve('comark/parse')), 'utf8'));
const paragraph = 'Plain paragraph with **bold**.\n\n';
const updates = 40;

function traceAlert(timing = false) {
  const stats = { active: false, spans: 0, reads: 0, milliseconds: 0 };
  const noop = { end() {} };
  const tracer = {
    startSpan() { return noop; },
    startActiveSpan(name, optionsOrFn, fn) {
      const run = typeof optionsOrFn === 'function' ? optionsOrFn : fn;
      if (name !== 'comark:post:alert') return run(noop);
      assert.equal(stats.active, false, 'Alert spans must not overlap');
      stats.active = true;
      stats.spans++;
      const start = timing ? performance.now() : 0;
      return run({ end() {
        if (timing) stats.milliseconds += performance.now() - start;
        stats.active = false;
      } });
    },
  };
  return { stats, tracer };
}

function watchTags(nodes, stats) {
  const readsByNode = [];
  const observed = [];
  function watch(node) {
    if (!Array.isArray(node)) return;
    const index = readsByNode.push(0) - 1;
    let tag = node[0];
    Object.defineProperty(node, '0', {
      enumerable: true,
      configurable: true,
      get() {
        if (stats.active) {
          stats.reads++;
          readsByNode[index]++;
        }
        return tag;
      },
      set(value) { tag = value; },
    });
    observed.push({ node, getter: Object.getOwnPropertyDescriptor(node, '0').get });
    for (let i = 2; i < node.length; i++) watch(node[i]);
  }
  nodes.forEach(watch);
  return { readsByNode, observed };
}

async function operationSample(paragraphs, count, disableAlert = false) {
  const { stats, tracer } = traceAlert();
  const pre = [];
  let stablePrefix = [];
  const parser = createMarkdownParser({
    tracer,
    plugins: [
      ...(disableAlert ? [{ name: 'alert' }] : []),
      { name: 'repro-tokenizer-input', pre(state) {
        for (let i = 0; i < stablePrefix.length; i++) {
          assert.equal(state.reusableNodes[i], stablePrefix[i], 'Prefix must be reused by identity before post hooks');
        }
        pre.push({ text: state.markdown, reused: state.reusableNodes.length });
      } },
    ],
  });
  let input = paragraph.repeat(paragraphs);
  const initial = await parser(input, { streaming: true });
  assert.equal(initial.nodes.length, paragraphs);
  assert.equal(pre[0].text, input);
  stablePrefix = initial.nodes.slice(0, -1);
  assert.ok(stablePrefix.length > 0);
  const strongNodes = stablePrefix.map(node => node[3]);
  const { readsByNode, observed } = watchTags(stablePrefix, stats);
  assert.equal(readsByNode.length, 2 * (paragraphs - 1), 'Each stable paragraph has p and strong element nodes');
  stats.spans = 0;
  const readsPerAppend = [];
  let output;
  for (let i = 0; i < count; i++) {
    input += 'x';
    const before = stats.reads;
    output = await parser(input, { streaming: true });
    assert.equal(stats.active, false);
    for (let j = 0; j < stablePrefix.length; j++) {
      assert.equal(output.nodes[j], stablePrefix[j], 'Alert must see the same prefix objects');
      assert.equal(output.nodes[j][3], strongNodes[j], 'Observed descendants must retain identity');
    }
    for (const { node, getter } of observed) {
      assert.equal(Object.getOwnPropertyDescriptor(node, '0').get, getter, 'Observed getters must remain installed');
    }
    assert.equal(output.nodes.at(-1)[2], 'x'.repeat(i + 1), 'The appended text must be parsed');
    if (mode === '--confirm') {
      assert.equal(pre[i + 1].text, i === 0 ? `\n${paragraph}x` : `\n${'x'.repeat(i + 1)}`);
      assert.equal(pre[i + 1].reused, i === 0 ? paragraphs - 1 : paragraphs);
    }
    readsPerAppend.push(stats.reads - before);
  }
  const beforeSerialization = stats.reads;
  const json = JSON.stringify(output);
  assert.equal(stats.reads, beforeSerialization, 'Reads outside the alert span must not count');
  return {
    paragraphs,
    seedCharacters: paragraphs * paragraph.length,
    stableParagraphs: stablePrefix.length,
    stableElementNodes: readsByNode.length,
    updates: count,
    alertSpans: stats.spans,
    stableTagReads: stats.reads,
    readsPerAppend,
    readsByNode,
    tokenizerCharacters: pre.slice(1).map(record => record.text.length),
    tokenizerCharactersTotal: pre.slice(1).reduce((sum, record) => sum + record.text.length, 0),
    json,
  };
}

async function smokeAlert() {
  const { stats, tracer } = traceAlert();
  const parser = createMarkdownParser({ tracer });
  const input = '> [!NOTE]\n> Keep this alert.\n';
  const expected = { frontmatter: {}, meta: {}, nodes: [['blockquote', { as: 'note' }, 'Keep this alert.']] };
  assert.deepEqual(await parser(input), expected);
  assert.ok(stats.spans > 0, 'The real-alert smoke test must expose comark:post:alert tracing');
  assert.equal(stats.active, false, 'The real-alert tracing boundary must close');
  let streamed = '';
  let output;
  for (const chunk of ['> [!', 'NOTE]\n', '> Keep this ', 'alert.\n']) {
    streamed += chunk;
    output = await parser(streamed, { streaming: true });
  }
  assert.equal(output.nodes[0][0], 'blockquote');
  assert.equal(output.nodes[0][1].as, 'note');
  assert.equal(output.nodes[0][2], 'Keep this alert.');
  console.log('PASS real [!NOTE] alert: one-shot and 4 streamed chunks retain as=note and text');
}

async function timedSample(paragraphs, disableAlert) {
  const { stats, tracer } = traceAlert(true);
  const parser = createMarkdownParser({ tracer, plugins: disableAlert ? [{ name: 'alert' }] : [] });
  let input = paragraph.repeat(paragraphs);
  await parser(input, { streaming: true });
  stats.milliseconds = 0;
  const start = performance.now();
  let output;
  for (let i = 0; i < updates; i++) {
    input += 'x';
    output = await parser(input, { streaming: true });
  }
  const total = performance.now() - start;
  return { total, alert: stats.milliseconds, json: JSON.stringify(output) };
}

function median(values) {
  return [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)];
}

async function timings(expectedJson) {
  const samples = { defaultTotal: [], defaultAlert: [], disabledTotal: [] };
  for (let round = -2; round < 5; round++) {
    const pair = {};
    for (const disabled of round % 2 === 0 ? [false, true] : [true, false]) {
      const result = await timedSample(8000, disabled);
      assert.equal(result.json, expectedJson, 'Uninstrumented timed AST must match the counted AST');
      pair[disabled ? 'disabled' : 'default'] = result;
    }
    if (round < 0) continue;
    samples.defaultTotal.push(pair.default.total);
    samples.defaultAlert.push(pair.default.alert);
    samples.disabledTotal.push(pair.disabled.total);
  }
  console.log('TIMING descriptive only: 8000 seed paragraphs, 40 appends, 2 warm-up pairs, 5 measured pairs, alternating order, no AST getters');
  for (const [name, values] of Object.entries(samples)) {
    console.log(`  ${name}: median=${median(values).toFixed(3)} ms samples=[${values.map(value => value.toFixed(3)).join(', ')}]`);
  }
  console.log(`  default/disabled median ratio=${(median(samples.defaultTotal) / median(samples.disabledTotal)).toFixed(2)}x; no timing threshold`);
}

console.log(`ENV node=${process.version} comark=${pkg.version} platform=${process.platform}/${process.arch}`);
await smokeAlert();
if (mode === '--check') {
  const result = await operationSample(2, 1);
  const control = await operationSample(2, 1, true);
  assert.equal(result.json, control.json);
  assert.equal(control.stableTagReads, 0);
  console.log(`CHECK stable_element_nodes=${result.stableElementNodes} appends=1 actual_alert_revisits=${result.stableTagReads} expected=0`);
  assert.equal(result.stableTagReads, 0, 'Default alert must not revisit unchanged stable nodes on an incremental append');
  console.log('PASS alert does not revisit the unchanged prefix');
} else {
  let largest;
  for (const paragraphs of [2, 1000, 4000, 8000]) {
    const result = await operationSample(paragraphs, updates);
    const control = await operationSample(paragraphs, updates, true);
    assert.equal(result.alertSpans, updates);
    assert.equal(control.alertSpans, 0);
    assert.equal(control.stableTagReads, 0);
    assert.deepEqual(control.readsPerAppend, Array(updates).fill(0));
    assert.equal(result.json, control.json, 'Disabling alert must preserve the final no-alert AST');
    assert.deepEqual(result.readsPerAppend, Array(updates).fill(result.stableElementNodes));
    assert.deepEqual(result.readsByNode, Array(result.stableElementNodes).fill(updates));
    assert.equal(result.stableTagReads, 2 * (paragraphs - 1) * updates);
    assert.equal(result.tokenizerCharactersTotal, 892);
    console.log(`COUNT seed_paragraphs=${paragraphs} seed_characters=${result.seedCharacters} stable_paragraphs=${result.stableParagraphs} stable_elements=${result.stableElementNodes} alert_reads_per_append=${result.stableElementNodes} appends=${updates} total_alert_reads=${result.stableTagReads} tokenizer_characters=${result.tokenizerCharactersTotal}`);
    console.log('  PASS identity reuse, every stable element read exactly once per alert span, no-alert control AST equal, disabled-alert reads=0');
    largest = result;
  }
  console.log('TOKENIZER per append: [34, 3, 4, ..., 41], total=892 at every prefix size; initial parse excluded');
  await timings(largest.json);
  console.log('CONFIRMED default alert revisits all instrumented stable prefix elements on every append');
}
