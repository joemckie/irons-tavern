/**
 * Normalises entity names. Strips quotes that cause parsing issues and converts to lowercase to create consistent keys.
 */
export function normaliseEntityName(name: string) {
  return name.replaceAll("'", '').replaceAll('.', '').toLowerCase();
}
