import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        // Keep the big, rarely-changing libraries in their own chunks so a
        // content edit to the site does not invalidate the cached copies of
        // React, GSAP or Framer Motion that returning visitors already hold.
        rollupOptions: {
          output: {
            manualChunks(id) {
              if (!id.includes('node_modules')) return undefined;
              if (/[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/.test(id)) return 'react';
              if (/[\\/]node_modules[\\/]gsap[\\/]/.test(id)) return 'gsap';
              if (/[\\/]node_modules[\\/]framer-motion[\\/]/.test(id)) return 'motion';
              return undefined;
            }
          }
        }
      }
    };
});
