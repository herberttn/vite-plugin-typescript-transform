import type { CompilerOptions } from 'typescript';
import type { FilterPattern, Plugin } from 'vite';

interface Options {
  apply?: Plugin['apply'];
  enforce?: Plugin['enforce'];
  filter?: {
    code?: (code: string) => boolean;
    files?: {
      include?: FilterPattern;
      exclude?: FilterPattern;
    };
  };
  tsconfig?: {
    location?: string;
    override?: CompilerOptions;
  };
}

export type {
  Options,
};
