import { parse, basename } from 'pathe';
parse('/app/src/index.ts');
export const result = basename('/app/src/index.ts');
