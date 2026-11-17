import { statSync } from 'node:fs'

// tool.js is committed with git mode 100755. Node prints: tool.js mode 755
console.log(`tool.js mode ${(statSync('tool.js').mode & 0o777).toString(8)}`)
