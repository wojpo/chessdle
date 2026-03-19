import type { ChessGame } from '~~/types/chesscom'
import { pickRandomGameFromClub } from './chesscom'

export async function generateDailyGame(): Promise<ChessGame> {
  return pickRandomGameFromClub({
    rated: true,
    maxRatingDiff: 150,
    minMoves: 30,
    timeClass: 'rapid',
  })
}
