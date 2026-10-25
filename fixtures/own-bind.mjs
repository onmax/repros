import { Hookable, createHooks } from 'hookable';
export let binds = 0;
const hook = Hookable.prototype.hook;
Object.defineProperty(hook, 'bind', {
  configurable: true,
  value(receiver) { binds++; return Function.prototype.bind.call(hook, receiver); },
});
createHooks();
delete hook.bind;
