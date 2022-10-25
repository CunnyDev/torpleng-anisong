import { defineConfig } from 'vite-plugin-windicss'

export default defineConfig({
  darkMode: false,
  theme: {
    extend: {
      screens: {
        xl: '1124px'
      }
    }
  },
  plugins: [require('windicss/plugin/line-clamp')]
})
