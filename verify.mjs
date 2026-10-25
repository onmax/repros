import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFile, readdir, mkdir, writeFile, rm } from "node:fs/promises";
import { resolve } from "node:path";

const root = import.meta.dirname;
const args = process.argv.slice(2);
assert(args.every((arg) => arg === "--offline"), "Usage: node verify.mjs [--offline]");
assert.equal(process.version, "v24.21.0", "Use the Node version pinned in .node-version");
const pnpm = process.platform === "win32" ? "pnpm.cmd" : "pnpm";
const version = spawnSync(pnpm, ["--version"], { encoding: "utf8", shell: process.platform === "win32" });
assert.equal(version.status, 0, "pnpm must be available");
assert.equal(version.stdout.trim(), "11.28.5", "Use pnpm 11.28.5");
const dirs = ["h3-pure-lazy", "h3-pure-lazy-fix"];
const files = await readdir(resolve(root, dirs[0], "src"));
assert.deepEqual(files, await readdir(resolve(root, dirs[1], "src")));
for (const file of files) {
  assert.equal(await readFile(resolve(root, dirs[0], "src", file), "utf8"),
    await readFile(resolve(root, dirs[1], "src", file), "utf8"), `Fixture differs: ${file}`);
}
const reports = [];
for (const [index, dir] of dirs.entries()) {
  const cwd = resolve(root, dir);
  console.log(`\n${dir}: install`);
  await rm(resolve(cwd, "node_modules"), { recursive: true, force: true });
  const install = spawnSync(pnpm, ["install", "--frozen-lockfile", "--ignore-scripts", ...args],
    { cwd, stdio: "inherit", shell: process.platform === "win32" });
  assert.equal(install.status, 0, `${dir}: install failed`);
  const check = spawnSync(process.execPath, [resolve(root, "scripts/verify-fixture.mjs")],
    { cwd, encoding: "utf8" });
  process.stdout.write(check.stdout);
  process.stderr.write(check.stderr);
  assert.equal(check.status, index === 0 ? 42 : 0, `${dir}: unexpected verification exit`);
  const report = JSON.parse(await readFile(resolve(cwd, ".output/results.json"), "utf8"));
  assert.equal(report.acceptance, index === 0 ? "FAIL_UNUSED_LAZY_HANDLER" : "PASS");
  reports.push(report);
}
assert.equal(reports[0].h3, reports[1].h3);
for (const before of reports[0].measurements) {
  const after = reports[1].measurements.find((m) =>
    m.entry === before.entry && m.bundler === before.bundler && m.fixture === before.fixture);
  assert(after);
  if (before.fixture === "live-only" || before.bundler === "esbuild") {
    assert.equal(after.sha256, before.sha256, `Expected unchanged output: ${JSON.stringify(before)}`);
  }
  if (before.fixture === "mixed") {
    assert.equal(before.unusedHandlerRetained, true, "Baseline must retain the exact unused marker");
    if (before.bundler === "rolldown") {
      assert.equal(after.unusedHandlerRetained, false);
      assert(after.raw < before.raw && after.gzip < before.gzip);
    }
  }
  if (before.fixture === "dead-argument" && before.bundler === "rolldown") {
    assert.equal(before.deadEffectHandlerRetained, true);
    assert.equal(after.deadEffectHandlerRetained, false);
  }
}
await mkdir(resolve(root, ".output"), { recursive: true });
await writeFile(resolve(root, ".output/comparison.json"),
  JSON.stringify({ baseline: reports[0], fixed: reports[1] }, null, 2) + "\n");
console.log("\nVerified: baseline fails the exact dead-handler assertion; patched package passes.");
console.log("Live-only output and all esbuild output are byte-identical. Runtime controls pass.");
