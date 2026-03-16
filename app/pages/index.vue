<template>
  <div class="relative flex flex-col items-center justify-center min-h-dvh bg-bg overflow-hidden px-4">
    <div class="fixed top-4 left-4 sm:top-8 sm:left-8 z-50 group">
      <NuxtLink to="/faq">
        <UButton
          color="primary"
          variant="subtle"
          size="xl"
          class="rounded-2xl shadow-lg backdrop-blur-xl bg-bg/40 border border-primary/20
                 hover:scale-110 hover:border-primary/50 transition-all duration-300
                 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center p-0
                 group-hover:shadow-[0_0_20px_rgba(var(--color-primary),0.3)]"
        >
          <UIcon
            name="i-lucide-help-circle"
            class="w-6 h-6 sm:w-7 sm:h-7 text-primary group-hover:rotate-12 transition-transform duration-500"
          />
        </UButton>
      </NuxtLink>
    </div>

    <header class="relative z-10 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <h1 class="text-7xl sm:text-9xl text-primary font-rawr text-center drop-shadow-sm">
        Chessdle
      </h1>
      <p class="text-secondary/60 font-medium tracking-widest uppercase text-xs sm:text-sm mt-2">
        GUESS CHESS ELO
      </p>
    </header>

    <div class="relative z-10 flex flex-col gap-4 w-full max-w-[280px] sm:max-w-xs mt-12 sm:mt-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
      <OutlineButton
        variant="primary"
        @click="navigateTo('/daily-game')"
      >
        Daily Challenge
      </OutlineButton>

      <OutlineButton
        @click="navigateTo('/random-game')"
      >
        Random Game
      </OutlineButton>

      <OutlineButton
        @click="navigateTo('/daily-game/calendar')"
      >
        Past Challenges
      </OutlineButton>
    </div>

    <Footer />
  </div>
</template>
