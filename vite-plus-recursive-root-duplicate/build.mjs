// Stands in for a real build: it appends one line per run and holds a lock file for a second,
// so two copies of the same build in parallel are visible.
import { appendFileSync, existsSync, rmSync, writeFileSync } from "node:fs";

const name = process.argv[2];
const lock = `${name}.building`;
const concurrent = existsSync(lock);
writeFileSync(lock, "");
appendFileSync("runs.log", `${name}${concurrent ? " (another build of this package was running)" : ""}\n`);
await new Promise((resolve) => setTimeout(resolve, 1000));
rmSync(lock, { force: true });
