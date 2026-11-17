// Control from ../webcontainer-snapshot-race-memory: the same walk with a bounded queue instead of Promise.race over every pending task.
// Only the scheduling changes; reads, the index shape and the encoder stay the same.
import fs from "node:fs/promises"
import { join } from "node:path"
import { encode } from "@msgpack/msgpack"

export async function snapshotBounded(root, limit = 64) {
  const index = { d: {} }
  const queue = [{ path: root, folder: index.d }]
  const work = async ({ path, folder }) => {
    for (const name of await fs.readdir(path)) {
      const full = join(path, name)
      const stats = await fs.lstat(full)
      if (stats.isDirectory()) { const d = {}; folder[name] = { d }; queue.push({ path: full, folder: d }) }
      else if (stats.isFile()) folder[name] = { f: { c: await fs.readFile(full) } }
    }
  }
  const running = new Set()
  while (queue.length > 0 || running.size > 0) {
    while (queue.length > 0 && running.size < limit) {
      const task = work(queue.shift()).finally(() => running.delete(task))
      running.add(task)
    }
    await Promise.race(running)
  }
  return Buffer.from(encode(index))
}
