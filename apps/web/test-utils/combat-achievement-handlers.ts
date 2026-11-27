import { http, HttpResponse } from "msw";
import { clientConstants } from "@/config/constants.client";
import { CombatAchievementListResponse } from "@/app/schemas/wiki";
import { combatAchievementTierFixture } from "@/mocks/wiki-data/combat-achievement-tiers";

/**
 * Wiki API handler for the combat achievement bucket query and tier thresholds.
 * Every given combat achievement ID is treated as a Medium task (2 points).
 */
export function combatAchievementHandler(combatAchievementIds: number[]) {
  return http.get(`${clientConstants.wiki.baseUrl}/api.php`, ({ request }) => {
    const params = new URL(request.url).searchParams;

    if (params.get("action") === "bucket") {
      return HttpResponse.json({
        bucket: [...new Set(combatAchievementIds)].map((id) => ({
          id,
          name: `Combat achievement ${id}`,
          tier: "Medium" as const,
        })),
      } satisfies CombatAchievementListResponse);
    }

    if (params.get("action") === "expandtemplates") {
      return HttpResponse.json(combatAchievementTierFixture);
    }

    throw new Error(`No mock provided for ${request.url}`);
  });
}
