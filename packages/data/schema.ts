export interface SongData {
  name: string
  author: string
  lyrics: string
}

export interface AniSong {
  kana: SongData
  romaji: SongData
  url: `https://youtu.be/${string}?t=${string}&end=${string}`
}
