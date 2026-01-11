<script setup lang="ts">
import type { ChessGame } from '~~/types/chesscom'

const { data, pending } = await useFetch<ChessGame>('/api/random_game')

const guessedElo = ref<number | null>(null)

const isModalOpen = ref(false)

ref(false)
const result = ref<{
  elo: number
  guess: number
  diff: number
} | null>(null)

const averageElo = computed(() => {
  if (!data.value) return null

  const white = data.value.white.rating
  const black = data.value.black.rating
  const avg = (white + black) / 2

  return Math.ceil(avg / 50) * 50
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
}
</script>

<template>
  <div class="mt-10">
    <div v-if="pending">
      Loading...
    </div>
    <div
      v-else-if="data"
      class="flex flex-col items-center"
    >
      <ChessBoard
        v-if="data.pgn"
        :pgn="data.pgn"
        :time-control="data.time_control"
        :black-elo="data.black.rating"
        :white-elo="data.white.rating"
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
          :min="400"
          :max="2900"
          required
        />

        <UButton type="submit">
          Submit
        </UButton>
      </form>

      <div
        v-else
        class="mt-4 text-xl font-bold text-primary"
      >
        Average ELO:
        <span class="text-secondary">
          {{ result.elo }}
        </span>
      </div>

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
                result.diff <= 50
                  ? 'text-primary'
                  : result.diff <= 150
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
  </div>
</template>
