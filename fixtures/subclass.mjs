import { Hookable, createHooks } from 'hookable';
export let constructions = 0;
export let registrations = 0;
class CustomHooks extends Hookable {
  constructor() {
    super();
    constructions++;
  }
  hook(...args) {
    registrations++;
    return super.hook(...args);
  }
}
createHooks();
new CustomHooks();
const hooks = new CustomHooks();
let seen = 0;
hooks.hook('ready', value => { seen = value; });
await hooks.callHook('ready', 7);
export const result = seen;
