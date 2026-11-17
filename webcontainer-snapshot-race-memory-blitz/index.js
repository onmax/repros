import { mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { snapshot } from '@webcontainer/snapshot'
import { snapshotBounded } from './control.js'

// Writes N files of 1 KiB in folders of 100, then runs snapshot() or the
// bounded-queue control on them. On host Node the heap after snapshot() grows
// with N squared. Inside a WebContainer process.memoryUsage() reads 0, so the
// time is the signal there: snapshot() also slows down with N squared.
const files = Number(process.argv[2])
const control = process.argv[3] === 'control'
const root = join(tmpdir(), `wc-snapshot-${files}`)
rmSync(root, { recursive: true, force: true })
for (let d = 0; d < files / 100; d++) {
  mkdirSync(join(root, `pkg-${d}`), { recursive: true })
  for (let f = 0; f < 100; f++) writeFileSync(join(root, `pkg-${d}`, `file-${f}.js`), 'x'.repeat(1024))
}

const started = performance.now()
const buffer = await (control ? snapshotBounded : snapshot)(root)
const ms = Math.round(performance.now() - started)
const heapMb = Math.round(process.memoryUsage().heapUsed / 1e6)
console.log(`${files} files, ${control ? 'control  ' : 'snapshot()'}: ${Math.round(buffer.byteLength / 1e6)} MB out, heap used ${heapMb} MB, ${ms} ms`)
rmSync(root, { recursive: true, force: true })
