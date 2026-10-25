import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';

const root = new URL('.', import.meta.url);
const { slug } = JSON.parse(readFileSync(new URL('repro.json', root), 'utf8'));
assert.equal(process.version, 'v24.21.0', 'Use Node 24.21.0');
assert.ok(process.argv.slice(2).every(arg => arg === '--offline'));
const offline = process.argv.includes('--offline');
const env = { ...process.env, RAYON_NUM_THREADS: '2', GOMAXPROCS: '2', CI: '1' };
function pnpm(args, cwd, capture = false) {
  const options = { cwd, env, timeout: 120000, encoding: 'utf8', stdio: capture ? 'pipe' : 'inherit' };
  return process.platform === 'win32'
    ? spawnSync('cmd.exe', ['/d', '/s', '/c', `pnpm.cmd ${args.join(' ')}`], options)
    : spawnSync('pnpm', args, options);
}
const version = pnpm(['--version'], root, true);
assert.equal(version.status, 0, version.stderr);
assert.equal(version.stdout.trim(), '11.28.6', 'Use pnpm 11.28.6');
for (const file of ['input.mjs', 'helper.mjs', 'live.mjs', 'arguments.mjs', 'regexp.mjs', 'verify.mjs', 'config.json']) {
  assert.equal(readFileSync(new URL(slug + '/' + file, root), 'utf8'), readFileSync(new URL(slug + '-fix/' + file, root), 'utf8'), file + ' must match');
}
mkdirSync(new URL('evidence/', root), { recursive: true });
for (const [suffix, expected] of [['', 1], ['-fix', 0]]) {
  const cwd = new URL(slug + suffix + '/', root);
  rmSync(new URL('node_modules/', cwd), { recursive: true, force: true });
  const install = pnpm(['install', '--frozen-lockfile', '--ignore-scripts', ...(offline ? ['--offline'] : [])], cwd);
  assert.equal(install.status, 0, slug + suffix + ': install failed');
  const result = spawnSync(process.execPath, ['verify.mjs'], { cwd, env, encoding: 'utf8', timeout: 60000 });
  writeFileSync(new URL('evidence/' + (suffix ? 'candidate' : 'baseline') + '.log', root), result.stdout + result.stderr);
  if (result.status !== expected) process.stderr.write(result.stderr);
  assert.equal(result.status, expected, slug + suffix + ': unexpected verifier exit');
  if (!suffix) assert.match(result.stderr, /UNUSED_PARSE_RETAINED/);
  console.log(slug + suffix + ': ' + (suffix ? 'optimization check passes' : 'expected failure UNUSED_PARSE_RETAINED'));
}
const read = suffix => JSON.parse(readFileSync(new URL(slug + suffix + '/dist/result.json', root), 'utf8'));
const before = read('');
const after = read('-fix');
const comparisons = {};
for (const bundler of ['rollup', 'rolldown']) {
  const b = before.bundlers[bundler];
  const a = after.bundlers[bundler];
  assert.ok(a.input.raw < b.input.raw);
  assert.ok(a.input.gzip < b.input.gzip);
  for (const fixture of ['input', 'helper', 'live', 'arguments']) assert.deepEqual(a[fixture].exports, b[fixture].exports);
  assert.equal(a.live.raw, b.live.raw, 'Live-only size must remain unchanged');
  assert.equal(a.live.gzip, b.live.gzip, 'Live-only gzip must remain unchanged');
  assert.notDeepEqual(a.regexp.exports, b.regexp.exports, 'Counterexample disappeared: reevaluate the safety finding');
  assert.equal(a.regexp.exports.capture, 'seed');
  assert.equal(a.regexp.exports.match, 'seed');
  comparisons[bundler] = { unusedCall: { before: b.input, after: a.input }, liveOnly: { before: b.live, after: a.live }, legacyRegExp: { before: b.regexp.exports, after: a.regexp.exports } };
  console.log(`${bundler}: unused-call fixture ${b.input.raw} -> ${a.input.raw} bytes, gzip ${b.input.gzip} -> ${a.input.gzip}; live-only unchanged; legacy RegExp exports DIFFER`);
}
writeFileSync(new URL('evidence/results.json', root), JSON.stringify({ before, after, comparisons }, null, 2) + '\n');
console.log('PASS: reproduced optimization and legacy RegExp behavior change. Candidate is not an unconditional behavior-preserving fix.');
