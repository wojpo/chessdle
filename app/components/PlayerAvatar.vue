<script setup lang="ts">
import type { GameResult } from '~~/types/chesscom'

const props = defineProps<{
  result: GameResult
}>()
</script>

<template>
  <div class="flex items-center gap-2">
    <UIcon
      name="tdesign:user-avatar-filled"
      class="size-8 sm:size-9 md:size-10 rounded-xl sm:rounded-2xl"
    />
    <slot />
    <ResultIcon :result="props.result" />
  </div>
</template>
