import { spawn } from 'node:child_process'
import { existsSync, rmSync } from 'node:fs'

function run(cmd, args, opts = {}) {
  return new Promise((resolve) => {
    const p = spawn(cmd, args, { stdio: 'inherit', ...opts })
    p.on('close', (code) => resolve(code ?? 0))
  })
}

async function main() {
  rmSync('node_modules/@nuxthub/db', { force: true, recursive: true })

  const code = await run('pnpm', ['-s', 'run', 'typecheck'])
  if (code !== 0) process.exit(code)

  if (existsSync('node_modules/@nuxthub/db/db.mjs')) {
    console.error('\nBug: `nuxt typecheck` wrote a physical shim into node_modules/@nuxthub/db/.')
    console.error('This path is shared across processes, which enables races/corruption with concurrent Nuxt runs.')
    process.exit(1)
  }

  const typeCode = await run('pnpm', ['-s', 'exec', 'tsc', '-p', 'tools/tsconfig.typing.json', '--pretty', 'false'])
  if (typeCode !== 0) {
    console.error('\nBug: `@nuxthub/db` types are missing (db/schema are `any`).')
    console.error('This matches the broken IntelliSense seen in:')
    console.error('https://github.com/nuxt-hub/core/pull/831#issuecomment-3891533442')
    process.exit(1)
  }

  console.log('\nOK: `nuxt typecheck` did not write node_modules/@nuxthub/db/.')
}

main().catch((e) => { console.error(e); process.exit(1) })
