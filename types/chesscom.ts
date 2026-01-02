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
  result: string
}

export interface ChessGame {
  rated: boolean
  time_class: 'bullet' | 'blitz' | 'rapid' | 'daily'
  time_control: string
  pgn: string
  white: PlayerSide
  black: PlayerSide
}
