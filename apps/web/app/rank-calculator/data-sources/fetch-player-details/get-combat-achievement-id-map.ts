import { clientConstants } from '@/config/constants.client';
import { combatAchievementTierPoints } from '@/app/schemas/osrs';
import {
  CombatAchievementJson,
  CombatAchievementListResponse,
} from '@/app/schemas/wiki';
import * as Sentry from '@sentry/nextjs';
import { unstable_cache } from 'next/cache';

export const getCaIdMap = unstable_cache(
  async () => {
    const query = [
      '[[Category:Easy Combat Achievements tasks||Medium Combat Achievements tasks||Hard Combat Achievements tasks||Elite Combat Achievements tasks||Master Combat Achievements tasks||Grandmaster Combat Achievements tasks]]',
      '?Combat Achievement JSON',
      'limit=1000',
    ].join('|');

    const params = new URLSearchParams({
      action: 'ask',
      format: 'json',
      query,
      api_version: '2',
      formatversion: '2',
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

      return Object.values(data.query.results).reduce<Record<string, number>>(
        (acc, val) => {
          const [combatAchievementJson] =
            val.printouts['Combat Achievement JSON'];

          if (!combatAchievementJson) {
            return acc;
          }

          const { id, tier } = CombatAchievementJson.parse(
            JSON.parse(combatAchievementJson),
          );

          return { ...acc, [id]: combatAchievementTierPoints[tier] };
        },
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
