import { createDebugger, flatHooks } from 'hookable';
export let registrations = 0;
export let unregistrations = 0;
const observerTarget = {
  beforeEach() { registrations++; return () => { unregistrations++; }; },
  afterEach() { registrations++; return () => { unregistrations++; }; },
};
const debuggerHandle = createDebugger(observerTarget);
debuggerHandle.close();
const output = {};
const ready = () => {};
flatHooks({ ready }, output);
export const flatOutputWritten = output.ready === ready;
