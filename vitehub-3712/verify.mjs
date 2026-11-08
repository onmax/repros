// Runs `nuxt prepare` and `nuxt build` for each case and checks the expected result.
// Exit 1 means the bug is present: `nuxt prepare` runs a production build check.
import { spawnSync } from "node:child_process"
import { rmSync } from "node:fs"
import { fileURLToPath } from "node:url"

const root = fileURLToPath(new URL(".", import.meta.url))
const cases = [
  { name: "database", error: "database_missing_d1_resource" },
  { name: "logs", error: "Production Logs needs an existing source" },
]

function nuxt(command, reproCase) {
  rmSync(new URL(".nuxt", import.meta.url), { force: true, recursive: true })
  rmSync(new URL(".vitehub", import.meta.url), { force: true, recursive: true })
  const result = spawnSync("pnpm", ["exec", "nuxt", command], {
    cwd: root,
    encoding: "utf8",
    env: { ...process.env, CI: "1", NO_COLOR: "1", REPRO_CASE: reproCase },
    timeout: 240_000,
  })
  return { output: `${result.stdout}${result.stderr}`, status: result.status }
}

let failed = false
for (const { name, error } of cases) {
  const prepare = nuxt("prepare", name)
  const prepareOk = prepare.status === 0 && !prepare.output.includes(error)
  console.log(`[${name}] nuxt prepare  expected: exit 0      actual: exit ${prepare.status}${prepare.output.includes(error) ? `, "${error}"` : ""}`)
  // The production build must keep the check.
  const build = nuxt("build", name)
  const buildOk = build.status !== 0 && build.output.includes(error)
  console.log(`[${name}] nuxt build    expected: "${error}"  actual: exit ${build.status}${build.output.includes(error) ? `, "${error}"` : ""}`)
  if (!prepareOk || !buildOk) failed = true
}

console.log(failed ? "FAIL: nuxt prepare runs production build checks (vite-hub/vitehub#3712)" : "PASS: nuxt prepare skips build checks, nuxt build keeps them")
process.exit(failed ? 1 : 0)
