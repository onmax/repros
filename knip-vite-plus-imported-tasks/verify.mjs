// Fails while Knip reports shared.mjs as unused although a vite-plus task runs it.
import { spawnSync } from "node:child_process";

const run = spawnSync("pnpm", ["exec", "knip", "--reporter", "json"], { encoding: "utf8" });
const report = JSON.parse(run.stdout);
const unusedFiles = report.issues.filter((issue) => issue.file && (issue.files?.length || issue.files === true)).map((issue) => issue.file);
console.log("knip output:", run.stdout.trim());
console.log("unused files:", unusedFiles);
console.log("expected: [] (both inline.mjs and shared.mjs are run by tasks in vite.config.ts)");
if (unusedFiles.includes("shared.mjs")) {
  console.error("FAIL: shared.mjs is reported unused; the task comes from a spread of an imported object");
  process.exit(1);
}
console.log("PASS");
