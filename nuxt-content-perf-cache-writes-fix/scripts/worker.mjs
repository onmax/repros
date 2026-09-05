// Written by an AI agent for onmax. Not reviewed by a human.
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { performance } from 'node:perf_hooks'
import Database from 'better-sqlite3'
import { loadNuxt } from 'nuxt'
const root = process.cwd()
const variant = JSON.parse(await readFile('.instrumented-content/provenance.json', 'utf8'))
const docs = Number(process.env.DOCS)
assert.equal(process.version, 'v24.19.0')
assert.ok(Number.isInteger(docs) && docs > 0)
const injectedError = new Error('Injected cache INSERT failure for rollback verification')
let cacheInserts = 0
let writerDatabase
const perf = globalThis.__contentPerf = { phase: 'startup', sql: [], expectedChecksums: {}, variant, docs, parserStartsOutsideTransaction: 0, queue: { peakRecords: 0, peakUtf8Bytes: 0, totalUtf8Bytes: 0 }, isInTransaction: () => writerDatabase?.inTransaction || false }
const record = (sql, db, execute, params = []) => {
  writerDatabase = db
  const type = /^\s*(BEGIN|COMMIT|ROLLBACK)\b/i.test(sql)
    ? sql.trim().split(/\s+/)[0].toUpperCase()
    : /_development_cache/.test(sql) && /^\s*(INSERT|UPDATE|DELETE)\b/i.test(sql)
      ? 'cache-' + sql.trim().split(/\s+/)[0].toUpperCase() : undefined
  if (!type) return execute()
  if (!perf.writerStorage && /_development_cache/.test(sql)) {
    perf.writerStorage = { journalMode: db.pragma('journal_mode', { simple: true }), synchronous: db.pragma('synchronous', { simple: true }), pageSize: db.pragma('page_size', { simple: true }), name: db.name }
  }
  if (process.env.INJECT_CACHE_FAILURE === '1' && type === 'cache-INSERT' && perf.phase === 'process' && ++cacheInserts === 5) throw injectedError
  const entry = { type, phase: perf.phase, cacheBatch: Boolean(perf.cacheBatchActive), inTransaction: db.inTransaction, key: type === 'cache-DELETE' ? params[0] : sql.match(/content\/report-\d+\.md/)?.[0] }
  const start = performance.now()
  try { return execute() } finally { entry.elapsedMs = performance.now() - start; perf.sql.push(entry) }
}
const originalExec = Database.prototype.exec
Database.prototype.exec = function (sql) { return record(sql, this, () => originalExec.call(this, sql)) }
const probeDb = new Database(':memory:')
const statementPrototype = Object.getPrototypeOf(probeDb.prepare('SELECT 1'))
const originalRun = statementPrototype.run
statementPrototype.run = function (...args) { return record(this.source, this.database, () => originalRun.apply(this, args), args) }
probeDb.close()
let nuxt
try {
  const start = performance.now()
  nuxt = await loadNuxt({ cwd: root, dev: true, ready: true })
  assert.notEqual(process.env.INJECT_CACHE_FAILURE, '1', 'Expected injected cache write failure to reject module initialization')
  perf.loadNuxtMs = performance.now() - start
  perf.memory = { peakRssKiB: process.resourceUsage().maxRSS, ...process.memoryUsage() }
  perf.phase = 'verification'
  const db = new Database(resolve(root, '.data/content/contents.sqlite'), { readonly: true })
  perf.storage = {
    journalMode: db.pragma('journal_mode', { simple: true }),
    synchronous: db.pragma('synchronous', { simple: true }),
    pageSize: db.pragma('page_size', { simple: true }),
    databaseList: db.pragma('database_list').map(({ name, file }) => ({ name, file })),
  }
  const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name LIKE '_content_%'").all()
  const table = tables.find(({ name }) => name === '_content_content')
  assert.ok(table, JSON.stringify(tables))
  const rows = db.prepare('SELECT * FROM _content_content ORDER BY id').all()
  assert.equal(rows.length, docs)
  for (let i = 0; i < docs; i++) {
    assert.equal(rows[i].id, `content/report-${String(i).padStart(4, '0')}.md`)
    assert.equal(rows[i].title, `Report ${i}`)
    assert.equal(rows[i].path, `/report-${String(i).padStart(4, '0')}`)
    assert.ok(JSON.parse(rows[i].body))
  }
  const cache = db.prepare("SELECT id, value, checksum FROM _development_cache WHERE id != '__DATABASE_VERSION__' ORDER BY id").all()
  const expectOriginalLoss = process.env.EXPECT_CACHE_LOSS === '1'
  assert.equal(cache.length, expectOriginalLoss ? 0 : docs)
  for (let i = 0; i < cache.length; i++) {
    assert.equal(cache[i].id, rows[i].id)
    assert.equal(JSON.parse(cache[i].value).title, rows[i].title)
    assert.equal(cache[i].checksum, perf.expectedChecksums[cache[i].id], 'Stored parser checksum must match the real current config, collection and content hash')
  }
  const versionRow = db.prepare("SELECT id, value, checksum FROM _development_cache WHERE id = '__DATABASE_VERSION__'").get()
  assert.equal(versionRow.value, 'v3.5.0')
  assert.equal(versionRow.checksum, 'v3.5.0')
  perf.cacheChecksumSha256 = createHash('sha256').update(JSON.stringify(cache.map(({ id, checksum }) => ({ id, checksum })))).digest('hex')
  const infoRows = db.prepare('SELECT * FROM _content_info ORDER BY id').all()
  assert.equal(infoRows.length, 1)
  assert.equal(infoRows[0].ready, 1)
  assert.ok(infoRows[0].version.startsWith('v3.5.0--'))
  perf.output = {
    infoRows,
    versionRow,
    cacheChecksumsVerified: !expectOriginalLoss,
    originalCacheLossReproduced: expectOriginalLoss,
    contentRows: rows.length,
    cacheRows: cache.length,
    contentSha256: createHash('sha256').update(JSON.stringify(rows)).digest('hex'),
    parsedCacheSha256: createHash('sha256').update(JSON.stringify(cache.map(({ id, value }) => ({ id, value })))).digest('hex'),
  }
  db.close()
  const cacheWrites = perf.sql.filter(row => row.phase === 'process' && row.type.startsWith('cache-'))
  const cacheBoundaries = perf.sql.filter(row => row.cacheBatch && ['BEGIN', 'COMMIT'].includes(row.type))
  const cacheBatchCommits = cacheBoundaries.filter(row => row.type === 'COMMIT').length
  if (variant.fixed && variant.kind === 'cache-writes') {
    assert.equal(cacheBatchCommits, variant.batchScope === 'all' ? Number(perf.parsedFilesCount > 0) : Math.ceil(perf.parsedFilesCount / 25))
    assert.ok(perf.queue.peakRecords <= (variant.batchScope === 'all' ? docs : 25))
  }
  assert.equal(perf.parserStartsOutsideTransaction, docs)
  perf.cacheWrites = {
    statements: cacheWrites.length,
    batches: cacheBatchCommits,
    outsideTransaction: cacheWrites.filter(row => !row.inTransaction).length,
    insideTransaction: cacheWrites.filter(row => row.inTransaction).length,
    statementMsExcludingBatchCommit: cacheWrites.reduce((sum, row) => sum + row.elapsedMs, 0),
    nativeDatabaseMsIncludingCommit: [...cacheWrites, ...cacheBoundaries].reduce((sum, row) => sum + row.elapsedMs, 0),
  }
  assert.equal(perf.filesCount, docs)
  assert.equal(perf.parsedFilesCount + perf.cachedFilesCount, docs)
  await writeFile(process.env.RESULT_PATH, JSON.stringify({ disclosure: 'Written by an AI agent for onmax. Not reviewed by a human.', ...perf }, null, 2) + '\n')
} catch (error) {
  if (process.env.INJECT_CACHE_FAILURE !== '1') {
    await writeFile(process.env.RESULT_PATH + '.failure.json', JSON.stringify({ disclosure: 'Written by an AI agent for onmax. Not reviewed by a human.', error: String(error), ...perf }, null, 2) + '\n')
    throw error
  }
  assert.equal(error, injectedError, 'The original cache write error must escape initialization')
  const db = new Database(resolve(root, '.data/content/contents.sqlite'), { readonly: true })
  const rows = db.prepare("SELECT count(*) AS count FROM _development_cache WHERE id != '__DATABASE_VERSION__'").get()
  assert.equal(rows.count, 0, 'The first four successful inserts must have rolled back')
  assert.equal(perf.sql.filter(row => row.type === 'ROLLBACK').length, 1)
  assert.equal(perf.sql.filter(row => row.type === 'COMMIT' && row.phase === 'process').length, 0)
  db.close()
  await writeFile(process.env.RESULT_PATH, JSON.stringify({ disclosure: 'Written by an AI agent for onmax. Not reviewed by a human.', ...perf, rollback: { originalErrorPropagated: true, documentCacheRows: rows.count } }, null, 2) + '\n')
} finally {
  await nuxt?.close()
}
