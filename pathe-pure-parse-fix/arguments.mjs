import { parse } from 'pathe';
const events = [];
parse((events.push('argument'), '/app/src/index.ts'));
try { parse((() => { throw new Error('argument-throw'); })()); } catch (error) { events.push(error.message); }
export const result = events;
