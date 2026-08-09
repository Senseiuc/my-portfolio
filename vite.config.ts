import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'development-site-url',
      transformIndexHtml(html) {
        return command === 'serve' ? html.replaceAll('__SITE_URL__', 'http://localhost:3000') : html
      }
    }
  ],
  server: {
    port: 3000,
    host: true,
    watch: {
      ignored: ['**/*.db', '**/*.db-*'],
    },
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
      }
    }
  }
}))
