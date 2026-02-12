<script setup lang="ts">
import { CalendarDate } from '@internationalized/date'
import { RangeCalendarCell, RangeCalendarCellTrigger, RangeCalendarGrid, RangeCalendarGridBody, RangeCalendarGridHead, RangeCalendarGridRow, RangeCalendarHeadCell, RangeCalendarHeader, RangeCalendarHeading, RangeCalendarNext, RangeCalendarPrev, RangeCalendarRoot } from 'reka-ui'
import { ref } from 'vue'

// Bug 1: Null modelValue crash
const nullValue = ref(null)

// Bug 2: Controlled end lost
const controlledRange = ref({
  start: new CalendarDate(2025, 1, 10),
  end: new CalendarDate(2025, 1, 20),
})
const preservedEnd = new CalendarDate(2025, 1, 20)
function onControlledUpdate(val: any) {
  controlledRange.value = {
    start: val.start ?? controlledRange.value.start,
    end: val.end ?? preservedEnd,
  }
}

// Bug 3: fixedWeeks + stale highlight
const fixedWeeksPlaceholder = ref(new CalendarDate(2025, 2, 1))
</script>

<template>
  <div style="font-family: sans-serif; padding: 2rem; display: flex; flex-direction: column; gap: 3rem;">
    <!-- Bug 1: Null modelValue crash -->
    <section>
      <h2>Bug 1: Null modelValue crash</h2>
      <p>RangeCalendar with <code>:model-value="null"</code> crashes on mount.</p>
      <RangeCalendarRoot v-model="nullValue" style="border: 1px solid #ccc; padding: 1rem; border-radius: 8px; width: fit-content;">
        <RangeCalendarHeader style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <RangeCalendarPrev>&lt;</RangeCalendarPrev>
          <RangeCalendarHeading />
          <RangeCalendarNext>&gt;</RangeCalendarNext>
        </RangeCalendarHeader>
        <RangeCalendarGrid>
          <RangeCalendarGridHead>
            <RangeCalendarGridRow>
              <RangeCalendarHeadCell v-for="day in 7" :key="day" />
            </RangeCalendarGridRow>
          </RangeCalendarGridHead>
          <RangeCalendarGridBody v-slot="{ weekDates }">
            <RangeCalendarGridRow v-for="(week, i) in weekDates" :key="i">
              <RangeCalendarCell v-for="date in week" :key="date.toString()" :date="date">
                <RangeCalendarCellTrigger :day="date" :month="date" />
              </RangeCalendarCell>
            </RangeCalendarGridRow>
          </RangeCalendarGridBody>
        </RangeCalendarGrid>
      </RangeCalendarRoot>
    </section>

    <!-- Bug 2: Controlled end lost -->
    <section>
      <h2>Bug 2: Controlled range — end disappears</h2>
      <p>Click a new start date. Parent preserves <code>end</code>, but it vanishes from the calendar.</p>
      <p>Current: {{ controlledRange.start?.toString() }} → {{ controlledRange.end?.toString() }}</p>
      <RangeCalendarRoot
        :model-value="controlledRange"
        :default-placeholder="new CalendarDate(2025, 1, 1)"
        style="border: 1px solid #ccc; padding: 1rem; border-radius: 8px; width: fit-content;"
        @update:model-value="onControlledUpdate"
      >
        <RangeCalendarHeader style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <RangeCalendarPrev>&lt;</RangeCalendarPrev>
          <RangeCalendarHeading />
          <RangeCalendarNext>&gt;</RangeCalendarNext>
        </RangeCalendarHeader>
        <RangeCalendarGrid>
          <RangeCalendarGridHead>
            <RangeCalendarGridRow>
              <RangeCalendarHeadCell v-for="day in 7" :key="day" />
            </RangeCalendarGridRow>
          </RangeCalendarGridHead>
          <RangeCalendarGridBody v-slot="{ weekDates }">
            <RangeCalendarGridRow v-for="(week, i) in weekDates" :key="i">
              <RangeCalendarCell v-for="date in week" :key="date.toString()" :date="date">
                <RangeCalendarCellTrigger :day="date" :month="date" />
              </RangeCalendarCell>
            </RangeCalendarGridRow>
          </RangeCalendarGridBody>
        </RangeCalendarGrid>
      </RangeCalendarRoot>
    </section>

    <!-- Bug 3: Stale highlight + fixedWeeks layout jump -->
    <section>
      <h2>Bug 3: Stale highlight &amp; fixedWeeks layout jump</h2>
      <p>Click a start date, hover over dates, then move mouse outside the grid — highlight stays stuck. Navigate months to see layout jump (no fixedWeeks).</p>
      <RangeCalendarRoot
        v-model:placeholder="fixedWeeksPlaceholder"
        style="border: 1px solid #ccc; padding: 1rem; border-radius: 8px; width: fit-content;"
      >
        <RangeCalendarHeader style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <RangeCalendarPrev>&lt;</RangeCalendarPrev>
          <RangeCalendarHeading />
          <RangeCalendarNext>&gt;</RangeCalendarNext>
        </RangeCalendarHeader>
        <RangeCalendarGrid>
          <RangeCalendarGridHead>
            <RangeCalendarGridRow>
              <RangeCalendarHeadCell v-for="day in 7" :key="day" />
            </RangeCalendarGridRow>
          </RangeCalendarGridHead>
          <RangeCalendarGridBody v-slot="{ weekDates }">
            <RangeCalendarGridRow v-for="(week, i) in weekDates" :key="i">
              <RangeCalendarCell v-for="date in week" :key="date.toString()" :date="date">
                <RangeCalendarCellTrigger :day="date" :month="date" />
              </RangeCalendarCell>
            </RangeCalendarGridRow>
          </RangeCalendarGridBody>
        </RangeCalendarGrid>
      </RangeCalendarRoot>
    </section>
  </div>
</template>
