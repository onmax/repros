import { fetchService } from "nitro/services";

// Shiki bundled in the `ssr` service environment.
export default (event: { req: Request }) => fetchService("ssr", event.req);
