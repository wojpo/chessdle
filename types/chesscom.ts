export interface ClubMember {
  username: string
  joined: number
}

export interface ClubMembersResponse {
  all_time: ClubMember[]
  monthly: ClubMember[]
  weekly: ClubMember[]
}

export interface ArchivesResponse {
  archives: string[]
}

export interface PlayerSide {
  username: string
  rating: number
  result: GameResult
}

export interface ChessGame {
  rated: boolean
  time_class: 'bullet' | 'blitz' | 'rapid' | 'daily'
  time_control: string
  pgn: string
  white: PlayerSide
  black: PlayerSide
}

export type GameResult
  = | 'win'
    | 'checkmated'
    | 'agreed'
    | 'repetition'
    | 'timeout'
    | 'resigned'
    | 'stalemate'
    | 'lose'
    | 'insufficient'
    | '50move'
    | 'abandoned'
    | 'kingofthehill'
    | 'threecheck'
    | 'timevsinsufficient'
    | 'bughousepartnerlose'
