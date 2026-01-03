import { execSync } from "child_process";
import fs from "fs";

// Format once to normalize
execSync("pnpm fmt", { stdio: "pipe" });
const after1 = fs.readFileSync("a.vue", "utf-8");

// Format again - should be unchanged (idempotent)
execSync("pnpm fmt", { stdio: "pipe" });
const after2 = fs.readFileSync("a.vue", "utf-8");

// Format third time
execSync("pnpm fmt", { stdio: "pipe" });
const after3 = fs.readFileSync("a.vue", "utf-8");

if (after1 !== after2 || after2 !== after3) {
  console.log("❌ UNSTABLE: Format not idempotent");
  console.log("After 1st:", after1.split("\n").length, "lines");
  console.log("After 2nd:", after2.split("\n").length, "lines");
  console.log("After 3rd:", after3.split("\n").length, "lines");
  process.exit(1);
} else {
  console.log("✅ STABLE: Format is idempotent");
}
