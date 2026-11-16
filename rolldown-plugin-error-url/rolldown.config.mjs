import { failing } from './plugin.mjs'
export default { input: 'src/index.js', plugins: [failing()], output: { dir: 'dist' } }
