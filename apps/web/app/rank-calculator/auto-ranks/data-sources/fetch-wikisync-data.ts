import { clientConstants } from "@/config/constants.client";
import { WikiSyncResponse } from "@/app/schemas/wiki";

const defaultRetryDelaysMs = [2000, 5000, 10000];
// Keeps one rate-limited member from holding up the whole report
const defaultMaxRetryAfterMs = 10000;

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Fetches a player's WikiSync data for the bulk auto-rank report.
 *
 * Unlike `getWikiSyncData`, only "no data for this player" (400/404) returns null.
 * Rate limiting is retried, and any other failure throws, so an outage is reported
 * as an error rather than as the member not using WikiSync.
 */
export async function fetchWikiSyncData(
  rsn: string,
  {
    retryDelaysMs = defaultRetryDelaysMs,
    maxRetryAfterMs = defaultMaxRetryAfterMs,
  }: { retryDelaysMs?: number[]; maxRetryAfterMs?: number } = {},
): Promise<WikiSyncResponse | null> {
  for (let attempt = 0; ; attempt++) {
    const response = await fetch(
      `${clientConstants.wikiSync.baseUrl}/runelite/player/${encodeURIComponent(rsn)}/STANDARD`,
      {
        // User agent is required or the API returns a 400
        headers: { "User-Agent": "Irons-Tavern-Rank-Calculator" },
      },
    );

    if (response.status === 400 || response.status === 404) {
      return null;
    }

    if (response.status === 429 && attempt < retryDelaysMs.length) {
      const retryAfterSeconds = Number(response.headers.get("Retry-After"));

      await wait(
        Number.isFinite(retryAfterSeconds) && retryAfterSeconds > 0
          ? Math.min(retryAfterSeconds * 1000, maxRetryAfterMs)
          : retryDelaysMs[attempt],
      );

      continue;
    }

    if (!response.ok) {
      throw new Error(`WikiSync request for ${rsn} failed with status ${response.status}`);
    }

    return WikiSyncResponse.parse(await response.json());
  }
}
