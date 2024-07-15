import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    commonjsOptions: {
      esmExternals: true,
    },
  },
  resolve: {
    alias: {
      // Add your custom aliases if needed
    },
  },
  esbuild: {
    jsxInject: `import React from 'react'`,
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
  },
});

