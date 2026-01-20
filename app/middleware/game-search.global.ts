export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return

  const isRandom = to.path === '/random-game'
  const toast = useToast()

  const isDaily = to.path === '/daily-game' || to.path.startsWith('/daily-game/')
  const isCalendar = to.path === '/daily-game/calendar'

  if ((isDaily || isRandom) && !isCalendar) {
    toast.add({
      title: 'Getting your game!',
      description: `Game will load in few seconds :3`,
      color: 'primary',
    })
  }
})
