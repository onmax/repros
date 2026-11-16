# comark-content: every new instance rebuilds the SQL and search index

`sql-query` rebuilds its table on every `file:bulk:load` (`DROP TABLE`, `CREATE TABLE`, one `INSERT` per page in a `BEGIN`/`COMMIT`). `sqlite-full-text-search` deletes and re-inserts its rows on the first `search()` of each instance. When several server instances share one database, each new instance rewrites the whole index again, even when the content did not change.

- comark-content 0.6.2, comark 0.9.2
- Node 24.21.0, pnpm 10.33.2
- Database: `comark-content/database/sqlite-node` on one file, opened by two instances in a row
- 20 pages in `content/`

## Run

```sh
git clone --branch repro/comark-content-cold-rebuild https://github.com/onmax/repros.git
cd repros/comark-content-cold-rebuild
pnpm install --frozen-lockfile
pnpm verify
```

## Expected

The second instance finds the index the first one wrote and reuses it (for example after a content hash check), so it writes no rows.

## Actual

Both instances issue the same writes: 1 `DROP TABLE`, 1 `CREATE TABLE`, 2 `BEGIN`/`COMMIT` pairs, 20 `INSERT OR REPLACE` for `sql-query` and 40 `INSERT INTO` for full-text search.

```text
AssertionError: expected instance 2 to reuse the index, but it dropped the sql-query table
```

The index is only safe as per-instance state, such as an in-memory SQLite. Cloudflare D1 also rejects `BEGIN`, so these plugins can't use D1 as is.
