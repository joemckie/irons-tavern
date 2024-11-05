import { FormData, RankStructure } from '@/types/rank-calculator';
import { CombatAchievementTier, DiaryTier } from '@/types/osrs';
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
      'Kourend & Kebos': DiaryTier.None,
      'Lumbridge & Draynor': DiaryTier.None,
      'Western Provinces': DiaryTier.None,
      Ardougne: DiaryTier.None,
      Desert: DiaryTier.None,
      Falador: DiaryTier.None,
      Fremennik: DiaryTier.None,
      Kandarin: DiaryTier.None,
      Karamja: DiaryTier.None,
      Morytania: DiaryTier.None,
      Varrock: DiaryTier.None,
      Wilderness: DiaryTier.None,
    },
    joinDate: data.joinDate ? new Date(data.joinDate) : new Date(),
    collectionLogCount: data.collectionLogCount ?? 0,
    collectionLogTotal: data.collectionLogTotal ?? 0,
    playerName: data.playerName ?? player,
    combatAchievementTier:
      data.combatAchievementTier ?? CombatAchievementTier.None,
    ehb: data.ehb ?? 0,
    ehp: data.ehp ?? 0,
    totalLevel: data.totalLevel ?? 0,
    rankStructure: data.rankStructure ?? RankStructure.Standard,
  } satisfies Omit<FormData, 'rank' | 'points'>;
};
