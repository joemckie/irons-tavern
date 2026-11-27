/**
 * Normalises an RSN for matching across sources.
 * OSRS treats case, spaces, underscores and hyphens as equivalent.
 */
export function normaliseRsn(rsn: string): string {
  return rsn.toLowerCase().replace(/[_-]/g, " ").replace(/\s+/g, " ").trim();
}
