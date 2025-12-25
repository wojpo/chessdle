<script setup lang="ts">
import { Chessground } from '@lichess-org/chessground'
import type { Api } from '@lichess-org/chessground/api'
import type { Config } from '@lichess-org/chessground/config'
import { Chess, type Move } from 'chess.js'

import '@lichess-org/chessground/assets/chessground.base.css'
import '@/assets/css/chessground.custom.css'
import '@lichess-org/chessground/assets/chessground.cburnett.css'

const boardRef = ref<HTMLElement | null>(null)
const chess = new Chess()
let cg: Api | null = null

const pgn = '1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4'
const history = ref<Move[]>([])
const currentIndex = ref<number>(-1)

onMounted(() => {
  chess.loadPgn(pgn)
  history.value = chess.history({ verbose: true })
  chess.reset()

  if (boardRef.value) {
    const config: Config = {
      fen: chess.fen(),
      viewOnly: true,
      coordinates: true,
    }
    cg = Chessground(boardRef.value, config)
  }
})

const jumpToMove = (index: number) => {
  const tempGame = new Chess()

  for (let i = 0; i <= index; i++) {
    const move = history.value[i]
    if (move) {
      tempGame.move(move.san)
    }
  }

  currentIndex.value = index

  if (cg) {
    const currentMove = history.value[index]
    cg.set({
      fen: tempGame.fen(),
      lastMove: currentMove
        ? [currentMove.from, currentMove.to]
        : undefined,
    })
  }
}

const next = () => currentIndex.value < history.value.length - 1 && jumpToMove(currentIndex.value + 1)
const prev = () => currentIndex.value >= 0 && jumpToMove(currentIndex.value - 1)
const first = () => jumpToMove(-1)
const last = () => jumpToMove(history.value.length - 1)

onBeforeUnmount(() => {
  if (cg) cg.destroy()
})
</script>

<template>
  <div class="flex flex-col items-center gap-4 p-6">
    <div
      ref="boardRef"
      class="w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] rounded-sm overflow-hidden shadow-lg"
    />

    <div class="flex items-center gap-1 text-bg font-bold">
      <button
        :disabled="currentIndex === -1"
        class="bg-primary p-3 rounded-md shadow"
        @click="first"
      >
        «
      </button>
      <button
        :disabled="currentIndex === -1"
        class="bg-primary p-3 rounded-md shadow"
        @click="prev"
      >
        ‹
      </button>

      <div class="px-4 bg-primary p-3 font-rawr rounded-md shadow">
        {{ currentIndex + 1 }} / {{ history.length }}
      </div>

      <button
        :disabled="currentIndex >= history.length - 1"
        class="bg-primary p-3 rounded-md shadow"
        @click="next"
      >
        ›
      </button>
      <button
        :disabled="currentIndex >= history.length - 1"
        class="bg-primary p-3 rounded-md shadow"
        @click="last"
      >
        »
      </button>
    </div>

    <div class="max-w-[480px] text-center italic text-primary text-sm">
      {{ currentIndex >= 0 ? history[currentIndex]?.san : 'Starting Position' }}
    </div>
  </div>
</template>
