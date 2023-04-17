import { describe, it, expect } from 'vitest'
import { parseUrl, parseFurigana, toEmbedUrl } from './utils'

describe('Test Utility Function', () => {
  it('parseFurigana Function', () => {
    expect(parseFurigana('Hello, {world,ワールド}!')).toStrictEqual([
      'Hello, ',
      '<ruby>world<rt>ワールド</rt></ruby>',
      '!'
    ])
  })

  it('parseUrl Function', () => {
    const vid = '7bIBZ6M0-tU'

    expect(parseUrl(`https://youtu.be/${vid}?t=0&end=14`)).toStrictEqual({
      videoId: vid,
      start: '0',
      end: '14'
    })
  })

  it('toEmbedUrl Function', () => {
    const vid = '7bIBZ6M0-tU'

    expect(toEmbedUrl(`https://youtu.be/${vid}?t=0&end=14`)).toBe(
      `https://www.youtube.com/embed/${vid}?start=0&end=14&autoplay=1&enablejsapi=1`
    )
  })
})
