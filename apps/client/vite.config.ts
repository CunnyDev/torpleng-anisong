import { defineConfig } from 'vite'
import WindiCSS from 'vite-plugin-windicss'
import solidPlugin from 'vite-plugin-solid'
import { createHtmlPlugin } from 'vite-plugin-html'

export default defineConfig({
  plugins: [
    solidPlugin(),
    WindiCSS({
      scan: {
        fileExtensions: ['html', 'js', 'ts', 'jsx', 'tsx']
      }
    }),
    createHtmlPlugin({
      minify: true
    })
  ],
  server: {
    port: 3000
  },
  build: {
    minify: true,
    sourcemap: false,
    target: 'esnext'
  }
})
