import { escapeRegExp, camelCase } from 'lodash';

/**
 * Strips quotes from entity names that cause parsing issues
 */
export function stripEntityName(name: string) {
  return escapeRegExp(camelCase(name));
}
