import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    commonjsOptions: { include: [] },
    rollupOptions: {
      maxParallelFileOps: 100,
      cache: false,
    },
  },
  optimizeDeps: {
    disabled: false,
  },
  define: {
    _global: ({}),
  },
})
