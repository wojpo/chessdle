import type { ChessGame } from '~~/types/chesscom'
import { pickRandomGameFromClub } from './chesscom'

export async function generateDailyGame(): Promise<ChessGame> {
  while (true) {
    try {
      const game = await pickRandomGameFromClub()

      const movesCount = game.pgn.split(/\d+\./).length - 1
      if (movesCount < 20) continue

      return game
    }
    catch (err) {
      console.error('Error generating daily game, retrying...', err)
    }
  }
}
