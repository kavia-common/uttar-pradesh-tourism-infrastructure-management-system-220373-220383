import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';

// PUBLIC_INTERFACE
export default defineConfig({
  plugins: [angular()],
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  preview: {
    host: '0.0.0.0',
    port: 3000
  }
});
