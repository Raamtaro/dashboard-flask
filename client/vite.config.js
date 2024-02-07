import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/members': 'http://127.0.0.1:5000',
      '/peoples': 'http://127.0.0.1:5000',
      '/data': 'http://127.0.0.1:5000',
      '/antdata': 'http://127.0.0.1:5000'
    }
  }
})
