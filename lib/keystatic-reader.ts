import { createReader } from '@keystatic/core/reader';
import readerConfig from '../keystatic.config.reader';

// Create a reader instance for reading Keystatic content
// Uses local storage mode to read from filesystem (content committed to repo)
export const reader = createReader(process.cwd(), readerConfig);
