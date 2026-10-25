import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync, rmSync } from 'node:fs';

const offline = process.argv.includes('--offline');
assert.equal(process.version, 'v24.21.0', 'Use Node 24.21.0');
assert.ok(process.argv.slice(2).every(arg => arg === '--offline'));
assert.ok(!process.env.DEFU_ENTRY, 'Use DEFU_ENTRY only with a fixture verifier');
function pnpm(args, options) {
  // All arguments below are fixed; Windows needs cmd.exe for pnpm.cmd.
  return process.platform === 'win32'
    ? spawnSync('cmd.exe', ['/d', '/s', '/c', `pnpm.cmd ${args.join(' ')}`], options)
    : spawnSync('pnpm', args, options);
}
const version = pnpm(['--version'], { cwd: new URL('.', import.meta.url), encoding: 'utf8' });
assert.equal(version.status, 0, 'pnpm 11.28.5 must be available on PATH');
assert.equal(version.stdout.trim(), '11.28.5', 'Use pnpm 11.28.5');
for (const file of ['input.mjs', 'controls.mjs', 'verify.mjs']) {
  assert.equal(
    readFileSync(new URL('defu-pure-initializers/' + file, import.meta.url), 'utf8'),
    readFileSync(new URL('defu-pure-initializers-fix/' + file, import.meta.url), 'utf8'),
    file + ' must be identical in both fixtures',
  );
}
for (const [directory, expectedStatus] of [['defu-pure-initializers', 1], ['defu-pure-initializers-fix', 0]]) {
  rmSync(new URL(directory + '/node_modules/', import.meta.url), { recursive: true, force: true });
  const install = pnpm(['install', '--frozen-lockfile', '--ignore-scripts', ...(offline ? ['--offline'] : [])], { cwd: new URL(directory + '/', import.meta.url), stdio: 'inherit' });
  assert.equal(install.status, 0, directory + ' install failed');
  const result = spawnSync(process.execPath, ['verify.mjs'], { cwd: new URL(directory + '/', import.meta.url), encoding: 'utf8' });
  process.stdout.write(result.stdout);
  if (expectedStatus === 0 || result.status !== expectedStatus) process.stderr.write(result.stderr);
  else console.log('Expected failure: UNUSED_MERGERS_RETAINED');
  assert.equal(result.status, expectedStatus, directory + ' did not produce the expected result');
  if (expectedStatus === 1) assert.match(result.stderr, /UNUSED_MERGERS_RETAINED/);
}
const read = name => JSON.parse(readFileSync(new URL(name + '/dist/result.json', import.meta.url), 'utf8'));
const before = read('defu-pure-initializers');
const after = read('defu-pure-initializers-fix');
assert.ok(after.raw < before.raw);
assert.ok(after.gzip < before.gzip);
assert.equal(after.controlsRaw, before.controlsRaw);
assert.equal(after.controlsHash, before.controlsHash);
console.log(`PASS: ${before.raw} -> ${after.raw} bytes; gzip ${before.gzip} -> ${after.gzip}. Used-merger control unchanged.`);

