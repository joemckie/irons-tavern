import { RankCalculatorSchema } from '../[player]/submit-rank-calculator-validation';
import { fetchPlayerDetails } from '../data-sources/fetch-player-details/fetch-player-details';

export const getPlayerDetails = async (player: string) => {
  const playerDetails = await fetchPlayerDetails(player);

  if (!playerDetails.success) {
    throw new Error('Could not retrieve player details');
  }

  const { data } = playerDetails;

  const acquiredItems =
    data.acquiredItems?.reduce<Record<string, boolean>>(
      (acc, val) => ({ ...acc, [val]: true }),
      {},
    ) ?? {};

  return {
    acquiredItems,
    achievementDiaries: data.achievementDiaries ?? {
      'Kourend & Kebos': 'None',
      'Lumbridge & Draynor': 'None',
      'Western Provinces': 'None',
      Ardougne: 'None',
      Desert: 'None',
      Falador: 'None',
      Fremennik: 'None',
      Kandarin: 'None',
      Karamja: 'None',
      Morytania: 'None',
      Varrock: 'None',
      Wilderness: 'None',
    },
    joinDate: data.joinDate ? new Date(data.joinDate) : new Date(),
    collectionLogCount: data.collectionLogCount ?? 0,
    collectionLogTotal: data.collectionLogTotal ?? 0,
    playerName: data.playerName ?? player,
    combatAchievementTier: data.combatAchievementTier ?? 'None',
    ehb: data.ehb ?? 0,
    ehp: data.ehp ?? 0,
    totalLevel: data.totalLevel ?? 0,
    rankStructure: data.rankStructure ?? 'Standard',
  } satisfies Omit<RankCalculatorSchema, 'rank' | 'points'>;
};
