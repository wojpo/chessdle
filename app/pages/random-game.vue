<script setup lang="ts">
import type { ChessGame } from '~~/types/chesscom'

const { data, pending, refresh }
  = await useFetch<ChessGame>('/api/random_game', {
    server: false,
  })

const newGame = async () => {
  await refresh()
}
</script>

<template>
  <div class="mt-10 space-y-6">
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
        Finding random game...
      </p>
    </div>

    <template v-else-if="data">
      <div
        v-if="!pending && data"
        class="fixed top-4 right-4 sm:top-8 sm:right-8 z-50 group"
      >
        <UButton
          color="primary"
          variant="subtle"
          size="xl"
          class="rounded-2xl shadow-lg backdrop-blur-xl bg-bg/40 border border-primary/20
               hover:scale-105 hover:border-primary/50 transition-all duration-300
               px-4 sm:px-6 h-12 sm:h-14 flex items-center gap-3
               group-hover:shadow-[0_0_20px_rgba(var(--color-primary),0.3)]"
          @click="newGame"
        >
          <span class="hidden sm:inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-primary/90">
            New Random Game
          </span>
          <UIcon
            name="i-lucide-shuffle"
            class="w-5 h-5 sm:w-6 sm:h-6 text-primary group-hover:rotate-180 transition-transform duration-700"
          />
        </UButton>
      </div>

      <FullGuessEloChess :data="data" />
    </template>
  </div>
</template>
