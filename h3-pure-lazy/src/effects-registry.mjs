import { defineLazyEventHandler, getQuery } from "h3/generic";

export const unused = defineLazyEventHandler(
  (globalThis.__h3ArgumentCalls += 1,
  () => {
    globalThis.__h3LoaderCalls += 1;
    return () => "H3_UNUSED_EFFECT_HANDLER";
  }),
);
export { getQuery };
