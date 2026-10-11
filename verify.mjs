import assert from "node:assert/strict"
import { execFile } from "node:child_process"
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { promisify } from "node:util"

const run = promisify(execFile)
const oldRevision = "c58aee865"
const fixedRevision = "9a0adf3a"
const repo = await mkdtemp(join(tmpdir(), "vitehub-capability-budget-"))
const source = join(repo, "source")
const test = await readFile(join(import.meta.dirname, "vitehub-capability-tool-budget", "repro.test.ts"), "utf8")
try {
  await run("git", ["clone", "--filter=blob:none", "https://github.com/vite-hub/vitehub.git", source], { maxBuffer: 4 * 1024 * 1024 })
  await run("git", ["-C", source, "fetch", "--depth=200", "origin", "feat/execution-budget-a", "feat/capability-tool-budget"], { maxBuffer: 4 * 1024 * 1024 })
  for (const [name, revision, expected] of [["before", oldRevision, "2"], ["after", fixedRevision, "1"]]) {
    const checkout = join(repo, name)
    await run("git", ["-C", source, "worktree", "add", "--detach", checkout, revision], { maxBuffer: 4 * 1024 * 1024 })
    await run("corepack", ["pnpm", "install", "--frozen-lockfile", "--ignore-scripts"], { cwd: checkout, maxBuffer: 4 * 1024 * 1024 })
    await writeFile(join(checkout, "packages/agent/test/repro-capability-tool-budget.test.ts"), test)
    const result = await run("corepack", ["pnpm", "--dir", "packages/agent", "exec", "vp", "test", "test/repro-capability-tool-budget.test.ts"], {
      cwd: checkout,
      env: { ...process.env, EXPECTED_CALLS: expected },
      maxBuffer: 8 * 1024 * 1024,
    })
    assert.match(result.stdout, /Test Files\s+1 passed/)
    await run("git", ["-C", source, "worktree", "remove", "--force", checkout])
    console.log(`${name} ${revision}: generic tool body calls=${expected}`)
  }
} finally {
  await rm(repo, { recursive: true, force: true })
}
