import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import generouted from '@generouted/react-router/plugin'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('./src/renderer/src')
      }
    },
    plugins: [
      react(),
      generouted({
        source: {
          routes: './src/renderer/src/pages/**/[\\w[-]*.{jsx,tsx}',
          modals: './src/renderer/src/pages/**/[+]*.{jsx,tsx}'
        },
        output: './src/renderer/src/router.ts'
      })
    ]
  }
})
