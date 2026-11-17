import { mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { snapshot } from '@webcontainer/snapshot'

// Writes N files of 1 KiB in folders of 100, then runs snapshot() on them.
// The content is N KiB, but the heap grows with N squared.
const files = Number(process.argv[2])
const root = join(tmpdir(), `wc-snapshot-${files}`)
rmSync(root, { recursive: true, force: true })
for (let d = 0; d < files / 100; d++) {
  mkdirSync(join(root, `pkg-${d}`), { recursive: true })
  for (let f = 0; f < 100; f++) writeFileSync(join(root, `pkg-${d}`, `file-${f}.js`), 'x'.repeat(1024))
}

const started = performance.now()
const buffer = await snapshot(root)
const ms = Math.round(performance.now() - started)
const heapMb = Math.round(process.memoryUsage().heapUsed / 1e6)
console.log(`files: ${files}, content: ${Math.round(files * 1024 / 1e6)} MB, snapshot: ${Math.round(buffer.byteLength / 1e6)} MB, heap used: ${heapMb} MB, time: ${ms} ms`)
rmSync(root, { recursive: true, force: true })
