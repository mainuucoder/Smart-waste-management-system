import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://smart-waste-management-n9yk.onrender.com/api',
        changeOrigin: true,
      }
    }
  },
  // Add these for production build
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1600,
  },
  // Important for proper asset paths in production
  base: '/'
})