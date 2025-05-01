import { RankStructure } from '@/app/schemas/rank-calculator';
import { Rank } from '@/config/enums';
import { rankProportions, StandardRank } from '@/config/ranks';

export const calculateRankThresholds = (
  totalPoints: number,
): Record<RankStructure, Partial<Record<Rank, number>>> => {
  const rankProportionsKeys = Object.entries(rankProportions) as [
    keyof typeof rankProportions,
    number,
  ][];

  const standardRankPoints = rankProportionsKeys.reduce(
    (acc, [rank, proportion]) => {
      const rankPoints = Math.ceil((totalPoints * proportion) / 1000) * 1000;

      acc[rank] = rankPoints;

      return acc;
    },
    {} as Record<Exclude<StandardRank, 'Air' | 'Pine'>, number>,
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
