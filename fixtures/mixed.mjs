import { createHooks, HookableCore } from 'hookable';
createHooks();
const hooks = new HookableCore();
let seen = 0;
hooks.hook('ready', value => { seen = value; });
await hooks.callHook('ready', 7);
export const result = seen;
