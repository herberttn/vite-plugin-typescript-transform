import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  declaration: true,
  clean: true,
  entries: [
    './src/index',
  ],
  externals: [
    'typescript',
    'vite'
  ],
  failOnWarn: true,
  name: 'vite-plugin-typescript-transform',
  outDir: 'dist',
  rollup: {
    emitCJS: true,
    esbuild: {
      target: 'node14'
    },
    inlineDependencies: true,
  },
});
