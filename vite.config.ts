import build from '@hono/vite-build/cloudflare-pages'
import devServer from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/cloudflare'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    build(),
    devServer({
      adapter,
      entry: 'src/index.tsx'
    })
  ],
  build: {
    // Cloudflare Workers: 1MB uncompressed ≈ 250KB gzipped — well within limits
    // esbuild handles minification for the Worker bundle via @hono/vite-build
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        // Inline dynamic imports — required for Cloudflare Workers (no chunk splitting)
        inlineDynamicImports: true,
      }
    }
  }
})
