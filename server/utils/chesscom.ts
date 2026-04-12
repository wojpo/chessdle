import type { ArchivesResponse, ChessGame, ClubMembersResponse, GameFilterOptions } from '~~/types/chesscom'

const CLUB = 'team-europe'

function random<T>(arr: readonly T[]): T {
  if (arr.length === 0) {
    throw new Error('Empty array')
  }
  return arr[Math.floor(Math.random() * arr.length)]
}

async function getRandomClubMember(): Promise<string> {
  const data = await $fetch<ClubMembersResponse>(
    `https://api.chess.com/pub/club/${CLUB}/members`,
  )

  const allMembers = [
    ...data.all_time,
    ...data.monthly,
    ...data.weekly,
  ]

  return random(allMembers).username
}

function cleanPgn(pgn: string): string {
  return pgn
    .split('\n')
    .filter(l => !l.startsWith('['))
    .join('\n')
}

export async function pickRandomGameFromClub(
  options: GameFilterOptions = {},
): Promise<ChessGame> {
  const username = await getRandomClubMember()

  const archives = await $fetch<ArchivesResponse>(
    `https://api.chess.com/pub/player/${username}/games/archives`,
  )

  while (true) {
    const archive = random(archives.archives)
    const data = await $fetch<{ games: ChessGame[] }>(archive)

    const filtered = data.games.filter((game) => {
      if (options.timeClass && game.time_class !== options.timeClass)
        return false

      if (options.rated && !game.rated)
        return false

      if (options.maxRatingDiff) {
        const diff = Math.abs(game.white.rating - game.black.rating)
        if (diff > options.maxRatingDiff) return false
      }

      if (options.minMoves) {
        const cleanPgn = game.pgn.replace(/\{[^}]*\}/g, '')
        const moves = cleanPgn.match(/\b([KQBNR]?[a-h]?[1-8]?x?[a-h][1-8](=[QBNR])?|O-O(-O)?)\b/g)
        const count = moves ? moves.length : 0
        if (count < options.minMoves) return false
      }

      return true
    })

    if (filtered.length) {
      const game = random(filtered)

      return {
        ...game,
        pgn: cleanPgn(game.pgn),
      }
    }
  }
}
