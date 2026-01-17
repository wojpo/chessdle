<script setup lang="ts">
import { CalendarDate, parseDate, type DateValue } from '@internationalized/date'

const startDate = new CalendarDate(2026, 1, 16)

const now = new Date()
const today = new CalendarDate(
  now.getUTCFullYear(),
  now.getUTCMonth() + 1,
  now.getUTCDate(),
)

const daysCookie = useCookie<string[]>('days-cookie', {
  default: () => [],
  maxAge: 60 * 60 * 24 * 365,
  watch: true,
})

const highlightedDates = computed(() => {
  return daysCookie.value.map(d => parseDate(d))
})

const handleSelection = (newDates: DateValue[]) => {
  const currentStrings = daysCookie.value
  const newStrings = newDates.map(d => d.toString())

  const clickedDate = newStrings.find(d => !currentStrings.includes(d))
    || currentStrings.find(d => !newStrings.includes(d))

  if (clickedDate) {
    navigateTo(`${clickedDate}`)
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-dvh w-full p-4 sm:p-8">
    <div class="flex flex-col items-center gap-6 w-full max-w-sm mb-[10vh]">
      <header class="text-center">
        <h3 class="font-bold text-2xl text-primary tracking-tight">
          Daily games
        </h3>
        <p class="text-xs text-secondary mt-1">
          Select a date to play
        </p>
      </header>

      <div class="w-full p-2 sm:p-4 border border-primary rounded-2xl shadow-xl bg-bg backdrop-blur-sm">
        <UCalendar
          :model-value="highlightedDates"
          multiple
          :min-value="startDate"
          :max-value="today"
          :year-controls="false"
          class="w-full"
          @update:model-value="handleSelection"
        />
      </div>

      <span class="text-xs font-bold text-secondary">
        Days completed:
        {{ daysCookie.length }}
      </span>
    </div>
  </div>
</template>
