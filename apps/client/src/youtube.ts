/* eslint-disable no-undef */
/// <reference types="@types/youtube" />

declare global {
  interface Window {
    YT: any
    YTConfig: any
    onYouTubeIframeAPIReady: any
  }
}

function getScriptUrl() {
  const url =
    'https://www.youtube.com/s/player/24c6f8bd/www-widgetapi.vflset/www-widgetapi.js'
  try {
    const ttPolicy = (window as any).trustedTypes.createPolicy(
      'youtube-widget-api',
      {
        createScriptURL: (x) => x
      }
    )
    return ttPolicy.createScriptURL(url)
  } catch (e) {
    return url
  }
}

if (!window['YT']) window.YT = { loading: 0, loaded: 0 }

if (!window['YTConfig']) window.YTConfig = { host: 'https://www.youtube.com' }

if (!window.YT.loading) {
  window.YT.loading = 1

  const l = []
  YT.ready = (f) => {
    if (YT.loaded) f()
    else l.push(f)
  }

  window.onYTReady = () => {
    YT.loaded = 1
    for (let i = 0; i < l.length; i++)
      try {
        l[i]()
      } catch (e) {}
  }

  YT.setConfig = (c) => {
    for (const k in c) if (c.hasOwnProperty(k)) YTConfig[k] = c[k]
  }

  const a = document.createElement('script')
  a.type = 'text/javascript'
  a.id = 'www-widgetapi-script'
  a.src = getScriptUrl()

  const c = document.currentScript
  if (c) {
    var n = c.nonce || c.getAttribute('nonce')
    if (n) a.setAttribute('nonce', n)
  }
  const b = document.getElementsByTagName('script')[0]
  b.parentNode.insertBefore(a, b)
}

let handleStateChange: YT.PlayerEventHandler<YT.OnStateChangeEvent>

export let player: YT.Player
window.onYouTubeIframeAPIReady = () => {
  player = new window.YT.Player('playframe', {
    events: {
      onStateChange: handleStateChange
    }
  })
}

export function createPlayer(
  onStateChange: YT.PlayerEventHandler<YT.OnStateChangeEvent>
) {
  handleStateChange = onStateChange
}
