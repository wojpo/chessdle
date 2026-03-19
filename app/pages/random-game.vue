<script setup lang="ts">
import type { ChessGame } from '~~/types/chesscom'

const rated = ref(false)
const timeClassList = ref(['all', 'bullet', 'blitz', 'rapid'])
const timeClass = ref('all')
const isFilterMenuOpen = ref(false)

const toast = useToast()

const queryParams = computed(() => ({
  ...(rated.value !== undefined && { rated: rated.value ? 'true' : 'false' }),
  ...(timeClass.value !== 'all' && { time_class: timeClass.value }),
}))

const { data, pending, refresh } = await useFetch<ChessGame>(
  '/api/random_game',
  {
    server: false,
    retry: 3,
    retryDelay: 500,
    query: queryParams,
    watch: false,
  },
)

const newGame = async () => {
  toast.add({
    title: 'Getting your game!',
    description: `Game will load in few seconds :3`,
    color: 'primary',
  })
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
        class="fixed top-4 right-4 sm:top-8 sm:right-8 z-50"
      >
        <div class="group">
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
        <div
          class="fixed top-4 left-20 sm:top-8 sm:left-28 z-50 group"
        >
          <UButton
            color="primary"
            variant="subtle"
            size="xl"
            class="rounded-2xl shadow-lg backdrop-blur-xl bg-bg/40 border border-primary/20
               hover:scale-110 hover:border-primary/50 transition-all duration-300
               w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center p-0
               group-hover:shadow-[0_0_20px_rgba(var(--color-primary),0.3)]"
            @click="isFilterMenuOpen = true"
          >
            <UIcon
              name="i-lucide-settings"
              class="w-6 h-6 sm:w-7 sm:h-7 text-primary group-hover:rotate-90 transition-transform duration-500"
            />
          </UButton>
        </div>
        <USlideover
          v-model:open="isFilterMenuOpen"
          side="left"
          :close="{
            color: 'primary',
            variant: 'outline',
            class: 'rounded-full mt-4',
            size: 'lg',
          }"
        >
          <template #title>
            <div class="mb-12 mt-4">
              <h2 class="text-5xl font-rawr text-primary font-normal drop-shadow-sm">
                Chessdle
              </h2>
              <div class="h-1 w-12 bg-primary mt-2 rounded-full" />
            </div>
          </template>
          <template #body>
            <div class="flex flex-col gap-10 px-4 py-6">
              <div class="flex flex-col items-center gap-2">
                <p class="text-secondary font-bold tracking-[0.3em] uppercase text-xs opacity-70">
                  Preferences
                </p>
                <div class="h-px w-12 bg-primary/20" />
              </div>

              <div class="space-y-8">
                <div
                  class="flex items-center justify-between p-4 rounded-2xl bg-primary/5 border border-primary/10
               hover:border-primary/30 transition-all duration-300 group"
                >
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <UIcon
                        name="i-lucide-trophy"
                        class="w-5 h-5 text-primary"
                      />
                    </div>
                    <div>
                      <p class="font-bold text-sm text-secondary uppercase tracking-wider">
                        Rated Only
                      </p>
                      <p class="text-[10px] text-secondary/50 leading-none">
                        Filter competitive games
                      </p>
                    </div>
                  </div>
                  <UCheckbox
                    v-model="rated"
                    color="primary"
                    :ui="{
                      base: 'h-6 w-6 rounded-lg transition-all duration-300 cursor-pointer',
                    }"
                  />
                </div>

                <div class="space-y-4 items-center flex flex-col justify-center">
                  <div class="flex items-center gap-3 px-1">
                    <UIcon
                      name="i-lucide-timer"
                      class="w-5 h-5 text-primary"
                    />
                    <p class="text-xs font-bold uppercase tracking-widest text-secondary/70">
                      Time Control
                    </p>
                  </div>

                  <USelectMenu
                    v-model="timeClass"
                    :items="timeClassList"
                    size="xl"
                    class="w-60 text-primary"
                    :ui="{
                      trigger: 'rounded-2xl bg-bg/50 border-primary/20 h-14 hover:border-primary/50 transition-all',
                      list: 'bg-bg/95 backdrop-blur-xl border-primary/20 text-primary',
                    }"
                  >
                    <span class="capitalize text-sm font-medium tracking-wide">
                      {{ timeClass }}
                    </span>
                  </USelectMenu>
                </div>
              </div>

              <div class="not-sm:hidden mt-auto pt-10 flex justify-center">
                <div class="grid grid-cols-3 gap-2 opacity-10">
                  <div
                    v-for="i in 9"
                    :key="i"
                    class="w-2 h-2 rounded-full bg-primary"
                  />
                </div>
              </div>
            </div>
          </template>
          <template #footer>
            <SlideFooter />
          </template>
        </USlideover>
      </div>

      <FullGuessEloChess :data="data" />
    </template>
  </div>
</template>
