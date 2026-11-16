import { WorkflowEntrypoint } from "cloudflare:workers";

const attempts = new Map();

export class Demo extends WorkflowEntrypoint {
  async run(event, step) {
    switch (event.payload.mode) {
      case "sleep":
        await step.sleep("nap", "6 seconds");
        return "slept";
      case "waitForEvent":
        await step.waitForEvent("wait", { type: "go", timeout: "6 seconds" }).catch(() => {});
        return "timed out";
      case "retry":
        // The first attempt fails, so the step waits 6 seconds before its retry.
        return step.do("flaky", { retries: { limit: 2, delay: "6 seconds", backoff: "constant" } }, async () => {
          const n = (attempts.get(event.instanceId) ?? 0) + 1;
          attempts.set(event.instanceId, n);
          if (n === 1) throw new Error("first attempt fails");
          return "retried";
        });
    }
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/ready") return new Response("ok");
    if (url.pathname === "/start") {
      const instance = await env.WORKFLOW.create({ params: { mode: url.searchParams.get("mode") } });
      return new Response(instance.id);
    }
    const instance = await env.WORKFLOW.get(url.searchParams.get("id"));
    return new Response((await instance.status()).status);
  },
};
