// AI-authored; not reviewed by a human.
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import Database from 'better-sqlite3'
import { loadNuxt } from 'nuxt'
assert.equal(process.version, 'v24.19.0')
const disclosure = 'AI-authored; not reviewed by a human.'
const provenance = JSON.parse(await readFile('.instrumented-content/provenance.json', 'utf8'))
const counts = globalThis.__contentOrder = {}
let nuxt
try {
  nuxt = await loadNuxt({ cwd: process.cwd(), dev: true, ready: true })
  const db = new Database(resolve('.data/content/contents.sqlite'), { readonly: true })
  const rows = db.prepare('SELECT * FROM _content_content ORDER BY id').all()
  const cache = db.prepare("SELECT id, value, checksum FROM _development_cache WHERE id != '__DATABASE_VERSION__' ORDER BY id").all()
  assert.equal(rows.length, 30)
  for (let i = 0; i < rows.length; i++) {
    assert.equal(rows[i].id, `content/report-${String(i).padStart(4, '0')}.md`)
    assert.equal(rows[i].title, `Report ${i}`)
    assert.ok(JSON.parse(rows[i].body))
  }
  for (let i = 0; i < cache.length; i++) {
    assert.equal(cache[i].id, rows[i].id)
    assert.equal(JSON.parse(cache[i].value).title, rows[i].title)
    assert.ok(cache[i].checksum)
  }
  const versionRow = db.prepare("SELECT value, checksum FROM _development_cache WHERE id = '__DATABASE_VERSION__'").get()
  assert.deepEqual(versionRow, { value: 'v3.5.0', checksum: 'v3.5.0' })
  const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex')
  const result = { disclosure, provenance, connector: process.env.CONNECTOR, ...counts, contentRows: rows.length, cacheRows: cache.length, contentSha256: hash(rows), cacheSha256: hash(cache) }
  db.close()
  await writeFile(process.env.RESULT_PATH, JSON.stringify(result, null, 2) + '\n')
} finally {
  await nuxt?.close()
}
