<script setup lang="ts">
import type { ChessGame } from '~~/types/chesscom'

const { data, pending } = await useFetch<ChessGame>('/api/random_game')

const guessedElo = ref<number | null>(null)

const averageElo = computed(() => {
  if (!data.value) return null

  const white = data.value.white.rating
  const black = data.value.black.rating
  const avg = (white + black) / 2

  return Math.ceil(avg / 50) * 50
})

const submitGuess = () => {
  if (guessedElo.value === null || averageElo.value === null) return

  const diff = Math.abs(guessedElo.value - averageElo.value)

  console.log(`Real avg ELO: ${averageElo.value}`)
  console.log(`User guess: ${guessedElo.value}`)
  console.log(`Off by: ${diff}`)
}
</script>

<template>
  <div>
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
      />
      <form
        class="flex gap-3"
        @submit.prevent="submitGuess"
      >
        <UInputNumber
          v-model="guessedElo"
          placeholder="Guess average ELO"
          :min="400"
          :max="3500"
          required
        />

        <UButton type="submit">
          Submit
        </UButton>
      </form>
    </div>
  </div>
</template>
