import { createSingletonPromise } from '@vueuse/shared';
export const load = createSingletonPromise(() => Promise.resolve(42));
