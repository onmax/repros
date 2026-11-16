// Builds a tree of small files and runs snapshot() on it in a child process with a fixed heap.
// Expected: the heap stays near the size of the file contents. Actual: it grows with files², so ~17k files crash.
import { execFileSync, spawnSync } from "node:child_process"
import { mkdirSync, rmSync, writeFileSync, existsSync } from "node:fs"
import { join } from "node:path"
import { tmpdir } from "node:os"

const files = Number(process.env.FILES ?? 17_000)
const heapMb = Number(process.env.HEAP_MB ?? 512)
const root = join(tmpdir(), `wc-snapshot-${files}`)
if (!existsSync(join(root, ".done"))) {
  rmSync(root, { recursive: true, force: true })
  // 17k files of 1 KiB in 170 folders: about 17 MB of content.
  for (let d = 0; d < files / 100; d++) {
    mkdirSync(join(root, `pkg-${d}`), { recursive: true })
    for (let f = 0; f < 100; f++) writeFileSync(join(root, `pkg-${d}`, `file-${f}.js`), "x".repeat(1024))
  }
  writeFileSync(join(root, ".done"), "")
}

const control = process.argv.includes("--control")
const child = `
  import { snapshot } from "@webcontainer/snapshot"
  import { snapshotBounded } from "./patch-control.mjs"
  const started = performance.now()
  const buffer = await (${control} ? snapshotBounded : snapshot)(${JSON.stringify(root)})
  console.log(JSON.stringify({ bytes: buffer.byteLength, ms: Math.round(performance.now() - started), heapMb: Math.round(process.memoryUsage().heapUsed / 1e6) }))
`
const result = spawnSync(process.execPath, [`--max-old-space-size=${heapMb}`, "--input-type=module", "-e", child], { encoding: "utf8", cwd: import.meta.dirname, timeout: 10 * 60_000 })
console.log(`${control ? "control (bounded queue)" : "@webcontainer/snapshot 0.1.0"}, files: ${files}, heap limit: ${heapMb} MB, content: ~${Math.round(files * 1024 / 1e6)} MB`)
console.log(`exit: ${result.status} signal: ${result.signal}`)
console.log(result.stdout.trim())
const tail = result.stderr.split("\n").filter(line => /heap|Allocation|FATAL/i.test(line)).slice(0, 3).join("\n")
if (tail) console.log(tail)
if (result.status === 0) { console.log("PASS: snapshot() finished"); process.exit(0) }
console.log("FAIL: snapshot() did not finish")
process.exit(1)
