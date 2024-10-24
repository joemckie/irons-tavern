import { constants } from '@/config/constants';
import { useSuspenseQuery } from '@tanstack/react-query';
import { FormData, PlayerData } from '@/types/rank-calculator';
import { stripEntityName } from '../utils/strip-entity-name';

export const getPlayerDetails = async (player: string) => {
  const response = await fetch(
    `${constants.publicUrl}/api/get-player-details?player=${player}`,
  );
  const data: PlayerData = await response.json();

  const acquiredItems =
    data.acquiredItems?.reduce<Record<string, boolean>>(
      (acc, val) => ({ ...acc, [stripEntityName(val)]: true }),
      {},
    ) ?? {};

  return {
    items: acquiredItems,
    achievementDiaries: data.achievementDiaries ?? {
      'Kourend & Kebos': null,
      'Lumbridge & Draynor': null,
      'Western Provinces': null,
      Ardougne: null,
      Desert: null,
      Falador: null,
      Fremennik: null,
      Kandarin: null,
      Karamja: null,
      Morytania: null,
      Varrock: null,
      Wilderness: null,
    },
    joinDate: data.joinDate ? new Date(data.joinDate) : null,
    collectionLogCount: data.collectionLogCount ?? 0,
    playerName: player,
    caTier: data.combatAchievementTier,
    ehb: data.ehb ?? 0,
    ehp: data.ehp ?? 0,
    totalLevel: data.totalLevel ?? 0,
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
