import { constants } from '@/config/constants';
import { useSuspenseQuery } from '@tanstack/react-query';
import { FormData, RankStructure } from '@/types/rank-calculator';
import { GetPlayerDetailsResponse } from '@/app/api/get-player-details/route';
import { CombatAchievementTier, DiaryTier } from '@/types/osrs';

export const getPlayerDetails = async (player: string) => {
  const response = await fetch(
    `${constants.publicUrl}/api/get-player-details?player=${player}`,
  );
  const getPlayerDetailsData: GetPlayerDetailsResponse = await response.json();

  if (!getPlayerDetailsData.success) {
    throw new Error('Could not retrieve player details');
  }

  const { data } = getPlayerDetailsData;

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
    rankStructure: RankStructure.Standard,
  } satisfies FormData;
};

export function usePlayerDetails(player: string) {
  return useSuspenseQuery({
    queryKey: ['playerDetails', player],
    async queryFn() {
      return getPlayerDetails(player);
    },
  });
}
