import type { ArchivesResponse, ChessGame, ClubMembersResponse } from '~~/types/chesscom'

const CLUB = 'fake-chess-club'

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

export async function pickRandomGameFromClub(): Promise<ChessGame> {
  const username = await getRandomClubMember()

  const archives = await $fetch<ArchivesResponse>(
    `https://api.chess.com/pub/player/${username}/games/archives`,
  )

  let game: ChessGame | null = null

  while (!game) {
    const archive = random(archives.archives)
    const data = await $fetch<{ games: ChessGame[] }>(archive)
    if (data.games.length) {
      game = random(data.games)
    }
  }

  return {
    ...game,
    pgn: cleanPgn(game.pgn),
  }
}
