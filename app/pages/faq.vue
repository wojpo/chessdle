<script setup lang="ts">
const faqs = [
  {
    label: 'Where does the game data come from?',
    content: 'All games are fetched directly via the Chess.com public API.',
  },
  {
    label: 'What technologies were used to build this?',
    content: 'Built with Nuxt 4, Tailwind CSS, and Nuxt UI. Board rendering is handled by Chessground, and game logic by chess.js.',
  },
  {
    label: 'Is the project open source?',
    content: 'Yes! You can find the source code on GitHub (https://github.com/wojpo/chessdle). Contributions, bug reports, and feature suggestions are always welcome.',
  },

  {
    label: 'How can I report a bug or suggest a feature?',
    content: 'The best way to provide feedback is by opening an issue on our GitHub repository or reaching out to me directly :3.',
  },
]
</script>

<template>
  <div class="min-h-screen">
    <header class="py-10 text-center">
      <h1 class="text-4xl font-bold text-primary font-rawr">
        FAQ
      </h1>
      <p class="text-secondary/60 font-medium tracking-widest uppercase text-xs sm:text-sm mt-2">
        Frequently asked questions
      </p>
    </header>
    <main class="max-w-3xl mx-auto px-4 space-y-6">
      <section
        v-for="(faq, index) in faqs"
        :key="index"
        class="rounded-2xl shadow p-6 transition hover:shadow-lg"
      >
        <h2 class="text-xl font-semibold text-primary">
          {{ faq.label }}
        </h2>
        <p class="mt-2 text-secondary">
          {{ faq.content }}
        </p>
      </section>
    </main>
    <Footer />
  </div>
</template>

<style scoped>

</style>
