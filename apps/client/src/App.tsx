/// <reference types="@types/youtube" />

import { Component, createSignal, For } from 'solid-js'

import clsx from 'clsx'

import { songs, stripFurigana, toEmbedUrl } from './libs/data'
import { createPlayer } from './youtube'

const App: Component = () => {
  const [songIndex, setSongIndex] = createSignal(0)
  const [kanaMode, setKanaMode] = createSignal<'kana' | 'romaji'>('kana')
  const [displayMode, setDisplayMode] = createSignal<'lyrics' | 'name'>(
    'lyrics'
  )

  createPlayer((event) => {
    // eslint-disable-next-line no-undef
    if (event.data == YT.PlayerState.ENDED) {
      if (songIndex() < songs.length - 1) {
        setSongIndex(songIndex() + 1)
      }
    }
  })

  return (
    <main class="flex flex-col items-center gap-8 p-4">
      <h1 class="font-bold text-4xl">🎤 ต่อเพลง but Anisong 🎸</h1>

      <div class="flex flex-row justify-between gap-4">
        <div class="flex flex-col gap-4 w-1/2 items-center">
          <iframe
            id="playframe"
            src={toEmbedUrl(songs[songIndex()].url)}
            width="560"
            height="315"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />

          <div class="flex gap-2 justify-center items-center">
            <button onClick={() => setSongIndex(songIndex() - 1)}>
              Previous
            </button>

            <select
              value={songIndex() + 1}
              onChange={(e) => setSongIndex(+e.currentTarget.value - 1)}
            >
              <For each={Array.from({ length: songs.length }, (_, i) => i + 1)}>
                {(v) => <option>{v}</option>}
              </For>
            </select>

            <p>of {songs.length}</p>

            <button onClick={() => setSongIndex(songIndex() + 1)}>Next</button>
          </div>
        </div>

        <div class="lyrics flex flex-col gap-4 w-1/2">
          <div class="flex justify-between gap-4">
            <div class="flex justify-center">
              <button
                class={clsx(
                  'border border-black rounded-l-lg p-2',
                  kanaMode() === 'kana' && 'bg-pink-200'
                )}
                onClick={() => setKanaMode('kana')}
              >
                Kana
              </button>
              <button
                class={clsx(
                  'border border-black rounded-r-lg p-2',
                  kanaMode() === 'romaji' && 'bg-pink-200'
                )}
                onClick={() => setKanaMode('romaji')}
              >
                Romaji
              </button>
            </div>

            <div class="flex justify-center">
              <button
                class={clsx(
                  'border border-black rounded-l-lg p-2',
                  displayMode() === 'lyrics' && 'bg-pink-200'
                )}
                onClick={() => setDisplayMode('lyrics')}
              >
                Lyrics
              </button>
              <button
                class={clsx(
                  'border border-black rounded-r-lg p-2',
                  displayMode() === 'name' && 'bg-pink-200'
                )}
                onClick={() => setDisplayMode('name')}
              >
                Name
              </button>
            </div>
          </div>

          <div class="flex flex-col gap-4">
            <For each={songs}>
              {(song, i) => (
                <div
                  class={clsx(
                    'border p-4 rounded-lg',
                    i() == songIndex() ? 'border-pink-500' : 'border-black'
                  )}
                >
                  {i() + 1}.{' '}
                  {stripFurigana(
                    displayMode() === 'lyrics'
                      ? song[kanaMode()].lyrics
                      : `${song[kanaMode()].author} - ${song[kanaMode()].name}`
                  )}
                </div>
              )}
            </For>
          </div>
        </div>
      </div>

      <p>
        <a
          href="https://github.com/CunnyDev/torpleng-anisong"
          target="_blank"
          rel="noopener"
        >
          GitHub CunnyDev 😭
        </a>
      </p>
    </main>
  )
}

export default App
