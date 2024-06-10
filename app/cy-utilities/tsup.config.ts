import { defineConfig } from 'tsup'

export default defineConfig({
  clean: true,
  entry: ['src/index.ts'],
  format: ['esm'],
  minify: true,
  target: 'esnext',
  outDir: 'lib',
  dts: true,
  keepNames: true,
  minifySyntax: true,
  external: ['pg-hstore'],
  splitting: false,
  sourcemap: false,
  minifyIdentifiers: true,
  skipNodeModulesBundle: true,
})
