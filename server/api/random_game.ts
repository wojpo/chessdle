import { pickRandomGameFromClub } from '../utils/chesscom'
import type { ChessGame } from '~~/types/chesscom'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const timeClass = query.time_class as ChessGame['time_class'] | undefined
  const rated = query.rated === 'true' ? true : query.rated === 'false' ? false : undefined

  return await pickRandomGameFromClub({
    timeClass,
    rated,
  })
})
