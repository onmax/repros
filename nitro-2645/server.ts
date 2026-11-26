import { useKV } from "nitro/kv";

export default {
  async fetch() {
    return new Response(await useKV("assets:server").getItem("data.txt"));
  },
};
