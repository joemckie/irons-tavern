import { constants } from '@/config/constants';
import { combatAchievementTierPoints } from '@/types/osrs';
import {
  CombatAchievementJson,
  CombatAchievementListResponse,
} from '@/types/wiki';
import { NextResponse } from 'next/server';

export async function GET() {
  const askQuery = [
    '[[Category:Easy Combat Achievements tasks||Medium Combat Achievements tasks||Hard Combat Achievements tasks||Elite Combat Achievements tasks||Master Combat Achievements tasks||Grandmaster Combat Achievements tasks]]',
    '?Combat Achievement JSON',
    'limit=1000',
  ].join('|');

  const params = new URLSearchParams({
    action: 'ask',
    format: 'json',
    query: askQuery,
    api_version: '2',
    formatversion: '2',
  }).toString();

  try {
    const wikiResponse = await fetch(
      `${constants.wiki.baseUrl}/api.php?${params}`,
    );
    const data: CombatAchievementListResponse = await wikiResponse.json();

    const combatAchievementPointMap = Object.values(data.query.results).reduce<
      Record<string, number>
    >((acc, val) => {
      const [combatAchievementJson] = val.printouts['Combat Achievement JSON'];

      if (!combatAchievementJson) {
        return acc;
      }

      const { id, tier }: CombatAchievementJson = JSON.parse(
        val.printouts['Combat Achievement JSON'][0],
      );

      return {
        ...acc,
        [id]: combatAchievementTierPoints[tier],
      };
    }, {});

    return NextResponse.json(combatAchievementPointMap);
  } catch (error) {
    console.error(error);

    return NextResponse.json(null, {
      status: 500,
    });
  }
}
