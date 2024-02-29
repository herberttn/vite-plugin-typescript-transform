import { dirname } from 'node:path';
import { EOL } from 'node:os';

import { createFilter } from 'vite';
import type { PluginOption, Rollup } from 'vite';
import ts from 'typescript';
import type { CompilerOptions, DiagnosticMessageChain } from 'typescript';

import type { Options } from './types.js';

function createPlugin(options?: Options): PluginOption {
  const cache: Map<string, CompilerOptions> = new Map();

  const filterCode = options?.filter?.code ?? (() => true);
  const filterFile = createFilter(options?.filter?.files?.include, options?.filter?.files?.exclude);

  return {
    apply: options?.apply,
    enforce: options?.enforce,
    name: 'vite-plugin-typescript-transform',

    buildStart(): void {
      cache.clear();
    },

    transform(code: string, file: string): Rollup.TransformResult {
      if (!filterFile(file) || !filterCode(code)) {
        return;
      }

      try {
        const compilerOptions = prepareCompilerOptions(cache, file, options);
        const compiler = ts.transpileModule(code, { compilerOptions, fileName: file });

        return {
          code: compiler.outputText,
          map: compiler.sourceMapText,
        };
      } catch (error) {
        this.error(formatErrorOrDiagnostic(error));
      }
    },

  };
}

function formatErrorOrDiagnostic(error: unknown): string | Rollup.RollupError {
  if (typeof error === 'string') {
    return error;
  }

  if (error instanceof Error) {
    return error;
  }

  return ts.flattenDiagnosticMessageText(error as DiagnosticMessageChain, EOL);
}

function prepareCompilerOptions(cache: Map<string, CompilerOptions>, file: string, options?: Options): CompilerOptions {
  const key = options?.tsconfig?.location
    ?? dirname(file);

  if (cache.has(key)) {
    return cache.get(key) as CompilerOptions;
  }

  const location = options?.tsconfig?.location
    ?? ts.findConfigFile(file, ts.sys.fileExists);

  if (location) {
    const { config, error } = ts.readConfigFile(location, ts.sys.readFile);

    if (error) {
      throw error;
    }

    const configLocation = dirname(location)
    const { options: tsconfigOptions } = ts.parseJsonConfigFileContent(config, ts.sys, configLocation)

    const compilerOptions = {
      ...tsconfigOptions,
      ...options?.tsconfig?.override,
    } satisfies CompilerOptions;

    cache.set(key, compilerOptions);
    return compilerOptions;
  }

  throw new Error(`Could not find TypeScript configuration for ${file}`);
}

export {
  createPlugin,
};
