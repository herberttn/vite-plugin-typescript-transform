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

Applies the TypeScript compiler during Vite transform build phase.

This plugin may allow the use of language features not yet supported by [`vite's`][link-to-vite] default compiler, [`esbuild`][link-to-esbuild].

> [!IMPORTANT]
> - It does not change or disable any of [`vite`][link-to-vite] compiler/features/options.
> - It only transpiles the code using the [`typescript`][link-to-typescript] compiler and lets [`vite`][link-to-vite] move on with the transpiled code.
> - The [`typescript`][link-to-typescript] configuration is what controls the transpilation and its outputs.

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
See the [`Options`][link-to-options] interface and its inline documentation.

### Transform ECMAScript decorators
The new [ECMAScript decorators][link-to-ecmascript-decorators] are not supported by [`esbuild`][link-to-esbuild] (yet), but they are supported by [`typescript`][link-to-typescript] since `v5` ([see the announcement][link-to-typescript-v5-announcement]). This example down-levels the new decorators into code that is usable in runtimes that do not yet support it.
```typescript
import ts from 'typescript';
import { defineConfig } from 'vite';
import { vitePluginTypescriptTransform } from 'vite-plugin-typescript-transform';

export default defineConfig({
  // ...your vite configuration
  plugins: [
    vitePluginTypescriptTransform({
      enforce: 'pre',
      filter: {
        files: {
          include: /\.ts$/,
        },
      },
      tsconfig: {
        override: {
          target: ts.ScriptTarget.ES2021,
        },
      },
    }),
  ],
});
```

### Common errors/problems

##### `Sourcemap is likely to be incorrect: a plugin (vite-plugin-typescript-transform) was used to transform files, but didn't generate a sourcemap for the transformation.`
This means that the plugin transformed the code but it did not generate sourcemaps for the changes.
The detail here is that the plugin is using [`typescript`][link-to-typescript] directly, so its configuration play a crucial role in what happens.
More specifically: to generate sourcemaps, sourcemaps need to be enabled in the [`typescript`][link-to-typescript] configuration.
This can be achieved in two different ways:
- by setting `compilerOptions.sourceMap` to `true` in the `tsconfig.json` file
- by setting `tsconfig.override.sourceMap` to `true` in the plugin configuration
