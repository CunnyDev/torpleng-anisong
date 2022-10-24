import { defineConfig } from 'vite-plugin-windicss'

export default defineConfig({
  darkMode: false,
  theme: {
    extend: {}
  },
  plugins: [require('windicss/plugin/line-clamp')]
})
