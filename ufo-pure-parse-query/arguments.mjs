import { parseQuery } from 'ufo';
const events = [];
parseQuery((events.push('argument'), '?page=2&tag=a&tag=b'));
try { parseQuery((() => { throw new Error('argument-throw'); })()); } catch (error) { events.push(error.message); }
export const result = events;
