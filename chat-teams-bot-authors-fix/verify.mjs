import assert from "node:assert/strict";
import { createTeamsAdapter } from "@chat-adapter/teams";

const cases = [
  { id: "other-bot", role: "bot", isBot: true, isMe: false },
  { id: "28:other-bot", isBot: true, isMe: false },
  { id: "28:test-app", isBot: true, isMe: true },
      { id: "test-app", isBot: true, isMe: true },
  { id: "29:human", role: "user", isBot: false, isMe: false },
  { id: "29:human", isBot: false, isMe: false },
];
const proveBug = process.argv.includes("--prove-bug");
const adapter = createTeamsAdapter({ appId: "test-app", appPassword: "test" });
const failures = [];
for (const sender of cases) {
  const message = adapter.parseMessage({
    type: "message",
    id: "reply-100",
    text: "Reply in a subscribed thread",
    from: { id: sender.id, name: "Sender", role: sender.role },
    conversation: { id: "19:channel@thread.tacv2;messageid=root-100" },
    serviceUrl: "https://smba.trafficmanager.net/teams/",
  });
  const actual = { isBot: message.author.isBot, isMe: message.author.isMe };
  const expected = { isBot: sender.isBot, isMe: sender.isMe };
  console.log(JSON.stringify({ sender, expected, actual }));
  try { assert.deepEqual(actual, expected); } catch { failures.push(sender.id); }
}
assert.deepEqual(failures, proveBug ? ["other-bot", "28:other-bot", "28:test-app", "test-app"] : [], proveBug
  ? "Unpatched parser must misclassify exactly four bot senders"
  : "Bot senders must be classified as bots while human controls stay human");
