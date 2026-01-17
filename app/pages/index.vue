<template>
  <div class="relative flex flex-col items-center justify-center min-h-dvh bg-bg overflow-hidden px-4">
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

    <footer class="absolute bottom-6 w-full flex flex-col items-center gap-1 z-20 px-4 text-center animate-in fade-in duration-1000 delay-500">
      <p class="text-[10px] sm:text-xs text-secondary/40 font-medium tracking-wider uppercase">
        Made with <span class="text-primary/60">&lt;3</span> by
        <a
          href="https://github.com/wojpo"
          target="_blank"
          class="text-secondary/60 hover:text-primary transition-colors duration-200 decoration-primary/30 underline-offset-4 hover:underline"
        >
          wojpo
        </a>
      </p>
      <p class="text-[9px] text-secondary/30 uppercase tracking-[0.2em]">
        Built with Nuxt 4 & Tailwind
      </p>
    </footer>
  </div>
</template>
