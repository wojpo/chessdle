<script setup lang="ts">
import type { ChessGame } from '~~/types/chesscom'
import FullGuessEloChess from '~/components/FullGuessEloChess.vue'

const today = new Date().toISOString().split('T')[0]

const { data, pending } = await useFetch<ChessGame>(`/api/daily/${today}`)
</script>

<template>
  <div class="mt-10">
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
      <FullGuessEloChess
        v-else-if="data"
        :data="data"
        :date="today"
      />
    </div>
  </div>
</template>
