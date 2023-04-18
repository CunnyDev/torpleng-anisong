# torpleng anisong - トープレング・アニソン

ต่อเพลง (phrase) - Connect multiple song

原作: ナーゼ  
_Original Version: [narze](https://github.com/narze/torpleng)_

## Contribution

Edit file at `apps/client/src/libs/data/songs.ts` [this file](/apps/client/src/libs/data/songs.ts), follow schema.

Example:

```ts
{
  kana: {
    name: 'Daydream cafe',
    author: "Petit Rabbit's",
    lyrics:
        'こころぴょんぴょん{待,ま}ち？ {考,かんが}えるふりして もうちょっと{近,ちか}づいちゃえ {簡単,かんたん}には{教,おし}えないっ こんなに{好,す}きなことは{内緒,ないしょ}なの'
  },
  romaji: {
    name: 'Daydream cafe',
    author: "Petit Rabbit's",
    lyrics:
        'kokoro pyon pyon machi? kangaeru furishite mou chotto chikadzuichae kantan ni wa oshienai konna ni suki na koto wa naisho na no'
  },
  url: 'https://youtu.be/7bIBZ6M0-tU?t=0&end=15'
}
```

_Note: {待,ま} is for furigana, this is now required as furigana is completed thanks to @tinarskii_

_Disclaimer: I'm not Japanese, ~~just a weeb~~, correct me if I'm wrong_

- Make sure if there is other PR opening, you should continue from them.
- Lyrics should be at least 1 sentence, with appropriate duration (10-20 seconds, can be more if needed).
- Should be anime song that is accessible in youtube. Use **Official MV** > **Official music** > Unofficial Video
- First hiragana of sentence should match the last hiragana of previous sentence (のう - の is acceptable)
- In case latest lyrics is hard to continue
  - You may use second/third hiragana to match the lasy hiragana of previous lyrics. Use parenthesis in this case.
  - You may add/remove sentences of previous music.
