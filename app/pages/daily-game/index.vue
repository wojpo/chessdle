<script setup lang="ts">
import type { ChessGame } from '~~/types/chesscom'
import FullGuessEloChess from '~/components/FullGuessEloChess.vue'

const today = new Date().toISOString().split('T')[0]

const { data, pending } = await useFetch<ChessGame>(`/api/daily/${today}`)
</script>

<template>
  <div class="mt-10">
    <div v-if="pending">
      Loading...
    </div>
    <FullGuessEloChess
      v-else-if="data"
      :data="data"
      :date="today"
    />
  </div>
</template>
