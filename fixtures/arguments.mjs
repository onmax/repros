import { createHooks, HookableCore } from 'hookable';
export const argumentEffects = [];
createHooks((argumentEffects.push('argument'), undefined));
const hooks = new HookableCore();
let seen = 0;
hooks.hook('ready', value => { seen = value; });
await hooks.callHook('ready', 7);
export const result = seen;
