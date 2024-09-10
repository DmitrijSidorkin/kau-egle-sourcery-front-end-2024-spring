/// <reference types="vite-plugin-svgr/client" />

import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      // '@' refers to the 'src' directory
      '@': path.resolve(__dirname, './src'),
    },
  },
});
