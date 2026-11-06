import { z } from "zod";
import { name } from "peer-user";
import { count } from "pinned-user";

export default defineEventHandler(() => ({
  app: z.literal("ok").parse("ok"),
  peer: name.parse("a"),
  pinned: count.parse(1),
}));
