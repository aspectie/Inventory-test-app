import vue from '@vitejs/plugin-vue'
import alias from '@rollup/plugin-alias'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue(),
    alias()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@icons': fileURLToPath(new URL('./src/assets/icons', import.meta.url)),
      '@images': fileURLToPath(new URL('./src/assets/images', import.meta.url)),
      '@api': fileURLToPath(new URL('./src/api', import.meta.url)),
      '@stores': fileURLToPath(new URL('./src/stores', import.meta.url)),
    }
  },
  build: {
    sourcemap: true
  }
})
