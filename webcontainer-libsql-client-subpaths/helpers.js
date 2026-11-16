import { WebContainer } from "/node_modules/@webcontainer/api/dist/index.js"

export const boot = () => WebContainer.boot({ coep: "require-corp" })

/** Runs a command to its end and returns the exit code and output without terminal escapes. */
export async function run(container, command, args = []) {
  const process = await container.spawn(command, args)
  let output = ""
  process.output.pipeTo(new WritableStream({ write(chunk) { output += chunk } }))
  const exit = await process.exit
  output = output.replace(/\x1b\[[0-9;?]*[a-zA-Z]/g, "").replace(/\r/g, "").replace(/[\\|/-]{4,}/g, "").trim()
  return { exit, output }
}
