import { spawnSync } from "node:child_process";
import { readFileSync, rmSync } from "node:fs";

rmSync("ctx.log", { force: true });
const tsc = spawnSync("node_modules/.bin/tsc", ["-p", "tsconfig.json", "--runExternalCode", "--pretty", "false"], { encoding: "utf8" });
if (tsc.status !== 0) throw new Error(`tsc failed:\n${tsc.stdout}${tsc.stderr}`);

const { contextKeys, rootDirFromOptions } = JSON.parse(readFileSync("ctx.log", "utf8").split("\n")[0]);
const expectedRootDir = new URL("src", import.meta.url).pathname;

console.log(`context keys:    ${JSON.stringify(contextKeys)}, expected to include "compilerOptions"`);
console.log(`"rootDir": "src": ${rootDirFromOptions}`);
console.log(`expected:         ${expectedRootDir}`);
process.exit(contextKeys.includes("compilerOptions") ? 0 : 1);
