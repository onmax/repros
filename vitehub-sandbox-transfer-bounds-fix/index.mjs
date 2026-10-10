import { mkdir, rm, writeFile } from 'node:fs/promises'

const root = new URL('./assets/', import.meta.url)
await rm(root, { recursive: true, force: true })
await mkdir(root, { recursive: true })
const maxSidecars = 64
const payload = Array.from({ length: 200 }, (_, index) => new Uint8Array([index % 256]))
let sidecars = 0
for (const [id, bytes] of payload.entries()) {
  if (++sidecars > maxSidecars)
    throw new Error(`SANDBOX_TRANSFER_LIMIT: maxSidecars ${sidecars} > ${maxSidecars}`)
  await writeFile(new URL(String(id), root), bytes)
}
console.log(JSON.stringify({ sidecars }))
