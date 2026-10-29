// An admin impersonation session should end after `impersonationSessionDuration`.
// Each scenario starts an impersonation, sends one request the way a client would,
// reads the session's expiry from the store, waits past the duration, and asks again.
//
// `node verify.mjs` asserts the documented behavior and fails while the bug exists.
// `node verify.mjs --expect-bug` asserts the reported failure instead.
import { readFileSync } from "node:fs"
import { setTimeout as sleep } from "node:timers/promises"

const expectBug = process.argv.includes("--expect-bug")
const packages = ["better-auth", "better-auth-beta"]
const origin = "http://localhost:3000"
const duration = 2 // seconds: admin({ impersonationSessionDuration })
const day = 24 * 60 * 60 * 1000

/** Merge the cookies that a response sets into a Cookie header, as a browser does. */
function jar(cookie, response) {
  const values = new Map(cookie.split("; ").filter(Boolean).map(pair => [pair.slice(0, pair.indexOf("=")), pair]))
  for (const header of response.headers.getSetCookie()) {
    const pair = header.split(";")[0]
    const name = pair.slice(0, pair.indexOf("="))
    if (/max-age=0/i.test(header) || pair.endsWith("=")) values.delete(name)
    else values.set(name, pair)
  }
  return [...values.values()].join("; ")
}

const only = (cookie, ...names) => cookie.split("; ").filter(pair => names.some(name => pair.startsWith(`${name}=`))).join("; ")
const maxAge = (response, name) => response.headers.getSetCookie().find(header => header.startsWith(`${name}=`))?.match(/max-age=(\d+)/i)?.[1]

/** A Map with TTLs, shaped like Better Auth's `secondaryStorage`. */
function memoryStorage() {
  const values = new Map()
  return {
    values,
    get: key => {
      const entry = values.get(key)
      return entry && (!entry.expires || entry.expires > Date.now()) ? entry.value : null
    },
    set: (key, value, ttl) => void values.set(key, { value, expires: ttl ? Date.now() + ttl * 1000 : 0 }),
    delete: key => void values.delete(key),
  }
}

async function app(pkg, { session, storage, stateless } = {}) {
  const { betterAuth } = await import(pkg)
  const { memoryAdapter } = await import(`${pkg}/adapters/memory`)
  const { admin, bearer } = await import(`${pkg}/plugins`)
  const db = { user: [], session: [], account: [], verification: [] }
  const auth = betterAuth({
    baseURL: origin,
    secret: "impersonation-refresh-repro-secret-0123456789",
    ...(stateless ? {} : { database: memoryAdapter(db) }),
    ...(storage ? { secondaryStorage: storage } : {}),
    emailAndPassword: { enabled: true },
    session,
    plugins: [admin({ impersonationSessionDuration: duration }), bearer()],
    telemetry: { enabled: false },
    logger: { level: "error" },
  })
  const request = (path, { method = "GET", cookie = "", authorization, body } = {}) => auth.handler(new Request(`${origin}/api/auth/${path}`, {
    method,
    headers: { origin, cookie, ...(authorization ? { authorization } : {}), ...(body ? { "content-type": "application/json" } : {}) },
    ...(body ? { body: JSON.stringify(body) } : {}),
  }))
  const signUp = async (name) => {
    const response = await request("sign-up/email", { method: "POST", body: { name, email: `${name}@example.com`, password: "passwordpassword" } })
    const { user } = await response.json()
    return { id: user.id, cookie: jar("", response) }
  }
  const operator = await signUp("operator")
  await (await auth.$context).internalAdapter.updateUser(operator.id, { role: "admin" })
  // Sign in again: with secondaryStorage, the first session keeps a copy of the user from before the role change.
  operator.cookie = jar("", await request("sign-in/email", { method: "POST", body: { email: "operator@example.com", password: "passwordpassword" } }))
  const member = await signUp("member")
  const started = await request("admin/impersonate-user", { method: "POST", cookie: operator.cookie, body: { userId: member.id } })
  if (started.status !== 200) throw new Error(`impersonate-user answered ${started.status}: ${await started.text()}`)
  const browser = jar(operator.cookie, started)
  /** The expiry that the server stores for the impersonation session, read without a refresh. */
  const stored = async () => {
    const current = await auth.api.getSession({
      headers: new Headers({ cookie: only(browser, "better-auth.session_token") }),
      query: { disableCookieCache: true, disableRefresh: true },
    })
    return new Date(current.session.expiresAt).getTime()
  }
  return { request, member, browser, authToken: started.headers.get("set-auth-token"), stored }
}

/** Every scenario: one request as the client sends it, then the same credentials after the duration. */
const scenarios = [
  {
    name: "browser, all cookies (control)",
    affected: false,
    send: (a, client) => a.request("get-session", { cookie: client }),
    client: a => a.browser,
  },
  {
    name: "session_token cookie only",
    affected: true,
    send: (a, client) => a.request("get-session", { cookie: client }),
    client: a => only(a.browser, "better-auth.session_token"),
  },
  {
    name: "bearer() with set-auth-token",
    affected: true,
    send: (a, client) => a.request("get-session", { authorization: client }),
    client: a => `Bearer ${a.authToken}`,
    auth: true,
  },
  {
    name: "session_token only, via /list-sessions",
    affected: true,
    send: (a, client) => a.request("list-sessions", { cookie: client }),
    client: a => only(a.browser, "better-auth.session_token"),
  },
  {
    name: "deferSessionRefresh, POST /get-session",
    affected: true,
    options: { session: { deferSessionRefresh: true } },
    send: (a, client) => a.request("get-session", { method: "POST", cookie: client, body: {} }),
    client: a => only(a.browser, "better-auth.session_token"),
  },
  {
    name: "secondaryStorage, session_token only",
    affected: true,
    options: { storage: true },
    send: (a, client) => a.request("get-session", { cookie: client }),
    client: a => only(a.browser, "better-auth.session_token"),
  },
  {
    // Better Auth turns refreshCache off when a database or secondaryStorage is configured,
    // so this branch runs only without a database.
    name: "no database, cookieCache.refreshCache (control)",
    affected: false,
    options: { stateless: true, session: { cookieCache: { enabled: true, maxAge: 300, refreshCache: { updateAge: 300 } } } },
    send: (a, client) => a.request("get-session", { cookie: client }),
    client: a => only(a.browser, "better-auth.session_token", "better-auth.session_data"),
  },
]

async function run(pkg, scenario) {
  const a = await app(pkg, { ...scenario.options, storage: scenario.options?.storage ? memoryStorage() : undefined })
  const before = await a.stored()
  const client = scenario.client(a)
  if (scenario.auth && !a.authToken) throw new Error("impersonate-user did not return set-auth-token")
  const response = await scenario.send(a, client)
  if (response.status !== 200) throw new Error(`${scenario.name}: answered ${response.status}`)
  const moved = await a.stored() - before
  const tokenMaxAge = maxAge(response, "better-auth.session_token")
  await sleep(duration * 1000 + 1000)
  const later = await (await (scenario.name.includes("list-sessions") ? a.request("get-session", { cookie: client }) : scenario.send(a, client))).json()
  const alive = later?.user?.id === a.member.id || (Array.isArray(later) && later.length > 0)
  return { scenario: scenario.name, affected: scenario.affected, movedMs: moved, alive, tokenMaxAge }
}

const failures = []
for (const pkg of packages) {
  const { version } = JSON.parse(readFileSync(new URL(`./node_modules/${pkg}/package.json`, import.meta.url), "utf8"))
  console.log(`\nbetter-auth ${version} (${pkg}), impersonationSessionDuration: ${duration}s, session.expiresIn: 7 days`)
  const results = await Promise.all(scenarios.map(scenario => run(pkg, scenario)))
  console.table(results.map(r => ({
    scenario: r.scenario,
    "expiry moved by": `${r.movedMs} ms${r.movedMs > 6 * day ? " (~7 days)" : ""}`,
    [`valid after ${duration + 1}s`]: r.alive,
    "session_token Max-Age set": r.tokenMaxAge ?? "-",
  })))
  for (const r of results) {
    const bounded = r.movedMs <= 0 && !r.alive
    const extended = r.movedMs > 6 * day && r.alive
    // Controls stay bounded in both modes. Affected scenarios are bounded only once the bug is fixed.
    const ok = !r.affected ? bounded : expectBug ? extended : bounded
    if (!ok) failures.push(`${version} ${r.scenario}: expiry moved by ${r.movedMs} ms, valid after the duration: ${r.alive}`)
  }
}

if (failures.length) {
  console.error(`\n${expectBug ? "The reported failure did not occur:" : "Impersonation sessions outlive impersonationSessionDuration:"}\n- ${failures.join("\n- ")}`)
  process.exit(1)
}
console.log(expectBug
  ? "\nReproduced: without the dont_remember cookie, every affected path refreshes the impersonation session to session.expiresIn, and it stays valid after impersonationSessionDuration."
  : "\nOK: every impersonation session ends after impersonationSessionDuration.")
