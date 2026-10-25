import { Hookable, createHooks } from 'hookable';
export let reads = 0;
const descriptors = new Map();
for (const name of ['hook', 'callHook', 'callHookWith']) {
  const descriptor = Object.getOwnPropertyDescriptor(Hookable.prototype, name);
  descriptors.set(name, descriptor);
  Object.defineProperty(Hookable.prototype, name, {
    configurable: true,
    get() { reads++; return descriptor.value; },
    set(value) { Object.defineProperty(this, name, { value, writable: true, configurable: true }); },
  });
}
createHooks();
for (const [name, descriptor] of descriptors) Object.defineProperty(Hookable.prototype, name, descriptor);
