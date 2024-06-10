import { defineConfig } from 'tsup'

export default defineConfig({
  clean: true,
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  minify: true,
  target: 'esnext',
  outDir: 'lib',
  dts: true,
  keepNames: true,
  minifySyntax: true,
  splitting: false,
  sourcemap: false,
  minifyIdentifiers: true,
  skipNodeModulesBundle: true
})
