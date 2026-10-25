import { parseQuery } from 'ufo';
export const seeded = /(seed)/.test('seed');
parseQuery('?page=2&tag=a&tag=b');
export const capture = RegExp.$1;
export const match = RegExp.lastMatch;
