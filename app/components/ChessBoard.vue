<script setup lang="ts">
import { Chessground } from '@lichess-org/chessground'
import type { Api } from '@lichess-org/chessground/api'
import type { Config } from '@lichess-org/chessground/config'
import { Chess, type Move } from 'chess.js'
import type { PlayerSide } from '~~/types/chesscom'

import '@lichess-org/chessground/assets/chessground.base.css'
import '@/assets/css/chessground.custom.css'
import '@lichess-org/chessground/assets/chessground.cburnett.css'

const props = defineProps<{
  pgn: string
  timeControl: string
  black: PlayerSide
  white: PlayerSide
  showElo: boolean
}>()

const boardRef = ref<HTMLElement | null>(null)
const chess = new Chess()
let cg: Api | null = null
let clock: ReturnType<typeof chess.getComments>

const history = ref<Move[]>([])
const clocks = ref<{ white: string, black: string }[]>([])
const currentIndex = ref<number>(-1)

function parseChessClock(input: string): string {
  const match = input.match(/\[%clk\s+([0-9:.]+)]/)
  const time = match?.[1]
  if (!time) return input

  const parts = time.split(':')
  const secPart = parts.pop()!
  const secondsFloat = parseFloat(secPart)
  const secondsInt = Math.floor(secondsFloat)

  const minutes = parts.length > 0 ? parseInt(parts.pop()!, 10) : 0
  const hours = parts.length > 0 ? parseInt(parts.pop()!, 10) : 0
  const totalSeconds = hours * 3600 + minutes * 60 + secondsFloat

  if (totalSeconds < 60) {
    const tenths = Math.floor((secondsFloat % 1) * 10)
    return `0:${String(secondsInt).padStart(2, '0')}.${tenths}`
  }

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(secondsInt).padStart(2, '0')}`
  }

  return `${minutes}:${String(secondsInt).padStart(2, '0')}`
}

function secondsToClockFull(secondsStr: string): string {
  const totalSeconds = Number(secondsStr)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

const startTime = secondsToClockFull(props.timeControl?.split('+')[0] ?? '600')
let whiteTime = startTime
let blackTime = startTime

onMounted(() => {
  chess.loadPgn(props.pgn)
  history.value = chess.history({ verbose: true })
  clock = chess.getComments()
  chess.reset()

  let wTime = startTime
  let bTime = startTime
  clocks.value = history.value.map((move, i) => {
    const clockComment = clock[i]?.comment
    const parsed = clockComment ? parseChessClock(clockComment) : null
    if (parsed) {
      if (i % 2 === 0) wTime = parsed
      else bTime = parsed
    }
    return { white: wTime, black: bTime }
  })

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

  if (index >= 0) {
    for (let i = 0; i <= index && i < history.value.length; i++) {
      const move = history.value[i]
      if (move?.san) tempGame.move(move.san)
    }
    const clock = clocks.value[index] ?? { white: startTime, black: startTime }
    whiteTime = clock.white
    blackTime = clock.black
  }
  else {
    whiteTime = startTime
    blackTime = startTime
  }

  currentIndex.value = index

  if (cg) {
    const currentMove = history.value[index]
    cg.set({
      fen: tempGame.fen(),
      lastMove: currentMove ? [currentMove.from, currentMove.to] : undefined,
    })
  }
}

const next = () =>
  currentIndex.value < history.value.length - 1
  && jumpToMove(currentIndex.value + 1)

const prev = () =>
  currentIndex.value >= 0
  && jumpToMove(currentIndex.value - 1)

const first = () => jumpToMove(-1)
const last = () => jumpToMove(history.value.length - 1)

onBeforeUnmount(() => {
  if (cg) cg.destroy()
})
</script>

<template>
  <div class="flex flex-col items-center gap-4 p-6">
    <div class="w-full max-w-[320px] sm:max-w-[480px] flex justify-between items-center mb-1">
      <PlayerAvatar :result="black.result">
        Black Player <span class="font-semibold">({{ props.showElo ? props.black.rating : '???' }})</span>
      </PlayerAvatar>
      <div class="bg-secondary px-4 py-1.5 rounded-md font-mono text-xl min-w-[110px] text-right">
        {{ blackTime ?? startTime }}
      </div>
    </div>
    <div
      ref="boardRef"
      class="w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] rounded-sm overflow-hidden shadow-lg"
    />
    <div class="w-full max-w-[320px] sm:max-w-[480px] flex justify-between items-center mb-1">
      <PlayerAvatar :result="white.result">
        White Player <span class="font-semibold">({{ props.showElo ? props.white.rating : '???' }})</span>
      </PlayerAvatar>
      <div class="bg-secondary px-4 py-1.5 rounded-md font-mono text-xl min-w-[110px] text-right">
        {{ whiteTime ?? startTime }}
      </div>
    </div>

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
