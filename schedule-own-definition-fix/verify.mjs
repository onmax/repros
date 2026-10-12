import assert from "node:assert/strict"
import { defineSchedule, defineScheduleTarget } from "./node_modules/@vite-hub/schedule/dist/definition.js"

const prototype = {
  cron: "0 9 * * *",
  handler: () => "inherited",
}
const inheritedSchedule = Object.create(prototype)

let scheduleThrew = false
try {
  defineSchedule(inheritedSchedule)
} catch {
  scheduleThrew = true
}
assert.equal(scheduleThrew, true, "defineSchedule must reject required fields inherited from a prototype")

const inheritedTarget = Object.create({ handler: () => "inherited" })
let targetThrew = false
try {
  defineScheduleTarget(inheritedTarget)
} catch {
  targetThrew = true
}
assert.equal(targetThrew, true, "defineScheduleTarget must reject a handler inherited from a prototype")

console.log("PASS: inherited definition fields are rejected")
