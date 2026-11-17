// Generates two migrations with drizzle-kit, applies them to SQLite, and checks that a trigger on the table survives.
import { execFileSync } from "node:child_process"
import { readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { DatabaseSync } from "node:sqlite"

const v1 = `import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"
export const items = sqliteTable("items", { id: integer().primaryKey(), name: text() })
`
// Making `name` NOT NULL makes drizzle-kit rebuild the table.
const v2 = v1.replace("name: text()", "name: text().notNull()")

rmSync("drizzle", { recursive: true, force: true })
const generate = name => execFileSync("pnpm", ["exec", "drizzle-kit", "generate", "--name", name], { stdio: ["ignore", "pipe", "inherit"] }).toString()
writeFileSync("schema.ts", v1)
generate("init")
writeFileSync("schema.ts", v2)
const output = generate("not_null")
rmSync("schema.ts")

const [init, rebuild] = readdirSync("drizzle").sort().map(dir => readFileSync(`drizzle/${dir}/migration.sql`, "utf8").replaceAll("--> statement-breakpoint", ""))
console.log("Rebuild migration:\n" + rebuild)

const db = new DatabaseSync(":memory:")
db.exec(init)
// A trigger the app adds itself, for example in a --custom migration. Drizzle has no schema API for triggers.
db.exec(`CREATE TABLE audit (item_id INTEGER);
CREATE TRIGGER items_audit AFTER INSERT ON items BEGIN INSERT INTO audit VALUES (new.id); END;`)
const triggers = () => db.prepare("SELECT name FROM sqlite_master WHERE type = 'trigger'").all().map(row => row.name)
console.log("Triggers before the rebuild:", triggers())
db.exec(rebuild)
console.log("Triggers after the rebuild:", triggers())
// The output contains the working directory, which can contain "trigger" too.
console.log("drizzle-kit warned about the trigger:", /trigger/i.test(output.replaceAll(process.cwd(), "")))

if (!triggers().includes("items_audit")) {
  console.error("FAIL: the table rebuild dropped trigger items_audit without a warning.")
  process.exit(1)
}
console.log("PASS: the trigger survived.")
