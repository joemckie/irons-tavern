import { constants } from '@/config/constants';
import { combatAchievementTierPoints } from '@/types/osrs';
import {
  CombatAchievementJson,
  CombatAchievementListResponse,
} from '@/types/wiki';

export async function getCaIdMap() {
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
      `${constants.wiki.baseUrl}/api.php?${params}`,
    );

    const data: CombatAchievementListResponse =
      await allCombatAchievementsResponse.json();

    return Object.values(data.query.results).reduce<Record<string, number>>(
      (acc, val) => {
        const [combatAchievementJson] =
          val.printouts['Combat Achievement JSON'];

        if (!combatAchievementJson) {
          return acc;
        }

        const { id, tier }: CombatAchievementJson = JSON.parse(
          combatAchievementJson,
        );

        return {
          ...acc,
          [id]: combatAchievementTierPoints[tier],
        };
      },
      {},
    );
  } catch {
    return {};
  }
}
