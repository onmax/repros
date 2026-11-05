import { spawn } from "node:child_process";
import { readFileSync, rmSync, writeFileSync } from "node:fs";
import { createServer } from "node:net";

const CONFIG = "vite.config.ts";
const config = readFileSync(CONFIG, "utf8");

const freePort = () =>
  new Promise((resolve) => {
    const s = createServer().listen(0, "127.0.0.1", () => {
      const { port } = s.address();
      s.close(() => resolve(port));
    });
  });

async function startVite() {
  const port = await freePort();
  const child = spawn("pnpm", ["exec", "vite", "--host", "127.0.0.1", "--port", String(port), "--strictPort"], {
    env: { ...process.env, NO_COLOR: "1" },
    detached: true,
  });
  let log = "";
  child.stdout.on("data", (d) => (log += d));
  child.stderr.on("data", (d) => (log += d));
  const waitFor = async (pattern, from = 0) => {
    for (let i = 0; i < 300; i++) {
      if (pattern.test(log.slice(from))) return;
      await new Promise((r) => setTimeout(r, 100));
    }
    throw new Error(`timed out waiting for ${pattern}\n${log}`);
  };
  await waitFor(/Local:/);
  return {
    get log() {
      return log;
    },
    waitFor,
    root: () => fetch(`http://127.0.0.1:${port}/`, { headers: { accept: "text/html" } }).then((r) => r.status),
    stop: () => process.kill(-child.pid, "SIGTERM"),
  };
}

const cleanup = () => {
  rmSync("index.html", { force: true });
  writeFileSync(CONFIG, config);
};

let vite;
try {
  cleanup();
  vite = await startVite();
  const before = await vite.root();

  writeFileSync("index.html", "<!doctype html><html><body>added after start</body></html>");
  const mark = vite.log.length;
  writeFileSync(CONFIG, config + "\n// edited to make vite restart\n");
  await vite.waitFor(/server restarted/, mark);
  const afterRestart = await vite.root();
  vite.stop();

  vite = await startVite();
  const newProcess = await vite.root();

  console.log(`GET / before index.html:                     ${before}`);
  console.log(`GET / after index.html and a vite restart:   ${afterRestart}`);
  console.log(`GET / in a new process with the same files:  ${newProcess}`);

  const ok = before === 404 && newProcess === 200;
  const reproduced = ok && afterRestart === 404;
  console.log(
    !ok ? "\nunexpected setup result" : reproduced ? "\nbug reproduced: the restart keeps the 404" : "\nbug not reproduced: the restart serves index.html"
  );
  process.exitCode = process.env.EXPECT_FIXED ? (ok && afterRestart === 200 ? 0 : 1) : reproduced ? 0 : 1;
} finally {
  vite?.stop();
  cleanup();
}
