<script setup lang="ts">
import type { ChessGame } from '~~/types/chesscom'

const route = useRoute()
const date = route.params.date as string

const { data, pending } = await useFetch<ChessGame>(`/api/daily/${date}`)
</script>

<template>
  <div class="mt-10">
    <div v-if="pending">
      Loading...
    </div>
    <FullGuessEloChess
      v-else-if="data"
      :data="data"
      :date="date"
    />
  </div>
</template>
