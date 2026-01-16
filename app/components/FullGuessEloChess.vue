<script setup lang="ts">
import type { ChessGame } from '~~/types/chesscom'

const props = defineProps<{
  data: ChessGame
  date?: string
}>()

const guessedElo = ref<number | null>(null)

const isModalOpen = ref(false)

const result = ref<{
  elo: number
  guess: number
  diff: number
} | null>(null)

if (props.date) {
  const guessCookie = useCookie<{
    elo: number
    guess: number
    diff: number
  }>(props.date)

  if (guessCookie.value) {
    result.value = guessCookie.value
  }
}
const averageElo = computed(() => {
  if (!props.data) return null

  const white = props.data.white.rating
  const black = props.data.black.rating
  const avg = (white + black) / 2

  return Math.round(avg / 50) * 50
})

const showElo = ref(false)

const submitGuess = () => {
  if (guessedElo.value === null || averageElo.value === null) return

  const diff = Math.abs(guessedElo.value - averageElo.value)

  result.value = {
    elo: averageElo.value,
    guess: guessedElo.value,
    diff,
  }
  isModalOpen.value = true
  showElo.value = true
  if (props.date) {
    const daysCookie = useCookie<string[]>('days-cookie')

    if (!daysCookie.value) {
      daysCookie.value = []
    }

    if (!daysCookie.value.includes(props.date)) {
      daysCookie.value.push(props.date)
    }

    const guessCookie = useCookie<{ elo: number
      guess: number
      diff: number }>(props.date)
    guessCookie.value = result.value
  }
}
</script>

<template>
  <div
    class="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 items-center"
  >
    <div class="order-2 lg:order-1 flex flex-col items-center lg:items-end text-right">
      <div
        v-if="result"
        class="space-y-2 animate-in fade-in slide-in-from-left-4 duration-500"
      >
        <p class="text-gray-400 uppercase text-xs font-bold tracking-widest">
          Your Guess
        </p>
        <p class="text-5xl font-black text-secondary">
          {{ result.guess }}
        </p>
        <div class="h-1 w-12 bg-primary ml-auto mt-2" />
        <p class="text-sm mt-4">
          Difference: <span class="font-mono">{{ result.diff }}</span>
        </p>
      </div>
      <div
        v-else
        class="hidden lg:block text-gray-700 italic"
      >
        Submit your guess to see stats...
      </div>
    </div>
    <div class="order-1 lg:order-2 flex flex-col items-center">
      <ChessBoard
        v-if="data.pgn"
        :pgn="data.pgn"
        :time-control="data.time_control"
        :black="data.black"
        :white="data.white"
        :show-elo="showElo"
      />
      <form
        v-if="!result"
        class="flex gap-3"
        @submit.prevent="submitGuess"
      >
        <UInputNumber
          v-model="guessedElo"
          :step="50"
          placeholder="Guess ELO"
          :min="100"
          :max="2900"
          required
        />

        <UButton type="submit">
          Submit
        </UButton>
      </form>

      <div
        v-else
        class="mt-4 text-xl font-bold"
      >
        Average ELO:
        <span class="text-primary">
          {{ result.elo }}
        </span>
      </div>
    </div>

    <!-- RIGHT: empty spacer (keeps board centered (Im bad with styling sowwy)) -->
    <div class="order-3 hidden lg:block" />

    <UModal
      v-model:open="isModalOpen"
      :close="{
        color: 'primary',
        variant: 'outline',
        class: 'rounded-full',
      }"
    >
      <template #title>
        <p class="text-primary">
          Score :3
        </p>
      </template>
      <template #body>
        <div
          v-if="result"
          class="flex flex-col h-48 text-center space-y-3"
        >
          <h2
            class="text-4xl font-extrabold"
            :class="
              result.diff <= 150
                ? 'text-primary'
                : 'text-secondary'
            "
          >
            {{
              result.diff <= 50
                ? 'Perfect guess!!!'
                : result.diff <= 150
                  ? 'Close enough :3'
                  : 'Way off :<'
            }}
          </h2>
          <div class="text-xl flex flex-col space-y-5">
            <p>
              Your guess: <span class="font-bold text-secondary">{{ result.guess }}</span>
            </p>
            <p>
              Real ELO: <span class="font-bold text-secondary">{{ result.elo }}</span>
            </p>
            <p>
              Off by: <span class="font-bold text-secondary">{{ result.diff }}</span>
            </p>
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>
