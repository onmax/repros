import { defu, defuFn, defuArrayFn } from 'defu';
export function run() {
  let callbacks = 0;
  const config = defu({ port: 8080 }, { host: 'localhost' });
  const fn = defuFn({ value: previous => { callbacks++; return previous * 2; } }, { value: 2 });
  const array = defuArrayFn({ values: previous => { callbacks++; return [...previous, 3]; } }, { values: [1, 2] });
  return { config, fn, array, callbacks };
}

