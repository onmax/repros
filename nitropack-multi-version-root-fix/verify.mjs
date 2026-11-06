import { spawn, spawnSync } from "node:child_process";
import { readlinkSync, rmSync } from "node:fs";
import { createServer } from "node:net";

rmSync(".output", { recursive: true, force: true });
const build = spawnSync("pnpm", ["build"], { encoding: "utf8", env: { ...process.env, NO_COLOR: "1" } });
if (build.status !== 0) throw new Error(`build failed\n${build.stdout}${build.stderr}`);

const port = await new Promise((resolve) => {
  const s = createServer().listen(0, "127.0.0.1", () => {
    const { port } = s.address();
    s.close(() => resolve(port));
  });
});
const server = spawn("node", [".output/server/index.mjs"], { env: { ...process.env, PORT: String(port) } });
let log = "";
server.stdout.on("data", (d) => (log += d));
server.stderr.on("data", (d) => (log += d));

let res;
try {
  for (let i = 0; i < 50 && !res; i++) {
    await new Promise((r) => setTimeout(r, 100));
    res = await fetch(`http://127.0.0.1:${port}/`).catch(() => undefined);
  }
  if (!res) throw new Error(`server did not start\n${log}`);
  const body = await res.text();
  const root = readlinkSync(".output/server/node_modules/zod");
  console.log(`.output/server/node_modules/zod -> ${root}`);
  console.log(`GET / -> ${res.status} ${body.slice(0, 120)}`);
  const missing = log.match(/Cannot find module '[^']*'/)?.[0];
  if (missing) console.log(`server log: ${missing}`);

  const reproduced = res.status === 500 && root.endsWith("zod@4.6.7");
  const fixed = res.status === 200 && root.endsWith("zod@4.6.5");
  console.log(reproduced ? "\nbug reproduced" : fixed ? "\nbug not reproduced: the app's zod 4.6.5 has the root slot" : "\nunexpected result");
  process.exitCode = (process.env.EXPECT_FIXED ? fixed : reproduced) ? 0 : 1;
} finally {
  server.kill();
}
