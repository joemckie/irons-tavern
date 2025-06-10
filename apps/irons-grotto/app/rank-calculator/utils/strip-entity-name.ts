/**
 * Strips quotes from entity names that cause parsing issues
 */
export function stripEntityName(name: string) {
  return name.replaceAll("'", '').replaceAll('.', '');
}
