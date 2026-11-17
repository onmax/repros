import { execSync, spawn } from "node:child_process";

const port = process.env.PORT || "47761";
execSync("npx nitro build", { stdio: "inherit" });

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
  for (const route of ["/parse", "/module"]) {
    const res = await fetch(`http://127.0.0.1:${port}${route}`);
    const body = await res.text();
    console.log(`GET ${route} ->`, res.status, body);
    results[route] = res.status === 200 && JSON.parse(body).statements === 1;
  }
} finally {
  process.kill(-wrangler.pid);
}

if (!results["/parse"] || !results["/module"]) {
  console.error("\nFAIL: sh-syntax did not parse `echo hi` in workerd", results);
  console.error(log.split("\n").filter((line) => /Error|error/.test(line)).slice(0, 5).join("\n"));
  process.exit(1);
}
console.log("\nPASS: both the bare `sh-syntax` import and `main.wasm?module` + getProcessor parse `echo hi` in workerd");
