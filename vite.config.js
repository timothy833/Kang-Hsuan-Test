import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5001', // ✅ 只能是 Functions Emulator 主機 + port
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(
            /^\/api/,
            '/timothy1994-ee7db/us-central1/api' // ✅ Firebase Functions 正確路徑 這裡才是補完整路徑
          ),
      }
    }
  }
})
