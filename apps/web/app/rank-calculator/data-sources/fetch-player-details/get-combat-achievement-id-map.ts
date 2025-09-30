import { clientConstants } from '@/config/constants.client';
import { combatAchievementTierPoints } from '@/app/schemas/osrs';
import { CombatAchievementListResponse } from '@/app/schemas/wiki';
import * as Sentry from '@sentry/nextjs';
import { unstable_cache } from 'next/cache';

const fetchCombatAchievements = async (
  offset = 0,
): Promise<CombatAchievementListResponse['bucket']> => {
  const { queryLimit } = clientConstants.wiki;

  const query = `bucket("combat_achievement").select("id", "name", "tier").limit(${queryLimit}).offset(${offset}).run()`;
  const params = new URLSearchParams({
    action: 'bucket',
    format: 'json',
    query,
  });

  const allCombatAchievementsResponse = await fetch(
    `${clientConstants.wiki.baseUrl}/api.php?${params}`,
    {
      headers: {
        'User-Agent': clientConstants.wiki.userAgent,
      },
    },
  );

  const { bucket } = CombatAchievementListResponse.parse(
    await allCombatAchievementsResponse.json(),
  );

  // Check for the next page if the current bucket is full
  if (bucket.length === queryLimit) {
    return [...bucket, ...(await fetchCombatAchievements(offset + queryLimit))];
  }

  return bucket;
};

export const getCaIdMap = unstable_cache(
  async () => {
    try {
      const allCombatAchievements = await fetchCombatAchievements();

      return allCombatAchievements.reduce<Record<string, number>>(
        (acc, { id, tier }) => ({
          ...acc,
          [id]: combatAchievementTierPoints[tier],
        }),
        {},
      );
    } catch (error) {
      Sentry.captureException(error);
    }
  },
  [],
  {
    revalidate: 60 * 60 * 24 * 7, // 7 days
  },
);
