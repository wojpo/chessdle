<script setup lang="ts">
import { Chessground } from '@lichess-org/chessground'
import type { Api } from '@lichess-org/chessground/api'
import type { Config } from '@lichess-org/chessground/config'
import { Chess, type Move } from 'chess.js'

import '@lichess-org/chessground/assets/chessground.base.css'
import '@/assets/css/chessground.custom.css'
import '@lichess-org/chessground/assets/chessground.cburnett.css'

const props = defineProps<{
  pgn: string
}>()

const boardRef = ref<HTMLElement | null>(null)
const chess = new Chess()
let cg: Api | null = null

const history = ref<Move[]>([])
const currentIndex = ref<number>(-1)

onMounted(() => {
  chess.loadPgn(props.pgn)
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
    <div class="w-full max-w-[320px] sm:max-w-[480px] flex justify-between items-center mb-1">
      <div class="bg-secondary text-white px-4 py-1.5 rounded-md font-mono text-xl shadow-inner border border-primary/5 min-w-[110px] text-center">
        10:00
      </div>
      <div class="bg-secondary text-black px-4 py-1.5 rounded-md font-mono text-xl shadow-lg min-w-[110px] text-center">
        10:00
      </div>
    </div>
    <div
      ref="boardRef"
      class="w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] rounded-sm overflow-hidden shadow-lg"
    />

    <div class="flex items-center gap-1 text-bg font-bold">
      <button
        :disabled="currentIndex === -1"
        class="bg-primary p-3 rounded-md shadow disabled:opacity-30 transition-all"
        @click="first"
      >
        «
      </button>
      <button
        :disabled="currentIndex === -1"
        class="bg-primary p-3 rounded-md shadow disabled:opacity-30 transition-all"
        @click="prev"
      >
        ‹
      </button>

      <div class="px-4 bg-primary p-3 font-rawr rounded-md shadow min-w-[100px] text-center select-none">
        {{ currentIndex + 1 }} / {{ history.length }}
      </div>

      <button
        :disabled="currentIndex >= history.length - 1"
        class="bg-primary p-3 rounded-md shadow disabled:opacity-30 transition-all"
        @click="next"
      >
        ›
      </button>
      <button
        :disabled="currentIndex >= history.length - 1"
        class="bg-primary p-3 rounded-md shadow disabled:opacity-30 transition-all"
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
