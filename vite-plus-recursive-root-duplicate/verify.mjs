// Runs `vp run -r build` and counts how often each package's build ran.
// ROOT_SCRIPT overrides the root `build` script for the run (default: the one in package.json).
import { execFileSync } from "node:child_process";
import { readFileSync, rmSync, writeFileSync } from "node:fs";

const original = readFileSync("package.json", "utf8");
const pkg = JSON.parse(original);
if (process.env.ROOT_SCRIPT) pkg.scripts.build = process.env.ROOT_SCRIPT;
writeFileSync("package.json", `${JSON.stringify(pkg, null, 2)}\n`);
for (const p of ["a", "b"]) rmSync(`packages/${p}/runs.log`, { force: true });

try {
  console.log(`root "build" script: ${pkg.scripts.build}`);
  console.log(execFileSync("node_modules/.bin/vp", ["run", "--no-cache", "-r", "build"], { encoding: "utf8" }));
} finally {
  writeFileSync("package.json", original);
}

let failed = false;
for (const p of ["a", "b"]) {
  const runs = readFileSync(`packages/${p}/runs.log`, "utf8").trim().split("\n");
  console.log(`${p}#build ran ${runs.length} time(s)${runs.length > 1 ? `: ${runs.join(" | ")}` : ""}`);
  if (runs.length !== 1) failed = true;
  rmSync(`packages/${p}/runs.log`, { force: true });
}
if (failed) {
  console.error("\nFAIL: `vp run -r build` ran a package's build more than once");
  process.exit(1);
}
console.log("\nPASS: each package's build ran once");
