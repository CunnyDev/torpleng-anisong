/* eslint-disable solid/no-innerhtml */
/// <reference types="@types/youtube" />

import { Component, createSignal, For } from 'solid-js'

import clsx from 'clsx'

import { songs, parseFurigana, toEmbedUrl } from './libs/data'
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
    <main class="h-screen">
      <div class="grid xl:grid-cols-2 grid-cols-1 xl:gap-0 gap-4 justify-center items-stretch h-full">
        {/* Header */}
        <h1 class="xl:col-span-2 text-3xl m-auto p-4 font-bold text-center">
          🎤 ต่อเพลง But Anisong 🎸
        </h1>

        {/* Player */}
        <div class="player">
          <iframe
            id="playframe"
            src={toEmbedUrl(songs[songIndex()].url)}
            width="560"
            height="315"
            class="rounded-lg shadow-xl"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
        </div>

        {/* Song List */}
        <div class="row-span-2 flex flex-col xl:border-none xl:p-0 xl:gap-0 border p-2 gap-2">
          <div class="flex flex-row mx-[1em] justify-between">
            <div class="flex flex-row">
              <h1
                class={clsx(
                  'border-y border-l border-black p-2 rounded-l-lg cursor-pointer',
                  kanaMode() === 'kana' && 'bg-pink-200'
                )}
                onClick={() => setKanaMode('kana')}
              >
                Kana
              </h1>
              <h1
                class={clsx(
                  'border border-black p-2 rounded-r-lg cursor-pointer',
                  kanaMode() === 'romaji' && 'bg-pink-200'
                )}
                onClick={() => setKanaMode('romaji')}
              >
                Romaji
              </h1>
            </div>
            <div class="flex flex-row">
              <h1
                class={clsx(
                  'border-y border-l border-black p-2 rounded-l-lg cursor-pointer',
                  displayMode() === 'lyrics' && 'bg-pink-200'
                )}
                onClick={() => setDisplayMode('lyrics')}
              >
                Lyrics
              </h1>
              <h1
                class={clsx(
                  'border border-black p-2 rounded-r-lg cursor-pointer',
                  displayMode() === 'name' && 'bg-pink-200'
                )}
                onClick={() => setDisplayMode('name')}
              >
                Name
              </h1>
            </div>
          </div>
          <ol class="list overflow-y-auto max-h-[80vh]">
            <For each={songs}>
              {(song, i) => (
                <li
                  class={clsx(
                    'border p-4 rounded-lg hover:border-pink-300 hover:bg-pink-300 hover:cursor-pointer duration-100',
                    i() == songIndex()
                      ? 'bg-pink-500 border-pink-500 text-white'
                      : 'border-black'
                  )}
                  onClick={() => setSongIndex(i())}
                >
                  <span
                    innerHTML={parseFurigana(
                      displayMode() === 'lyrics'
                        ? song[kanaMode()].lyrics
                        : `${song[kanaMode()].author} — ${
                            song[kanaMode()].name
                          }`
                    ).join('')}
                  />
                </li>
              )}
            </For>
          </ol>
        </div>

        {/* Controls */}
        <div class="flex flex-col items-center justify-start gap-6">
          <h1 class="md:text-4xl text-3xl text-center">
            {songIndex() + 1}.{' '}
            <span
              innerHTML={parseFurigana(
                `${songs[songIndex()].kana.author} — ${
                  songs[songIndex()].kana.name
                }`
              ).join('')}
            />
          </h1>
          <h2 class="text-lg text-gray-400">
            You can add more songs at{' '}
            <a
              href="https://github.com/CunnyDev/torpleng-anisong"
              class="underline"
            >
              Github
            </a>
          </h2>

          <div class="flex flex-row items-center justify-center gap-4">
            <button
              class="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-400 duration-100"
              onClick={() => songIndex() > 0 && setSongIndex(songIndex() - 1)}
            >
              Prev
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

            <button
              class="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-400 duration-100"
              onClick={() =>
                songIndex() < songs.length - 1 && setSongIndex(songIndex() + 1)
              }
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
