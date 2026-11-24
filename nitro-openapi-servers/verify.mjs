import { spawn } from "node:child_process";

const port = process.env.PORT || "3917";
const server = spawn(process.execPath, [".output/server/index.mjs"], {
  env: { ...process.env, PORT: port, HOST: "127.0.0.1" },
  stdio: "inherit",
});

let res;
for (let i = 0; i < 50 && !res; i++) {
  res = await fetch(`http://127.0.0.1:${port}/_openapi.json`, {
    headers: { "x-forwarded-proto": "https", "x-forwarded-host": "example.com" },
  }).catch(() => new Promise((r) => setTimeout(r, 100)));
}
server.kill();

const { servers } = await res.json();
console.log("servers:", JSON.stringify(servers));

const expected = process.argv.includes("--url-only") ? `https://127.0.0.1:${port}` : "https://example.com";
const problems = [];
if (servers[0].url !== expected) problems.push(`url is ${servers[0].url}, expected ${expected}`);
if (!process.argv.includes("--url-only") && servers[0].description === "Local Development Server") problems.push("production build says \"Local Development Server\"");

if (problems.length) {
  console.error("FAIL\n- " + problems.join("\n- "));
  process.exit(1);
}
console.log("PASS");
