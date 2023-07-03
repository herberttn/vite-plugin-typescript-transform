vite-plugin-typescript-transform
---

[![ci][badge-workflow-ci]][badge-workflow-ci-link]
[![npm][badge-npm]][badge-npm-link]
[![license][badge-license]][badge-license-link]

[badge-license]: https://img.shields.io/github/license/herberttn/vite-plugin-typescript-transform?style=flat-square
[badge-license-link]: ./LICENSE.md
[badge-npm]: https://img.shields.io/npm/v/vite-plugin-typescript-transform?logo=npm&style=flat-square
[badge-npm-link]: https://www.npmjs.com/package/vite-plugin-typescript-transform
[badge-workflow-ci]: https://img.shields.io/github/actions/workflow/status/herberttn/vite-plugin-typescript-transform/ci.yml?branch=main&label=ci&logo=github&style=flat-square
[badge-workflow-ci-link]: https://github.com/herberttn/vite-plugin-typescript-transform/actions/workflows/ci.yml

Applies the typescript compiler during vite transform build phase.

[link-to-ecmascript-decorators]: https://tc39.es/proposal-decorators
[link-to-esbuild]: https://www.npmjs.com/package/esbuild
[link-to-nodejs]: https://nodejs.org
[link-to-typescript-v5-announcement]: https://devblogs.microsoft.com/typescript/announcing-typescript-5-0
[link-to-typescript]: https://www.npmjs.com/package/typescript
[link-to-vite]: https://www.npmjs.com/package/vite
[link-to-options]: ./src/types.ts#L4

### Install
```shell
npm install --save-dev vite-plugin-typescript-transform
```

### Options
See the [`Options`][link-to-options] interface.

### Transform ECMAScript decorators
As of now, [`vite`][link-to-vite] uses [`esbuild`][link-to-esbuild] to transpile typescript, which doesn't yet support the new [ECMAScript decorators][link-to-ecmascript-decorators].  
But [`typescript`][link-to-typescript] added support for them in [`v5`][link-to-typescript-v5-announcement].

This example transpiles the new ECMAScript decorators into code that is usable in runtimes that do not yet support it.
```typescript
import { vitePluginTypescriptTransform } from 'vite-plugin-typescript-transform';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  // ...your vite configuration
  plugins: [
    vitePluginTypescriptTransform({
      enfore: 'pre',
      filter: {
        files: {
          include: /\.ts$/,
        },
      },
      tsconfig: {
        override: {
          target: 'ES2021',
        },
      },
    }),
  ],
});
```
