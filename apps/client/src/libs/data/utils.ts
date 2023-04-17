import { AniSong } from './schema'

export function parseFurigana(text: string) {
  return text.split(/({[^}]+})/g).map((part) => {
    const match = part.match(/{([^,]+),([^}]+)}/)
    if (match) {
      return `<ruby>${match[1]}<rt>${match[2]}</rt></ruby>`
    }
    return part
  })
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
