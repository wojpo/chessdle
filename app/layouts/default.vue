<script setup lang="ts">
const route = useRoute()
const isMenuOpen = ref(false)

const links = [
  { label: 'Home', to: '/', variant: 'primary' },
  { label: 'Daily Challenge', to: '/daily-game', variant: 'secondary' },
  { label: 'Random Game', to: '/random-game', variant: 'secondary' },
  { label: 'Past Challenges', to: '/daily-game/calendar', variant: 'secondary' },
] as const
</script>

<template>
  <div class="selection:bg-primary/30">
    <div
      v-if="route.path !== '/'"
      class="fixed top-4 left-4 sm:top-8 sm:left-8 z-50 group"
    >
      <UButton
        color="primary"
        variant="subtle"
        size="xl"
        class="rounded-2xl shadow-lg backdrop-blur-xl bg-bg/40 border border-primary/20
               hover:scale-110 hover:border-primary/50 transition-all duration-300
               w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center p-0
               group-hover:shadow-[0_0_20px_rgba(var(--color-primary),0.3)]"
        @click="isMenuOpen = true"
      >
        <UIcon
          name="i-lucide-layout-grid"
          class="w-6 h-6 sm:w-7 sm:h-7 text-primary group-hover:rotate-90 transition-transform duration-500"
        />
      </UButton>
    </div>

    <USlideover
      v-model:open="isMenuOpen"
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
        <div class="flex h-full flex-col px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <nav
            class="
        flex flex-col
        gap-3
        sm:gap-6
        lg:gap-8
        max-w-md
        mx-auto
        w-full
      "
          >
            <outline-button
              v-for="link in links"
              :key="link.to"
              :variant="link.variant"
              @click="isMenuOpen = false; navigateTo(link.to)"
            >
              {{ link.label }}
            </outline-button>
          </nav>
        </div>
      </template>

      <template #footer>
        <SlideFooter />
      </template>
    </USlideover>

    <main :class="route.path !== '/' ? 'pt-20 sm:pt-0' : ''">
      <slot />
    </main>
  </div>
</template>
