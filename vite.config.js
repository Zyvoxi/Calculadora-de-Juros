import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  plugins: [
    react({
      plugins: [['@swc/plugin-styled-components', { displayName: true }]],
    }),
    createHtmlPlugin({
      inject: {
        injectData: {
          title: 'Zyvoxi - Calculadora de Juros',
        },
      },
      minify: true, // Minifica o HTML gerado
    }),
  ],
  base: '/calculadora-de-juros',
  build: {
    target: 'es2022',
    sourcemap: true,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
    chunkSizeWarningLimit: 500,
  },
});
