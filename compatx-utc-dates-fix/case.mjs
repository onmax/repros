import { resolveCompatibilityDates } from "compatx";

const input = process.argv[2];
const passes = Number(process.argv[3] || 1);
let dates = input;
for (let i = 0; i < passes; i++) {
  dates = resolveCompatibilityDates(dates);
}
console.log(dates.default);
