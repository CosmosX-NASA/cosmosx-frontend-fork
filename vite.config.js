import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/https://github.com/CosmosX-NASA/cosmosx-frontend/',
  server: {
    proxy: {
      '/api': {
        target: 'https://api.cosmosx.site',
        changeOrigin: true,
      },
    },
  },
});
