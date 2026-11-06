/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/robofriends/',
  plugins: [react()],
  css: {
    // tachyons ships IE-only `*zoom` hacks that LightningCSS rejects; drop them.
    lightningcss: { errorRecovery: true },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
  },
});
