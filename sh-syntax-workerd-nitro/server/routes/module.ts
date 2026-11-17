import { getProcessor } from "sh-syntax";
// @ts-expect-error unwasm gives a WebAssembly.Module for `?module` imports.
import wasm from "sh-syntax/main.wasm?module";

const processor = getProcessor((imports: WebAssembly.Imports) => WebAssembly.instantiate(wasm, imports));

export default async () => {
  const file = await processor("echo hi");
  return { statements: file.stmts.length };
};
