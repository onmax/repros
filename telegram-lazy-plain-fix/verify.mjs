import assert from 'node:assert/strict';
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { performance } from 'node:perf_hooks';

const sourceUrl = import.meta.resolve('@chat-adapter/telegram');
const source = await readFile(new URL(sourceUrl), 'utf8');
const fixture = JSON.parse(await readFile(new URL('./package.json', import.meta.url), 'utf8'));
const expectFixed = process.argv.includes('--expect-fixed') || fixture.repro.expectFixed;
const expectations = JSON.parse(await readFile(new URL('./semantic-expectations.json', import.meta.url), 'utf8'));
const directory = new URL('./.generated/', import.meta.url);
await mkdir(directory, { recursive: true });
function instrument(text) {
  assert.equal(text.split('  markdownToPlainText,').length, 2);
  return text.replace('  markdownToPlainText,', '  markdownToPlainText as originalMarkdownToPlainText,') + `
function markdownToPlainText(text) {
  globalThis.plainWork.calls++;
  globalThis.plainWork.characters += text.length;
  return originalMarkdownToPlainText(text);
}
`;
}
await writeFile(new URL('actual.mjs', directory), source);
await writeFile(new URL('counted.mjs', directory), instrument(source));
const actual = await import(new URL('actual.mjs', directory));
const counted = await import(new URL('counted.mjs', directory));

const logger = { debug() {}, info() {}, warn() {}, error() {}, child() { return this; } };
const paragraph = '# Deployment review\n\nThe **preview** passed the checks. See [the report](https://example.test/report).\n\n- Build completed\n- Routes verified\n- No unexpected errors\n\n';
const markdown = paragraph.repeat(20);
const chunks = markdown.match(/[\s\S]{1,40}/g);
const originalFetch = globalThis.fetch;
const originalNow = Date.now;

async function run(module, mode = 'rich', input = chunks) {
  let now = 1_700_000_000_000;
  Date.now = () => now;
  globalThis.plainWork = { calls: 0, characters: 0 };
  const requests = [];
  const response = (result) => new Response(JSON.stringify({ ok: true, result }));
  const fail = (code, description) => new Response(JSON.stringify({ ok: false, error_code: code, description }), { status: code });
  globalThis.fetch = async (url, options) => {
    const method = String(url).split('/').at(-1);
    const body = JSON.parse(options.body);
    requests.push({ method, body });
    if (method === 'sendRichMessageDraft' && mode !== 'rich') {
      if (mode === 'draftFailure') return fail(500, 'temporarily unavailable');
      return fail(404, 'method not found');
    }
    if (method === 'sendMessageDraft' && mode === 'plain' && body.parse_mode) return fail(400, "can't parse entities");
    if (method.endsWith('Draft')) return response(true);
    if (mode === 'finalFailure') return fail(401, 'Unauthorized');
    return response({ message_id: 11, chat: { id: 123, type: 'private', first_name: 'User' }, date: 1_700_000_000, from: { id: 999, is_bot: true, first_name: 'Bot' }, text: body.text ?? markdown });
  };
  const adapter = module.createTelegramAdapter({ botToken: 'fake-token', userName: 'bot', nativeStreaming: true, logger });
  async function* stream() {
    for (const chunk of input) {
      now += 500;
      if (chunk === Symbol.for('stream-error')) throw new Error('source stream failed');
      yield chunk;
    }
  }
  const started = performance.now();
  let output;
  try {
    output = { result: await adapter.stream('telegram:123', stream(), { updateIntervalMs: 500 }) };
  } catch (error) {
    output = { error: { name: error.name, message: error.message } };
  }
  return { output, requests, work: globalThis.plainWork, milliseconds: performance.now() - started };
}

try {
  const controls = [];
  for (const [mode, input] of [['rich', chunks], ['markdown', chunks], ['plain', chunks], ['draftFailure', chunks], ['finalFailure', chunks], ['rich', []], ['rich', ['first', Symbol.for('stream-error')]], ['rich', ['**bold', '**\n\n', { type: 'task_update', id: 'a', title: 'ignored' }, { type: 'markdown_text', text: ':wave:' }]]]) {
    const measured = await run(counted, mode, input);
    const expected = expectations[controls.length];
    const semanticSha256 = createHash('sha256').update(JSON.stringify({ output: measured.output, requests: measured.requests })).digest('hex');
    assert.equal(semanticSha256, expected.semanticSha256, `${mode}: outbound payloads and result/error must match baseline`);
    assert.deepEqual(measured.work, expected[expectFixed ? 'after' : 'before'], `${mode}: plain-text conversion work`);
    controls.push({ mode, chunks: input.length, work: measured.work, requests: measured.requests.length, semanticSha256, outcome: measured.output.error?.message ?? 'success' });
  }
  // Time uninstrumented source. Counts and output identity determine pass/fail.
  await run(actual);
  const samples = [];
  for (let round = 0; round < 7; round++) samples.push((await run(actual)).milliseconds);
  const median = (values) => [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)];
  const report = {
    node: process.version, package: '@chat-adapter/telegram@4.39.0',
    sourceSha256: createHash('sha256').update(source).digest('hex'),
    input: { characters: markdown.length, chunks: chunks.length, virtualIntervalMs: 500 },
    expectFixed, controls, timing: { samples, medianMs: median(samples) }
  };
  await writeFile(new URL('./results.json', import.meta.url), JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify(report, null, 2));
} finally {
  globalThis.fetch = originalFetch;
  Date.now = originalNow;
  delete globalThis.plainWork;
  await rm(directory, { recursive: true, force: true });
}
