// Starts a Vite dev server with root work/app, loads work/shared/a.js through /@fs/, then
// replaces that file with `git checkout` twice and edits it in place. Fails when the server
// keeps serving an old version of the file.
// Usage: node verify.mjs        PIN=1 node verify.mjs (control: hold the old file open during
//                               each checkout, so the new file gets a new inode number)
import { execFileSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"
import { setTimeout as sleep } from "node:timers/promises"
import { createLogger, createServer, version } from "vite"

const pin = process.env.PIN === "1"
const work = path.resolve(import.meta.dirname, "work")
const file = path.join(work, "shared/a.js")
const git = (...args) =>
  execFileSync("git", ["-c", "user.name=repro", "-c", "user.email=repro@example.invalid", ...args], {
    cwd: work,
    env: { ...process.env, LC_ALL: "C", GIT_CONFIG_GLOBAL: "/dev/null", GIT_CONFIG_NOSYSTEM: "1" },
    encoding: "utf8",
  })
const label = (code) => code.match(/v[12]( edit)?/)?.[0] ?? "?"

fs.rmSync(work, { recursive: true, force: true })
fs.mkdirSync(path.join(work, "app"), { recursive: true })
fs.mkdirSync(path.join(work, "shared"))
fs.writeFileSync(file, 'export const label = "v1"\n')
git("init", "-q")
git("add", "-A")
git("commit", "-q", "-m", "v1")
fs.writeFileSync(file, 'export const label = "v2"\n')
git("commit", "-q", "-am", "v2")
git("tag", "v2")
git("reset", "-q", "--hard", "HEAD~1")

const filesystems = { 0xef53: "ext4", 0x01021994: "tmpfs", 0x9123683e: "btrfs", 0x58465342: "xfs" }
const fsType = fs.statfsSync(work).type
console.log(`vite ${version}, node ${process.version}, ${git("--version").trim()}, ${filesystems[fsType] ?? `filesystem 0x${fsType.toString(16)}`}${pin ? ", PIN=1" : ""}\n`)

const logs = []
const logger = createLogger("info")
logger.info = (msg) => logs.push(msg.replace(/\x1b\[[0-9;]*m/g, ""))
const server = await createServer({
  root: path.join(work, "app"),
  configFile: false,
  customLogger: logger,
  server: { host: "127.0.0.1", port: 0 },
})
await server.listen()
const url = `http://127.0.0.1:${server.httpServer.address().port}/@fs${file}`
const served = async () => label(await (await fetch(url)).text())

const steps = [
  ["load", () => {}],
  ["git checkout v2 -- shared/a.js", () => git("checkout", "v2", "--", "shared/a.js")],
  ["git checkout HEAD -- shared/a.js", () => git("checkout", "HEAD", "--", "shared/a.js")],
  ["edit shared/a.js in place", () => fs.writeFileSync(file, fs.readFileSync(file, "utf8").replace(/v[12]/, "$& edit"))],
]
let stale = 0
let inodeReused = false
for (const [name, run] of steps) {
  logs.length = 0
  const before = fs.statSync(file).ino
  const fd = pin && name.startsWith("git") ? fs.openSync(file, "r") : undefined
  run()
  if (fd !== undefined) fs.closeSync(fd)
  await sleep(1000)
  const after = fs.statSync(file).ino
  if (name.startsWith("git") && before === after) inodeReused = true
  const [onDisk, fromServer] = [label(fs.readFileSync(file, "utf8")), await served()]
  if (onDisk !== fromServer) stale++
  const updates = logs.filter((l) => /hmr update|page reload/.test(l)).map((l) => l.replace(/^.*?(hmr update|page reload) .*/, "$1"))
  console.log(
    `${name.padEnd(34)} disk ${onDisk.padEnd(7)} served ${fromServer.padEnd(7)} inode ${before === after ? "same" : "new "}  log: ${updates.join(", ") || "-"}${onDisk === fromServer ? "" : "  <- stale"}`,
  )
}
await server.close()

if (stale > 0) {
  console.error(`\nFAIL: the dev server served an old version ${stale} time(s) after the file changed on disk`)
  process.exit(1)
}
if (!pin && !inodeReused) {
  console.log("\nINCONCLUSIVE: git checkout gave the file a new inode number, so this run did not test inode reuse")
  process.exit(2)
}
console.log("\nPASS: the dev server served the current file after every change")
