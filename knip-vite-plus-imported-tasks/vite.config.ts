import { defineConfig } from "vite-plus";

import { sharedTasks } from "./tasks.ts";

export default defineConfig({
  run: {
    tasks: {
      inline: { command: "node inline.mjs" },
      ...sharedTasks,
    },
  },
});
