import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import { rmSync } from 'node:fs'

function run(cmd, args, opts = {}) {
  return new Promise((resolve) => {
    const p = spawn(cmd, args, { stdio: 'inherit', ...opts })
    p.on('close', (code) => resolve(code ?? 0))
  })
}

async function main() {
  // Ensure we detect writes from *this run*.
  rmSync('node_modules/@nuxthub/blob', { force: true, recursive: true })

  const code = await run('pnpm', ['-s', 'run', 'typecheck'])
  if (code !== 0) process.exit(code)

  if (existsSync('node_modules/@nuxthub/blob/blob.mjs')) {
    console.error('\nBug: `nuxt typecheck` wrote a physical shim into node_modules/@nuxthub/blob/.')
    console.error('This path is shared across processes, which enables races/corruption with concurrent Nuxt runs.')
    process.exit(1)
  }

  console.log('\nOK: `nuxt typecheck` did not write node_modules/@nuxthub/blob/.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
