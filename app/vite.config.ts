import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 5173,
    strictPort: false,
    proxy: {
      // Photos live in the media bucket, not in the bundle, so the dev server
      // has nothing to serve at /media/* on its own — every image would fall
      // back to its placeholder locally. Forward to the deployed CloudFront
      // distribution instead, which makes `npm run dev` match production.
      //
      // `changeOrigin` is required, not cosmetic: without it the proxied
      // request carries `Host: localhost:5173`, which is not a configured
      // CloudFront alias, and the distribution rejects it.
      '/media': {
        target: 'https://chrismaddie.bridewell.me',
        changeOrigin: true,
      },
    },
  },
})
