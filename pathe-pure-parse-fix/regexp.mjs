import { parse } from 'pathe';
export const seeded = /(seed)/.test('seed');
parse('/app/src/index.ts');
export const capture = RegExp.$1;
export const match = RegExp.lastMatch;
