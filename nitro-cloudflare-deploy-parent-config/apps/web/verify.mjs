import { execSync, spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";

execSync("npx nitro build", { stdio: "inherit" });
console.log("\ndeploy command in .output/nitro.json:", JSON.parse(readFileSync(".output/nitro.json", "utf8")).commands.deploy);

// `.` is the app dir: without it, the CLI takes `--dry-run` as the dir
const dryRun = spawnSync("npx", ["nitro", "deploy", "--prebuilt", ".", "--", "--dry-run"], {
  encoding: "utf8",
  env: { ...process.env, WRANGLER_SEND_METRICS: "false" },
});
const output = `${dryRun.stdout}${dryRun.stderr}`;
console.log(output.split("\n").filter((line) => line.trim() && !/^\s+at /.test(line)).slice(0, 20).join("\n"));

if (dryRun.status !== 0) {
  console.error("\nFAIL: `nitro deploy --prebuilt` exited with", dryRun.status);
  process.exit(1);
}
console.log("\nPASS: Wrangler used the generated config");
