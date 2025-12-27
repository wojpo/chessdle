<script setup lang="ts">
import type { ChessGame } from '~~/types/chesscom'

const { data, pending } = await useFetch<ChessGame>('/api/random_game')
</script>

<template>
  <div>
    <div v-if="pending">
      Loading...
    </div>
    <div v-else-if="data">
      <ChessBoard
        v-if="data.pgn"
        :pgn="data.pgn"
      />
    </div>
  </div>
</template>
