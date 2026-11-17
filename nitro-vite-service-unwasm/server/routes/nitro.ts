import { highlight } from "../../highlight.ts";

// The same Shiki import, bundled in the `nitro` environment.
export default async () => ({ html: (await highlight()).length });
