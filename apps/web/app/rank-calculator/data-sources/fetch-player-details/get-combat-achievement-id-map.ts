import { clientConstants } from '@/config/constants.client';
import { combatAchievementTierPoints } from '@/app/schemas/osrs';
import { CombatAchievementListResponse } from '@/app/schemas/wiki';
import * as Sentry from '@sentry/nextjs';
import { unstable_cache } from 'next/cache';

export const getCaIdMap = unstable_cache(
  async () => {
    const query = `bucket("combat_achievement").select("id", "name", "tier").run()`;

    const params = new URLSearchParams({
      action: 'bucket',
      format: 'json',
      query,
    });

    try {
      const allCombatAchievementsResponse = await fetch(
        `${clientConstants.wiki.baseUrl}/api.php?${params}`,
        {
          headers: {
            'User-Agent': clientConstants.wiki.userAgent,
          },
        },
      );

      const data = CombatAchievementListResponse.parse(
        await allCombatAchievementsResponse.json(),
      );

      return data.bucket.reduce<Record<string, number>>(
        (acc, { id, tier }) => ({
          ...acc,
          [id]: combatAchievementTierPoints[tier],
        }),
        {},
      );
    } catch (error) {
      Sentry.captureException(error);

      return null;
    }
  },
  [],
  {
    revalidate: 60 * 60 * 24 * 7, // 7 days
  },
);
