function validateQuery(e){throw new Error("Invalid value: Expected >=1 but received 0")}
const handler=async e=>validateQuery(e);
function dispatch(e){return handler(e)}
const route=async e=>{await null;return dispatch(e)};
export const outer=async e=>await route(e);
//# sourceMappingURL=handler.mjs.map
