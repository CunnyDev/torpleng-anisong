import { describe, it, expect } from 'vitest'
import { parseUrl, stripFurigana, toEmbedUrl } from './utils'

describe('Test Utility Function', () => {
  it('stripFurigana Function', () => {
    expect(stripFurigana('Hello, {world,ワールド}!')).toBe('Hello, world!')
    expect(
      stripFurigana(
        'こころぴょんぴょん{待,ま}ち？ {考,かんが}えるふりして もうちょっと{近,ちか}づいちゃえ {簡単,かんたん}には{教,おし}えないっ こんなに{好,す}きなことは{内緒,ないしょ}なの'
      )
    ).toBe(
      'こころぴょんぴょん待ち？ 考えるふりして もうちょっと近づいちゃえ 簡単には教えないっ こんなに好きなことは内緒なの'
    )
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
