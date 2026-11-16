import { execSync, spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";

execSync("npx nitro build", { stdio: "inherit" });

const config = JSON.parse(readFileSync(".output/server/wrangler.json", "utf8"));
const bindings = config.d1_databases.map((entry) => entry.binding);
console.log("\nd1_databases bindings in .output/server/wrangler.json:", bindings);

const dryRun = spawnSync("npx", ["nitro", "deploy", "--prebuilt", ".", "--", "--dry-run"], {
  encoding: "utf8",
  env: { ...process.env, WRANGLER_SEND_METRICS: "false" },
});
const output = `${dryRun.stdout}${dryRun.stderr}`;
console.log(output.split("\n").filter((line) => /DB assigned|unique names|dry-run: exiting/.test(line)).join("\n"));

if (bindings.length !== new Set(bindings).size) {
  console.error("\nFAIL: expected one `DB` entry, got", bindings.length);
  process.exit(1);
}
console.log("\nPASS: one entry per binding");
