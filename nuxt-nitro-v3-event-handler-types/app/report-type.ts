// Typechecks only when `$fetch` knows the handler's return type.
// When the type is `any`, the `@ts-expect-error` below is unused and fails with TS2578.
export async function readReport() {
  const report = await $fetch('/api/report')
  const count: number = report.count
  // @ts-expect-error `missing` is not a field of the report
  void report.missing
  return count
}
