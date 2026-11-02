import { spawnSync } from "node:child_process";

const check = (config) =>
  spawnSync("node_modules/.bin/tsc", ["-p", config, "--runExternalCode", "--pretty", "false"], { encoding: "utf8" });

const byName = check("project/tsconfig.by-name.json");
if (byName.status !== 0) throw new Error(`the mapper fails by name too:\n${byName.stdout}`);
console.log('"package": "txt-mapper": exit 0');

const relative = check("project/tsconfig.json");
console.log(`"package": "../mapper":  exit ${relative.status}, expected 0\n${relative.stdout.trim()}`);
process.exit(relative.status === 0 ? 0 : 1);
