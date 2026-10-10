export async function invoke(snapshot, prepare) {
  // Before this fix, readiness only considered executable, auth, and quota.
  if (!snapshot.installed || snapshot.auth.status !== "authenticated") throw new Error("provider unavailable")
  await prepare()
  return "started"
}
