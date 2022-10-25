export interface SongData {
  name: string
  author: string
  lyrics: string
}

export interface AniSong {
  kana: SongData
  romaji: SongData
  url: `https://youtu.be/${string}?t=${number}&end=${number}`
}
