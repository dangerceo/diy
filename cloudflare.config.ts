import { defineConfig } from 'vite';
import UnoCSS from 'unocss/vite';
import { presetUno, presetIcons } from 'unocss';
import tsconfigPaths from 'vite-tsconfig-paths';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// Optimized UnoCSS configuration for Cloudflare
const unoConfig = {
  presets: [
    presetUno({
      dark: 'class',
      shortcuts: {
        'btn': 'px-4 py-2 rounded-lg bg-accent-500 text-white hover:bg-accent-600 transition-colors duration-200',
        // Add other commonly used shortcuts here
      }
    }),
    presetIcons({
      scale: 1.2,
      warn: true,
      collections: {
        // Only include icons you actually use
      }
    })
  ],
  transformers: [],
  safelist: [
    // Add your most commonly used classes here
    'bg-white', 'text-gray-900', 'dark:bg-gray-900', 'dark:text-white'
  ]
};

export default defineConfig({
  build: {
    target: 'esnext',
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', '@remix-run/react']
        }
      }
    }
  },
  plugins: [
    UnoCSS(unoConfig),
    nodePolyfills({
      globals: {
        Buffer: true,
        global: true,
        process: true
      },
      protocolImports: true
    }),
    tsconfigPaths()
  ],
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@remix-run/react',
      '@remix-run/cloudflare'
    ]
  },
  css: {
    modules: {
      localsConvention: 'camelCase'
    }
  }
});
