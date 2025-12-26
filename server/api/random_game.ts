import { pickRandomGameFromClub } from '../utils/chesscom'

export default defineEventHandler(async () => {
  return await pickRandomGameFromClub()
})
