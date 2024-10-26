import { constants } from '@/config/constants';
import { useSuspenseQuery } from '@tanstack/react-query';
import { FormData, PlayerData, RankStructure } from '@/types/rank-calculator';

export const getPlayerDetails = async (player: string) => {
  const response = await fetch(
    `${constants.publicUrl}/api/get-player-details?player=${player}`,
  );
  const data: PlayerData = await response.json();

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
    joinDate: data.joinDate ? new Date(data.joinDate) : null,
    collectionLogCount: data.collectionLogCount ?? 0,
    playerName: data.playerName ?? player,
    combatAchievementTier: data.combatAchievementTier ?? 'None',
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
