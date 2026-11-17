import { spawn, spawnSync } from "node:child_process";

const port = process.env.PORT || "47781";

const build = spawnSync("npx", ["vite", "build"], { encoding: "utf8" });
const buildLog = build.stdout + build.stderr;
if (build.status !== 0) {
  console.log(buildLog.split("\n").filter((line) => /building|Rolldown failed/.test(line)).join("\n"));
  console.error("\nFAIL: `vite build` failed in the `ssr` service environment");
  process.exit(1);
}

const wrangler = spawn(
  "npx",
  ["wrangler", "dev", "-c", ".output/server/wrangler.json", "--port", port, "--inspector-port", String(Number(port) + 1), "--ip", "127.0.0.1"],
  { detached: true, stdio: ["ignore", "pipe", "pipe"], env: { ...process.env, WRANGLER_SEND_METRICS: "false" } },
);
let log = "";
wrangler.stdout.on("data", (chunk) => (log += chunk));
wrangler.stderr.on("data", (chunk) => (log += chunk));

const results = {};
try {
  for (let i = 0; i < 60 && !log.includes("Ready on"); i++) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  for (const route of ["/nitro", "/service"]) {
    const res = await fetch(`http://127.0.0.1:${port}${route}`);
    const body = await res.text();
    console.log(`GET ${route} ->`, res.status, body);
    results[route] = res.status === 200 && JSON.parse(body).html > 100;
  }
} finally {
  process.kill(-wrangler.pid);
}

if (!results["/nitro"] || !results["/service"]) {
  console.error("\nFAIL: Shiki did not highlight in workerd", results);
  process.exit(1);
}
console.log("\nPASS: Shiki highlights in the `nitro` environment and in the `ssr` service");
