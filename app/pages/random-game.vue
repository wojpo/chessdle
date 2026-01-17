<script setup lang="ts">
import type { ChessGame } from '~~/types/chesscom'
import FullGuessEloChess from '~/components/FullGuessEloChess.vue'

const { data, pending } = await useFetch<ChessGame>('/api/random_game')
</script>

<template>
  <div class="mt-10">
    <div v-if="pending">
      Loading...
    </div>
    <FullGuessEloChess
      v-else-if="data"
      :data="data"
    />
  </div>
</template>
