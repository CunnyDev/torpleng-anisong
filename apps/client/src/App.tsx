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
    <main class="container">
      <div id="header">
        <h1 class="text-center font-bold text-4xl">
          🎤 ต่อเพลง but Anisong 🎸
        </h1>
      </div>

      <div id="player">
        <iframe
          id="playframe"
          src={toEmbedUrl(songs[songIndex()].url)}
          width="560"
          height="315"
          class="rounded-lg m-auto shadow-xl"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      </div>

			<div class="flex flex-col gap-2">
				<div class="flex flex-row row-span-2 justify-between gap-4 overflow-y">
					<div class="lyrics flex flex-col gap-4 w-full">
						<div class="flex justify-between gap-4">
							<div class="flex justify-center">
								{/* Kana */}
								<button
									class={clsx(
										'border-y border-l border-pink-600 rounded-l-lg p-2',
										kanaMode() === 'kana' && 'bg-pink-200 text-pink-500'
									)}
									onClick={() => setKanaMode('kana')}
								>
									Kana
								</button>
								{/* Romaji */}
								<button
									class={clsx(
										'border border-pink-600 rounded-r-lg p-2',
										kanaMode() === 'romaji' && 'bg-pink-200 text-pink-500'
									)}
									onClick={() => setKanaMode('romaji')}
								>
									Romaji
								</button>
							</div>

							<div class="flex justify-center">
								{/* Lyrics */}
								<button
									class={clsx(
										'border-y border-l border-pink-600 rounded-l-lg p-2',
										displayMode() === 'lyrics' && 'bg-pink-200 text-pink-500'
									)}
									onClick={() => setDisplayMode('lyrics')}
								>
									Lyrics
								</button>
								{/* Name */}
								<button
									class={clsx(
										'border border-pink-600 rounded-r-lg p-2',
										displayMode() === 'name' && 'bg-pink-200 text-pink-500'
									)}
									onClick={() => setDisplayMode('name')}
								>
									Name
								</button>
							</div>
						</div>
					</div>
				</div>

				<div id="song-list">
					<ol>
						<For each={songs}>
							{(song, i) => (
								<li
									class={clsx(
										'border p-4 rounded-lg',
										i() == songIndex()
											? 'bg-pink-400 text-white font-bold duration-100'
											: 'border-black'
									)}
								>
									{i() + 1}.{' '}
									{stripFurigana(
										displayMode() === 'lyrics'
											? song[kanaMode()].lyrics
											: `${song[kanaMode()].author} - ${song[kanaMode()].name}`
									)}
								</li>
							)}
						</For>
					</ol>
				</div>
			</div>

      <div id="functions">
        {/* Song Name */}
        <div class="flex flex-col items-center justify-center gap-2">
          <h2 class="text-2xl">
            {songIndex() + 1}. {songs[songIndex()].kana.author} -{' '}
            {songs[songIndex()].kana.name}
          </h2>
        </div>

        {/* Controller */}
        <div class="flex items-center justify-center gap-2">
          <button
            class="px-4 py-2 border border-black rounded-lg active:bg-black active:text-white duration-100"
            onClick={() =>
              setSongIndex(songIndex() > 0 ? songIndex() - 1 : songIndex())
            }
          >
            Previous
          </button>

          <select
            value={songIndex() + 1}
            onChange={(e) => setSongIndex(+e.currentTarget.value - 1)}
            class="border"
          >
            <For each={Array.from({ length: songs.length }, (_, i) => i + 1)}>
              {(v) => <option>{v}</option>}
            </For>
          </select>

          <p>of {songs.length}</p>

          <button
            class="px-4 py-2 border border-black rounded-lg active:bg-black active:text-white duration-100"
            onClick={() =>
              setSongIndex(
                songIndex() < songs.length - 1 ? songIndex() + 1 : songIndex()
              )
            }
          >
            Next
          </button>
        </div>
      </div>
    </main>
  )
}

export default App
