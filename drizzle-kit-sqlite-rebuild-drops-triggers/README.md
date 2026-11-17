# drizzle-kit: SQLite table rebuild drops triggers

drizzle-kit rebuilds an SQLite table (`CREATE TABLE __new_x`, copy, `DROP TABLE x`, rename) for changes that `ALTER TABLE` cannot do, such as making a column `NOT NULL`. SQLite drops every trigger on a table when the table is dropped, and the migration does not recreate them. drizzle-kit prints no warning.

## Environment

- drizzle-kit 1.0.0-rc.5, drizzle-orm 1.0.0-rc.5
- Node 24.21.0 (uses `node:sqlite`), Linux

## Verify

```sh
pnpm install
pnpm verify
```

`verify.mjs` writes a schema, runs `drizzle-kit generate`, changes `name` to `NOT NULL`, generates again, applies both migrations to an in-memory SQLite database, and adds an `AFTER INSERT` trigger before the second one.

Expected: the trigger `items_audit` still exists after the rebuild migration, or drizzle-kit warns that the rebuild drops it.

Actual:

```
Triggers before the rebuild: [ 'items_audit' ]
Triggers after the rebuild: []
drizzle-kit warned about the trigger: false
FAIL: the table rebuild dropped trigger items_audit without a warning.
```

The command exits 1 while the bug is present.
