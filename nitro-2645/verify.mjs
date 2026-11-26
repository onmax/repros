// Builds the same source twice with the same SOURCE_DATE_EPOCH, as two CI runs
// of one commit would, and fails when the two outputs differ.
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readdirSync, readFileSync, rmSync, utimesSync } from "node:fs";
import { join, relative } from "node:path";

const root = import.meta.dirname;
const env = { ...process.env, SOURCE_DATE_EPOCH: "1700000000" };
const sources = ["public/hello.txt", "assets/data.txt"];

function build(checkoutTime) {
  // A fresh checkout gives every file the time of the checkout.
  for (const file of sources) {
    utimesSync(join(root, file), checkoutTime, checkoutTime);
  }
  rmSync(join(root, ".output"), { recursive: true, force: true });
  execFileSync("pnpm", ["exec", "nitro", "build"], { cwd: root, env, stdio: "ignore" });
  return snapshot(join(root, ".output"));
}

function snapshot(dir) {
  const files = new Map();
  for (const entry of readdirSync(dir, { recursive: true, withFileTypes: true })) {
    if (entry.isFile()) {
      const path = join(entry.parentPath, entry.name);
      files.set(relative(dir, path), readFileSync(path, "utf8"));
    }
  }
  return files;
}

const first = build(new Date("2026-01-01T00:00:00Z"));
const second = build(new Date("2026-02-01T00:00:00Z"));

const changed = [...new Set([...first.keys(), ...second.keys()])]
  .sort()
  .filter((file) => first.get(file) !== second.get(file));

const hash = (files) =>
  createHash("sha256")
    .update(JSON.stringify([...files].sort()))
    .digest("hex")
    .slice(0, 12);
console.log(`SOURCE_DATE_EPOCH=${env.SOURCE_DATE_EPOCH}`);
console.log(`build 1 .output: ${hash(first)}`);
console.log(`build 2 .output: ${hash(second)}`);

if (changed.length === 0) {
  console.log("PASS: both builds are byte-identical");
  process.exit(0);
}

console.log(`FAIL: ${changed.length} file(s) differ between the builds`);
for (const file of changed) {
  const a = (first.get(file) ?? "").split("\n");
  const b = (second.get(file) ?? "").split("\n");
  console.log(`\n--- ${file}`);
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    if (a[i] !== b[i]) {
      console.log(`  build 1: ${a[i]?.trim()}`);
      console.log(`  build 2: ${b[i]?.trim()}`);
    }
  }
}
process.exit(1);
