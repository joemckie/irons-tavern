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
    Legacy: {
      Legend: 0,
    },
    Admin: {
      Lieutenant: 0,
      Captain: standardRankPoints.Nature,
      General: standardRankPoints.Law,
      Colonel: standardRankPoints.Achiever,
      Brigadier: standardRankPoints.Elite,
      Admiral: standardRankPoints.Diseased,
      Marshal: standardRankPoints.Blisterwood,
    },
    Moderator: {
      Moderator: 0,
    },
    'Deputy Owner': {
      'Deputy Owner': 0,
    },
    Owner: {
      Owner: 0,
    },
  };
};
