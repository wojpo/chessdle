<script setup lang="ts">
import type { GameResult } from '~~/types/chesscom'

const props = defineProps<{
  result: GameResult
}>()

const WIN_RESULTS = [
  'win',
  'kingofthehill',
  'threecheck',
] as const

const DRAW_RESULTS = [
  'agreed',
  'repetition',
  'stalemate',
  'insufficient',
  '50move',
  'timevsinsufficient',
] as const

function isOneOf<T extends readonly string[]>(
  arr: T,
  value: string,
): value is T[number] {
  return arr.includes(value)
}

const iconName = computed(() => {
  const r = props.result

  if (isOneOf(DRAW_RESULTS, r)) return 'material-symbols:handshake'
  if (isOneOf(WIN_RESULTS, r)) return 'material-symbols:crown'
  if (r === 'resigned') return 'material-symbols:flag-rounded'
  if (r === 'timeout') return 'material-symbols:timer-off-outline-rounded'
  return null
})
</script>

<template>
  <UIcon
    v-if="iconName"
    class="size-6 sm:size-7 md:size-8"
    :name="iconName"
  />
</template>
