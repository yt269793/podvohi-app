import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' — приложение открывается из любой папки хостинга
export default defineConfig({
  base: './',
  plugins: [react()],
});
