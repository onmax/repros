# comark-content: full-text search goes stale after `update()`

The `sqlite-full-text-search` plugin indexes an instance once, on the first `search()`. It never listens to `file:upsert` or `file:remove`, so after `content.update(file)` the page body changes but `search()` keeps answering from the old text. The `sql-query` plugin in the same package hooks both events.

- comark-content 0.6.2, comark 0.9.2
- Node 24.21.0, pnpm 10.33.2
- Database: `comark-content/database/sqlite-node` (in-memory)

## Run

```sh
git clone --branch repro/comark-content-fts-upsert https://github.com/onmax/repros.git
cd repros/comark-content-fts-upsert
pnpm install --frozen-lockfile
pnpm verify
```

## Expected

After the page body changes from "alpaca" to "zebra", `search("zebra")` finds `/guide` and `search("alpaca")` finds nothing.

## Actual

```text
search("alpaca") before update: [ '/guide#guide' ]
get("/guide") after update: [["p",{},"The new word is zebra."]]
search("zebra") after update: []
search("alpaca") after update: [ '/guide#guide' ]
AssertionError: expected search("zebra") to find the updated page, got no results
```

The first `search()` stays in the script as a control: it builds the index, so the stale result can only come from the missing update.
