import { highlight } from "./highlight.ts";

export default {
  async fetch() {
    return Response.json({ html: (await highlight()).length });
  },
};
