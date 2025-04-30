import ts from '@rollup/plugin-typescript';
import { defineConfig } from 'vite';
import pluginExternal from 'vite-plugin-external';

import { dependencies } from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    ts({
      tsconfig: './tsconfig.build.json'
    }),
    pluginExternal({
      nodeBuiltins: true,
      externalizeDeps: Object.keys(dependencies)
    })
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs'],
      fileName: '[name]'
    },
    minify: false
  },
  test: {
    dir: 'test'
  }
});
