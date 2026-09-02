import assert from "node:assert/strict";

import { betterAuth } from "better-auth";
import { memoryAdapter } from "better-auth/adapters/memory";

const baseURL = "http://localhost:3000";
const secret = "better-auth-cookie-cache-migration-secret";
const database = {
  user: [],
  session: [],
  account: [],
  verification: [],
};

const beforeMigration = betterAuth({
  baseURL,
  secret,
  database: memoryAdapter(database),
  emailAndPassword: { enabled: true },
  session: {
    cookieCache: {
      enabled: true,
      strategy: "jwe",
      maxAge: 300,
    },
  },
});

const signUpResponse = await beforeMigration.handler(
  new Request(`${baseURL}/api/auth/sign-up/email`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      email: "repro@example.com",
      name: "Repro",
      password: "repro-password",
    }),
  }),
);

assert.equal(signUpResponse.status, 200, await signUpResponse.text());

const cookieHeader = signUpResponse.headers
  .getSetCookie()
  .map((cookie) => cookie.split(";", 1)[0])
  .join("; ");

assert.match(cookieHeader, /better-auth\.session_token=/);
assert.match(cookieHeader, /better-auth\.session_data=/);
const sessionDataCookie = cookieHeader
  .split("; ")
  .find((cookie) => cookie.startsWith("better-auth.session_data="));
assert.equal(sessionDataCookie.split("=", 2)[1].split(".").length, 5);

const afterMigration = betterAuth({
  baseURL,
  secret,
  database: memoryAdapter(database),
  session: {
    cookieCache: { enabled: false },
  },
});

async function getSession(cookie) {
  const errors = [];
  const originalError = console.error;
  console.error = (...args) => errors.push(args.map(String).join(" "));
  try {
    const response = await afterMigration.handler(
      new Request(`${baseURL}/api/auth/get-session`, {
        headers: { cookie },
      }),
    );
    return { response, errors };
  } finally {
    console.error = originalError;
  }
}

const migrated = await getSession(cookieHeader);
const migratedBody = await migrated.response.text();

const sessionTokenOnly = cookieHeader
  .split("; ")
  .filter((cookie) => !cookie.startsWith("better-auth.session_data="))
  .join("; ");
const control = await getSession(sessionTokenOnly);
const controlBody = await control.response.text();

console.log(`before migration: Better Auth 1.7.2, cookie cache: JWE`);
console.log(`after migration: Better Auth 1.7.2, cookie cache: disabled`);
console.log(`migration request: ${migrated.response.status} ${migratedBody}`);
console.log(`migration error: ${migrated.errors.join("\n")}`);
console.log(`control request: ${control.response.status} ${controlBody}`);

assert.equal(migrated.response.status, 500);
assert.match(migrated.errors.join("\n"), /Invalid Base64 character: \./);
assert.equal(control.response.status, 200);
assert.match(controlBody, /repro@example\.com/);

console.log("\nReproduced: the stale JWE cache cookie turns a valid database session into a 500.");
