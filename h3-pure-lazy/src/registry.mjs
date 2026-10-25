import { defineLazyEventHandler, getQuery } from "h3/generic";

export const unused = defineLazyEventHandler(() =>
  Promise.resolve(() => "H3_UNUSED_LAZY_HANDLER"),
);
export { getQuery };
