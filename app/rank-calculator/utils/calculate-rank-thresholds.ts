import { RankStructure } from '@/app/schemas/rank-calculator';
import { Rank } from '@/config/enums';
import { rankProportions } from '@/config/ranks';

export const calculateRankThresholds = (
  totalPoints: number,
): Record<RankStructure, Partial<Record<Rank, number>>> => {
  const standardRankPoints = Object.entries(rankProportions).reduce(
    (acc, [rank, proportion]) => {
      const rankPoints = Math.ceil((totalPoints * proportion) / 1000) * 1000;

      acc[rank as keyof typeof rankProportions] = rankPoints;

      return acc;
    },
    { ...rankProportions },
  );

  return {
    Standard: {
      Air: 0,
      Pine: 1,
      ...standardRankPoints,
    },
    'Bingo Winner': {
      'Gnome Child': 0,
    },
    Legacy: {
      Legend: 0,
    },
    Inviter: {
      Hero: 0,
      Warlock: standardRankPoints.Law,
      Dragonstone: standardRankPoints.Elite,
    },
    Admin: {
      Defiler: 0,
      Onyx: standardRankPoints.Achiever,
    },
    Moderator: {
      Pure: 0,
      Zenyte: standardRankPoints.Achiever,
    },
    'Deputy Owner': {
      'Deputy Owner': 0,
    },
    Owner: {
      Owner: 0,
    },
  };
};
