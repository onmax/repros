import assert from "node:assert/strict"
import { spawnSync } from "node:child_process"
import { fileURLToPath } from "node:url"

// Child: print the Select value label the way a page in the runtime's language shows it.
if (process.argv[2] === "--label") {
  const { select } = await import("@ui-sdk/core/select")
  const { partState } = await import("@ui-sdk/core/renderer")
  const items = ["Apple", "Banana", "Orange", "Pear"].map((value) => ({ value, label: value }))
  const instance = select({ id: "fruit", multiple: true, items, defaultValue: items.map((item) => item.value) })
  process.stdout.write(partState(instance.part("value", { maxLabels: 2 })).label)
  process.exit(0)
}

// Without a document, ui-sdk falls back to the runtime's default locale, which ICU reads from LC_ALL.
function label(locale) {
  const result = spawnSync(process.execPath, [fileURLToPath(import.meta.url), "--label"], {
    env: { ...process.env, LC_ALL: locale, LANG: locale, TZ: "UTC" },
    encoding: "utf8",
  })
  assert.equal(result.status, 0, result.stderr)
  return result.stdout
}

console.log(`node ${process.version}, icu ${process.versions.icu}`)

const english = label("en_US.UTF-8")
console.log(`control en_US: expected "Apple, Banana, and 2 more", actual ${JSON.stringify(english)}`)
assert.equal(english, "Apple, Banana, and 2 more")

const spanish = label("es_ES.UTF-8")
console.log(`repro   es_ES: expected one language, not Spanish "y" with English "more"; actual ${JSON.stringify(spanish)}`)
assert.equal(spanish, "Apple, Banana y 2 more", "the bug did not reproduce")

console.log("Reproduced: the list joins in Spanish but the default count stays English.")
