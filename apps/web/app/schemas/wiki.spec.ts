import { midGamePlayerFixture } from "@/mocks/wiki-sync";
import { parseAchievementDiaries } from "@/app/rank-calculator/data-sources/fetch-player-details/utils/parse-achievement-diaries";
import { WikiSyncResponse } from "./wiki";

describe("WikiSyncResponse", () => {
  // WikiSync returns `complete: null` for some diary tiers (seen on Western Provinces, 2026-11-27)
  it("accepts a diary tier whose complete flag is null", () => {
    const fixture = structuredClone(midGamePlayerFixture);
    const westernProvinces = fixture.achievement_diaries["Western Provinces"];

    for (const tier of Object.values(westernProvinces)) {
      (tier as { complete: boolean | null }).complete = null;
    }

    westernProvinces.Easy.tasks.fill(true);

    const result = WikiSyncResponse.safeParse(fixture);

    expect(result.success).toBe(true);
    expect(parseAchievementDiaries(result.data!.achievement_diaries)["Western Provinces"]).not.toBe(
      "None",
    );
  });
});
