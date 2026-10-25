import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import * as esbuild from './ofetch-pure-initializers/node_modules/esbuild/lib/main.js';
const here=path.join(import.meta.dirname,'source');
const repro=path.join(import.meta.dirname,'ofetch-pure-initializers');
const results={};
try {
for(const variant of ['original','modified']){
 const entry=path.join(here,variant,'src/index.ts');
 const outfile=path.join(here,variant,'dist/index.mjs');
 await esbuild.build({entryPoints:[entry],outfile,bundle:true,platform:'neutral',format:'esm',target:'es2022',treeShaking:false,minify:false,legalComments:'inline'});
 const emitted=await fs.readFile(outfile,'utf8');
 const annotation=/var ofetch = \/\* @__PURE__ \*\/ createFetch\(\{ fetch \}\)/.test(emitted);
 assert.equal(annotation,variant==='modified','Emission must preserve only the new annotation');
 const run=spawnSync(process.execPath,['verify.mjs'],{cwd:repro,encoding:'utf8',timeout:60000,env:{...process.env,OFETCH_SOURCE_ENTRY:outfile,OFETCH_OUTPUT_DIR:path.join(here,variant,'dist/consumer')}});
 await fs.writeFile(path.join(here,variant,'dist/verify.log'),run.stdout+run.stderr);
 assert.equal(run.status,variant==='original'?1:0,run.stderr);
 if(variant==='original')assert.match(run.stderr,/UNUSED_CLIENT_RETAINED/);
 results[variant]={...JSON.parse(await fs.readFile(path.join(here,variant,'dist/consumer/result.json'),'utf8')),emittedAnnotation:annotation};
}
assert.equal(results.original.controlsHash,results.modified.controlsHash);
assert.deepEqual(results.original.observations,results.modified.observations);
assert.ok(results.modified.raw<results.original.raw);
await fs.mkdir(path.join(import.meta.dirname,'dist'),{recursive:true});
await fs.writeFile(path.join(import.meta.dirname,'dist/current-source-results.json'),JSON.stringify(results,null,2)+'\n');
console.log(`PASS current main source: ${results.original.raw} -> ${results.modified.raw} raw; gzip ${results.original.gzip} -> ${results.modified.gzip}. Emitted annotation verified; retained controls identical.`);
} finally {esbuild.stop()}
