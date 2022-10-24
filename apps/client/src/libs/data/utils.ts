import { AniSong } from './schema'

export function stripFurigana(full: string) {
  return full.replace(/{[^}]+}/g, (e) => e.split(',')[0].slice(1))
}

export function parseUrl(url: AniSong['url']) {
  const [, videoId, query] =
    url.match(/https:\/\/youtu.be\/([^?]+)(\?.*)?/) ?? []
  const params = new URLSearchParams(query)
  const start = params.get('t')
  const end = params.get('end')

  return { videoId, start, end }
}

export function toEmbedUrl(url: AniSong['url']) {
  const { videoId, start, end } = parseUrl(url)

  return `https://www.youtube.com/embed/${videoId}?start=${start}&end=${end}&autoplay=1&enablejsapi=1`
}
