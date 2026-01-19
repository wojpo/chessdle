<script setup lang="ts">
import type { ChessGame } from '~~/types/chesscom'

const route = useRoute()
const date = route.params.date as string

const { data, pending, error } = await useFetch<ChessGame>(
  `/api/daily/${date}`,
  {
    server: true,
  },
)

const isTooEarly = computed(() => error.value?.statusCode === 400)
</script>

<template>
  <div class="mt-10">
    <div
      v-if="pending"
      class="flex flex-col items-center justify-center gap-6 mt-24"
    >
      <div class="relative w-16 h-16">
        <div class="absolute inset-0 rounded-full border-4 border-primary/20" />
        <div
          class="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"
        />
      </div>

      <p class="text-sm tracking-widest uppercase text-secondary">
        Finding game...
      </p>
    </div>
    <div
      v-else-if="isTooEarly"
      class="fixed inset-0 flex flex-col items-center justify-center text-center"
    >
      <h2 class="text-4xl sm:text-5xl font-rawr text-primary mb-4">
        You're here too early :3
      </h2>

      <div class="h-px w-12 bg-primary/20 mb-6" />

      <p class="text-[11px] font-bold tracking-[0.2em] uppercase text-secondary/40 leading-relaxed mb-8">
        Try a date from Jan 1, 2026 <br> to today!
      </p>
    </div>
    <FullGuessEloChess
      v-else-if="data"
      :data="data"
      :date="date"
    />
  </div>
</template>
