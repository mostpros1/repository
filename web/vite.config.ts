import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    commonjsOptions: { include: [] },
  },
  optimizeDeps: {
    disabled: false,
  },
  define: {
    _global: ({})
  }
})
