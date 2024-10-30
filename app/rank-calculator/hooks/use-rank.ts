import { useWatch } from 'react-hook-form';
import { FormData } from '@/types/rank-calculator';
import { rankThresholds } from '@/config/ranks';
import { Rank } from '@/config/enums';

export interface RankData {
  rank: Rank;
  nextRank: Rank | null;
}

export function useRank(pointsAwarded: number) {
  const rankStructure = useWatch<FormData, 'rankStructure'>({
    name: 'rankStructure',
  });

  const rankData = Object.entries(rankThresholds[rankStructure]) as [
    Rank,
    number,
  ][];

  const [[initialRank]] = rankData;

  return rankData.reduceRight<RankData>(
    (acc, [rank, threshold], i) => {
      if (acc.rank === initialRank && pointsAwarded >= threshold) {
        const [nextRank] = rankData[i + 1] ?? [];

        return {
          rank,
          nextRank: nextRank ?? null,
        };
      }

      return acc;
    },
    {
      rank: initialRank,
      nextRank: null,
    },
  );
}
