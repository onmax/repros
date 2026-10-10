export async function invoke(snapshot, prepare) {
  if (!snapshot.installed || snapshot.auth.status !== "authenticated") throw new Error("provider unavailable")
  const model = snapshot.models?.find(entry => entry.slug === snapshot.configuredModel || entry.aliases?.includes(snapshot.configuredModel))
  if (snapshot.configuredModel && snapshot.models && !model) throw new Error(`configured model ${snapshot.configuredModel} is unavailable`)
  if (snapshot.workspaceCapacity?.status === "unavailable") throw new Error(snapshot.workspaceCapacity.reason)
  await prepare()
  return "started"
}
