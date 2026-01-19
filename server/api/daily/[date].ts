import { generateDailyGame } from '../../utils/dailygame'
import type { ChessGame } from '~~/types/chesscom'
import { Redis } from '@upstash/redis'

export default defineEventHandler(async (event) => {
  const date = getRouterParam(event, 'date')

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid date format (YYYY-MM-DD)',
    })
  }

  const requestedDate = new Date(date)
  const minDate = new Date('2026-01-01')
  const maxDate = new Date()

  if (requestedDate < minDate || requestedDate > maxDate) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Date out of allowed range (2026-01-01 to today)',
    })
  }

  const key = `daily:${date}`
  const redis = Redis.fromEnv()

  let game = await redis.get<ChessGame>(key)

  if (!game) {
    game = await generateDailyGame()
    await redis.set(key, game)
  }

  return game
})
