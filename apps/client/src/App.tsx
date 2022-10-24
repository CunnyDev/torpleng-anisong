/// <reference types="@types/youtube" />

import { Component, createSignal, For } from 'solid-js'

import { songs, stripFurigana, toEmbedUrl } from '@torpleng/data'
import { createPlayer } from './youtube'

const App: Component = () => {
  const [songIndex, setSongIndex] = createSignal(0)

  createPlayer((event) => {
    // eslint-disable-next-line no-undef
    if (event.data == YT.PlayerState.ENDED) {
      if (songIndex() < songs.length - 1) {
        setSongIndex(songIndex() + 1)
      }
    }
  })

  return (
    <main class="flex flex-col items-center gap-4 p-4">
      <h1 class="font-bold text-4xl">🎤 ต่อเพลง but Anisong 🎸</h1>

      <div class="flex flex-row justify-between gap-4">
        <div class="flex flex-col gap-4">
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
        <div class="lyrics flex flex-col gap-4">
          <For each={songs}>
            {(song, i) => (
              <div class="border border-black p-4 rounded-lg">
                {i() + 1}. {stripFurigana(song.kana.lyrics)}
              </div>
            )}
          </For>
        </div>
      </div>
    </main>
  )
}

export default App
