import { createReader } from '@keystatic/core/reader';
import * as keystaticConfigModule from '../keystatic.config';

export const reader = createReader(
  '.', // repoPath: current directory for local storage
  keystaticConfigModule.default // config object
);
