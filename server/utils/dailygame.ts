import type { ChessGame } from '~~/types/chesscom'
import { pickRandomGameFromClub } from './chesscom'

export async function generateDailyGame(): Promise<ChessGame> {
  while (true) {
    try {
      const game = await pickRandomGameFromClub()
      if (!game.rated) continue

      const whiteElo = game.white.rating
      const blackElo = game.black.rating
      if (Math.abs(whiteElo - blackElo) > 150) continue

      const cleanPgn = game.pgn.replace(/\{[^}]*\}/g, '')
      const moves = cleanPgn.match(/\b([KQBNR]?[a-h]?[1-8]?x?[a-h][1-8](=[QBNR])?|O-O(-O)?)\b/g)
      const movesCount = moves ? moves.length : 0

      if (movesCount < 30) continue

      return game
    }
    catch (err) {
      console.error('Error generating daily game, retrying...', err)
    }
  }
}
