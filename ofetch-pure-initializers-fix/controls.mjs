import { $fetch, createFetch } from 'ofetch';
export { $fetch, createFetch };
export const events = [];
export const localResponse = () => new Response('{"ok":true}', {
  headers: { 'content-type': 'application/json' },
});
const local = createFetch({ fetch: async (_request, options) => {
  events.push(['request', options.method, options.body]);
  return localResponse();
} });
export const result = await local('/report', { method: 'POST', body: { item: 1 } });
// Unused public factory calls must retain argument evaluation and option getters.
createFetch((events.push('argument'), { get fetch() {
  events.push('options getter');
  return async () => localResponse();
} }));
try { createFetch({ get fetch() { throw new Error('options getter failed'); } }); }
catch (error) { events.push(error.message); }
try { createFetch(null); }
catch (error) { events.push(error.name); }
