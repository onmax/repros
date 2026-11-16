import { execSync, spawn } from "node:child_process";
import { readFileSync } from "node:fs";

const port = process.env.PORT || "47741";
execSync("npx nitro build", { stdio: "inherit" });

const wrangler = spawn(
  "npx",
  ["wrangler", "dev", "-c", ".output/server/wrangler.json", "--port", port, "--inspector-port", String(Number(port) + 1), "--ip", "127.0.0.1"],
  { detached: true, stdio: ["ignore", "pipe", "pipe"], env: { ...process.env, WRANGLER_SEND_METRICS: "false" } }
);
let log = "";
wrangler.stdout.on("data", (chunk) => (log += chunk));
wrangler.stderr.on("data", (chunk) => (log += chunk));

let status = 0;
try {
  for (let i = 0; i < 60 && !log.includes("Ready on"); i++) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  const meta = await fetch(`http://127.0.0.1:${port}/meta`).then((res) => res.text());
  const font = await fetch(`http://127.0.0.1:${port}/font`);
  console.log("\nGET /meta ->", meta);
  console.log("GET /font ->", font.status, await font.text());
  await new Promise((resolve) => setTimeout(resolve, 500));
  console.log(log.split("\n").filter((line) => /Invalid URL|_routes\/font/.test(line)).slice(0, 2).join("\n"));
  status = font.status;
} finally {
  process.kill(-wrangler.pid);
}

if (status !== 200) {
  console.error(`\nFAIL: GET /font returned ${status}`);
  process.exit(1);
}
console.log("\nPASS");
