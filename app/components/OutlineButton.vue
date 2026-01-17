<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'secondary',
})

const variants = {
  primary: 'border-primary text-primary hover:bg-primary',
  secondary: 'border-secondary text-secondary hover:bg-secondary',
}
</script>

<template>
  <button
    class="group relative px-8 py-4
         rounded-2xl border-2
         font-bold text-lg
         hover:text-bg
         active:scale-[0.97]
         transition-all duration-300
         flex items-center justify-center
         overflow-hidden"
    :class="variants[props.variant]"
  >
    <div
      class="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[700ms] ease-in-out pointer-events-none"
      style="background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent); transform: skewX(-20deg);"
    />

    <span class="relative z-10">
      <slot />
    </span>
  </button>
</template>

<style scoped>
button:hover {
  box-shadow: 0 0 20px -5px v-bind('props.variant === "primary" ? "var(--color-primary)" : "var(--color-secondary)"');
}
</style>
