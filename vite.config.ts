import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
      '@assets/': `${path.resolve(__dirname, 'src/assets')}/`,
      '@styles/': `${path.resolve(__dirname, 'src/styles')}/`,
      '@apis/': `${path.resolve(__dirname, 'src/app/apis')}/`,
      '@components/': `${path.resolve(__dirname, 'src/app/components')}/`,
      '@constants/': `${path.resolve(__dirname, 'src/app/constants')}/`,
      '@hooks/': `${path.resolve(__dirname, 'src/app/hooks')}/`,
      '@models/': `${path.resolve(__dirname, 'src/app/models')}/`,
      '@routers/': `${path.resolve(__dirname, 'src/app/routers')}/`,
      '@stores/': `${path.resolve(__dirname, 'src/app/stores')}/`,
      '@utils/': `${path.resolve(__dirname, 'src/app/utils')}/`,
      '@views/': `${path.resolve(__dirname, 'src/app/views')}/`,
      //'@/': `${path.resolve(__dirname, 'src/app')}/`
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
