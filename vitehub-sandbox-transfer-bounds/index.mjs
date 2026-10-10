import { mkdir, rm, writeFile } from 'node:fs/promises'

const root = new URL('./assets/', import.meta.url)
await rm(root, { recursive: true, force: true })
await mkdir(root, { recursive: true })

// This is the transfer shape used by ViteHub Sandbox before bounded sidecars:
// every binary value gets a file and no count or byte budget is checked.
const payload = Array.from({ length: 200 }, (_, index) => new Uint8Array([index % 256]))
const descriptors = await Promise.all(payload.map(async (bytes, id) => {
  await writeFile(new URL(String(id), root), bytes)
  return { id, kind: 'uint8array', tag: 'binary' }
}))
console.log(JSON.stringify({ sidecars: descriptors.length }))
