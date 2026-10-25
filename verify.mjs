import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync, rmSync } from 'node:fs';
const offline = process.argv.includes('--offline');
assert.equal(process.version, 'v24.21.0', 'Use Node 24.21.0');
assert.ok(process.argv.slice(2).every(arg => arg === '--offline'));
assert.ok(!process.env.OFETCH_SOURCE_ENTRY && !process.env.OFETCH_OUTPUT_DIR, 'Use OFETCH_SOURCE_ENTRY only with the individual verifier');
function pnpm(args, options) {
  return process.platform === 'win32'
    ? spawnSync('cmd.exe', ['/d', '/s', '/c', `pnpm.cmd ${args.join(' ')}`], { timeout: 240000, ...options })
    : spawnSync('pnpm', args, { timeout: 240000, ...options });
}
const version = pnpm(['--version'], { cwd: new URL('.', import.meta.url), encoding: 'utf8' });
assert.equal(version.status, 0, 'pnpm must be available on PATH');
assert.equal(version.stdout.trim(), '11.28.6', 'Use pnpm 11.28.6');
for (const file of ['input.mjs', 'controls.mjs', 'verify.mjs']) assert.equal(
  readFileSync(new URL('ofetch-pure-initializers/' + file, import.meta.url), 'utf8'),
  readFileSync(new URL('ofetch-pure-initializers-fix/' + file, import.meta.url), 'utf8'), file + ' must match');
for (const [directory, expectedStatus] of [['ofetch-pure-initializers', 1], ['ofetch-pure-initializers-fix', 0]]) {
  const cwd = new URL(directory + '/', import.meta.url);
  rmSync(new URL('node_modules/', cwd), { recursive: true, force: true });
  const install = pnpm(['install', '--frozen-lockfile', '--ignore-scripts', ...(offline ? ['--offline'] : [])], { cwd, stdio: 'inherit' });
  assert.equal(install.status, 0, directory + ' install failed');
  const result = spawnSync(process.execPath, ['verify.mjs'], { cwd, encoding: 'utf8', timeout: 60000 });
  process.stdout.write(result.stdout);
  assert.equal(result.status, expectedStatus, directory + ': ' + result.stderr);
  if (expectedStatus === 1) {
    assert.match(result.stderr, /UNUSED_CLIENT_RETAINED/);
    console.log('Expected baseline failure: UNUSED_CLIENT_RETAINED');
  }
}
const originalEntry = readFileSync(new URL('ofetch-pure-initializers/node_modules/ofetch/dist/index.mjs', import.meta.url), 'utf8');
const fixedEntry = readFileSync(new URL('ofetch-pure-initializers-fix/node_modules/ofetch/dist/index.mjs', import.meta.url), 'utf8');
assert.equal(fixedEntry.replace('const ofetch = /* @__PURE__ */ createFetch({ fetch });', 'const ofetch = createFetch({ fetch });'), originalEntry, 'The package patch must change only the default call annotation');
assert.notEqual(fixedEntry, originalEntry);
const read = name => JSON.parse(readFileSync(new URL(name + '/dist/result.json', import.meta.url), 'utf8'));
const before = read('ofetch-pure-initializers');
const after = read('ofetch-pure-initializers-fix');
assert.ok(after.raw < before.raw);
assert.ok(after.gzip < before.gzip);
assert.equal(after.controlsHash, before.controlsHash);
assert.deepEqual(after.observations, before.observations);
console.log(`PASS: ${before.raw} -> ${after.raw} minified bytes; gzip ${before.gzip} -> ${after.gzip}. Fetching control byte-identical; getter, argument and error checks passed.`);

const source = spawnSync(process.execPath, ['verify-source.mjs'], { cwd: new URL('.', import.meta.url), stdio: 'inherit', timeout: 60000 });
assert.equal(source.status, 0, 'Pinned current-source verification failed');
