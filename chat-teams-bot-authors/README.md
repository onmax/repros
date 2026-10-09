# Teams bot sender classification

`@chat-adapter/teams` 4.39.0 marks every inbound Activity author as `isBot: false`, including other bots and the adapter's own bot. Applications that answer human replies in subscribed threads can therefore answer another bot.

This fixture calls the public `parseMessage` method with Bot Framework Activities. It uses documented `from.role: "bot"`, Teams bot account IDs with the `28:` prefix, and the adapter's own account IDs. The two `29:` human controls keep their role as human.

Pinned environment: Node 24.21.0, pnpm 10.33.2, `@chat-adapter/teams` 4.39.0. The fixture uses synthetic sender IDs and no credentials, network calls, or live Teams messages.

```sh
git clone --branch repro/chat-teams-bot-authors https://github.com/onmax/repros.git
cd repros/chat-teams-bot-authors
pnpm install --frozen-lockfile
pnpm verify --prove-bug
```

The bug verifier exits successfully only when exactly four bot cases report the wrong `isBot` value and both human controls pass. `pnpm verify` checks the intended behavior and fails on the unpatched package.

Microsoft's [Teams proactive-message Activity example](https://github.com/MicrosoftDocs/msteams-docs/blob/main/msteams-platform/bots/how-to/conversations/send-proactive-messages.md) uses `28:` for the bot account and `29:` for a human member. The pinned Teams SDK declares account roles as `user`, `bot`, or `skill`. This fixture proves parser classification; it does not prove cross-bot Activity delivery in a live tenant.
