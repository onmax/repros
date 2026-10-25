import { parseQuery, joinURL } from 'ufo';
parseQuery('?page=2&tag=a&tag=b');
export const result = joinURL('/api', 'users');
