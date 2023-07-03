import type { CompilerOptions } from 'typescript';
import type { FilterPattern, Plugin } from 'vite';

interface Options {
  /**
   * Apply the plugin only for serve or build, or on certain conditions.
   */
  apply?: Plugin['apply'];

  /**
   * Enforce plugin invocation tier similar to webpack loaders.
   *
   * Plugin invocation order:
   * - alias resolution
   * - `enforce: 'pre'` plugins
   * - vite core plugins
   * - normal plugins
   * - vite build plugins
   * - `enforce: 'post'` plugins
   * - vite build post plugins
   */
  enforce?: Plugin['enforce'];

  /**
   * Filter when to transpile based on the file code or location.
   * If not provided, all code and files will be transpiled.
   */
  filter?: {
    /**
     * Determines which files should be transpiled based on their code.
     * If not provided, allows any file code to be transpiled.
     *
     * @param code the raw code.
     * @returns whether to transpile or not.
     */
    code?: (code: string) => boolean;

    /**
     * Determines which files should be transpiled based on their location.
     * If not provided, allows any file location be transpiled.
     */
    files?: {
      /**
       * Files to transpile.
       * If not provided, matches everything.
       *
       * Supports globbing.
       */
      include?: FilterPattern;

      /**
       * Files to ignore.
       * If not provided, doesn't ignore anything.
       *
       * Supports globbing.
       */
      exclude?: FilterPattern;
    };
  };

  /**
   * TypeScript configuration.
   */
  tsconfig?: {
    /**
     * The location of the tsconfig.json file.
     * If not provided, the plugin will detect it automatically based on the file location.
     *
     * Must be absolute.
     */
    location?: string;

    /**
     * Overrides the compiler options found in the tsconfig.json file.
     */
    override?: CompilerOptions;
  };
}

export type {
  Options,
};
