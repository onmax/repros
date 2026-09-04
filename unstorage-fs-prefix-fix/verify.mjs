import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { promises as fs } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { performance } from 'node:perf_hooks';
import * as stable from 'unstorage';
import stableLite from 'unstorage/drivers/fs-lite';
import stableFs from 'unstorage/drivers/fs';
import * as alpha from 'unstorage-alpha';
import alphaLite from 'unstorage-alpha/drivers/fs-lite';
import alphaFs from 'unstorage-alpha/drivers/fs';

const { fixed } = JSON.parse(await fs.readFile(new URL('./expectation.json', import.meta.url), 'utf8'));
const expectFixed = process.argv.includes('--expect-fixed') || fixed;
const fixture = await fs.mkdtemp(join(tmpdir(), 'unstorage-prefix-'));
const originalReaddir = fs.readdir;
let reads = 0;
fs.readdir = (...args) => { reads++; return originalReaddir(...args); };
const tenantCount = 80;
async function write(relativePath) {
  const path = join(fixture, relativePath);
  await fs.mkdir(join(path, '..'), { recursive: true });
  await fs.writeFile(path, '{}');
}
async function measure(storage, base, opts) {
  reads = 0;
  const start = performance.now();
  const keys = await storage.getKeys(base, opts);
  return { keys: keys.sort(), reads, ms: performance.now() - start };
}
const require = createRequire(import.meta.url);
const versions = [
  ['1.17.5', 'import', stable, [['fs-lite', stableLite], ['fs', stableFs]]],
  ['2.0.0-alpha.10', 'import', alpha, [['fs-lite', alphaLite], ['fs', alphaFs]]],
  ['1.17.5', 'require', require('unstorage'), [['fs-lite', require('unstorage/drivers/fs-lite')], ['fs', require('unstorage/drivers/fs')]]],
  ['2.0.0-alpha.10', 'require', require('unstorage-alpha'), [['fs-lite', require('unstorage-alpha/drivers/fs-lite').default], ['fs', require('unstorage-alpha/drivers/fs').default]]],
];
try {
  for (let tenant = 0; tenant < tenantCount; tenant++) {
    for (let bucket = 0; bucket < 10; bucket++) {
      await Promise.all(Array.from({ length: 4 }, (_, i) => write(`data/tenant-${String(tenant).padStart(3, '0')}/bucket-${bucket}/cache-${i}.json`)));
    }
  }
  const semanticPaths = [
    'root.json', 'foo/item.json', 'foo/nested/one.json', 'foo/nested/deeper/two.json',
    'foobar/other.json', 'bar/unrelated.json', 'foo/.ignored/hidden.json',
    'foo/.hidden.json', 'foo/node_modules/dependency.json', 'foo/.git/config',
    'foo/name:colon.json', 'foo/name\\backslash.json', 'foo/name?query.json',
    'foo:compound/child.json', 'foo::repeated/child.json', '::/foo/child.json',
    'foo?query/nested/child.json', 'empty/placeholder.json',
    'foo/.unstorage-tmp-abc', '.unstorage-tmp-abc',
  ];
  for (const path of semanticPaths) await write(`semantics/${path}`);
  await fs.unlink(join(fixture, 'semantics/empty/placeholder.json'));
  await fs.symlink(join(fixture, 'semantics/foo/nested'), join(fixture, 'semantics/link'));
  const results = [];
  for (const [version, mode, api, drivers] of versions) {
    for (const [name, factory] of drivers) {
      const storage = api.createStorage({ driver: factory({ base: join(fixture, 'data') }) });
      const samples = [];
      for (let i = 0; i < 7; i++) samples.push(await measure(storage, 'tenant-000'));
      assert.equal(samples[0].keys.length, 40);
      for (const sample of samples) {
        assert.deepEqual(sample.keys, samples[0].keys);
        assert.equal(sample.reads, expectFixed ? 12 : 881, `${version} ${name}: narrow base directory reads`);
      }
      const absent = await measure(storage, 'missing-tenant');
      assert.deepEqual(absent.keys, []);
      assert.equal(absent.reads, expectFixed ? 1 : 881);
      const full = await measure(storage, '');
      assert.equal(full.keys.length, 3200);
      assert.equal(full.reads, 881);
      await storage.dispose();

      let semanticChecks = 0;
      for (const customIgnore of [false, true]) {
        const ignore = !customIgnore ? undefined : name === 'fs'
          ? ['**/.ignored/**']
          : path => path.includes('.ignored');
        const scoped = api.createStorage({ driver: factory({ base: join(fixture, 'semantics'), ignore }) });
        for (const maxDepth of [undefined, 0, 1, 2, 3]) {
          const opts = maxDepth === undefined ? {} : { maxDepth };
          const all = (await scoped.getKeys('', opts)).sort();
          if (version.startsWith('2.')) assert(all.every(key => !key.includes('.unstorage-tmp-')));
          for (const base of ['', 'foo', 'foo/', 'foo:', '/foo/', 'foo/nested', 'foobar', 'foo/compound', 'foo/repeated', 'empty', 'missing', 'link']) {
            const normalized = api.normalizeBaseKey(base);
            const expected = all.filter(key => !normalized || key.startsWith(normalized));
            assert.deepEqual((await scoped.getKeys(base, opts)).sort(), expected, `${version} ${name}: ${JSON.stringify({ base, maxDepth, customIgnore })}`);
            semanticChecks++;
          }
        }
        scoped.mount('foo:nested', api.createStorage().getMount().driver);
        await scoped.setItem('foo:nested:overlay.json', 'overlay');
        const allMounted = await scoped.getKeys();
        assert.deepEqual((await scoped.getKeys('foo')).sort(), allMounted.filter(key => key.startsWith('foo:')).sort());
        semanticChecks++;
        await scoped.dispose();
      }
      results.push({ version, mode, driver: name, keys: 40, directoryReads: samples[0].reads, medianMs: samples.map(s => s.ms).sort((a,b) => a-b)[3], semanticChecks });
    }
  }
  console.log(JSON.stringify({ node: process.version, fixed, tenantCount, results }, null, 2));
} finally {
  fs.readdir = originalReaddir;
  await fs.rm(fixture, { recursive: true, force: true });
}
