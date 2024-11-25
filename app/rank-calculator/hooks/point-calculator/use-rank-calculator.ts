import { CommonPointCalculatorData } from '@/app/schemas/rank-calculator';
import { rankThresholds } from '@/config/ranks';
import { useWatch } from 'react-hook-form';
import { useCollectionLogPointCalculator } from './collection-log/use-collection-log-point-calculator';
import { useNotableItemsPointCalculator } from './notable-items/use-notable-items-point-calculator';
import { useSkillingPointCalculator } from './skilling/use-skilling-point-calculator';
import { useCombatPointCalculator } from './combat/use-combat-point-calculator';
import { RankData, useRank } from '../use-rank';
import { RankCalculatorSchema } from '../../[player]/submit-rank-calculator-validation';

export type RankCalculatorData = CommonPointCalculatorData & RankData;

export function useRankCalculator() {
  const rankStructure = useWatch<RankCalculatorSchema, 'rankStructure'>({
    name: 'rankStructure',
  });
  const { pointsAwarded: totalCollectionLogPoints } =
    useCollectionLogPointCalculator();
  const { pointsAwarded: totalNotableItemsPoints } =
    useNotableItemsPointCalculator();
  const { pointsAwarded: totalSkillingPoints } = useSkillingPointCalculator();
  const { pointsAwarded: totalCombatPoints } = useCombatPointCalculator();
  const pointsAwarded =
    totalCollectionLogPoints +
    totalNotableItemsPoints +
    totalSkillingPoints +
    totalCombatPoints;
  const { rank, nextRank } = useRank(pointsAwarded);
  const currentRankThreshold = rankThresholds[rankStructure][rank]!;
  const nextRankThreshold = !nextRank
    ? currentRankThreshold
    : rankThresholds[rankStructure][nextRank]!;
  const pointsRemaining = nextRankThreshold - pointsAwarded;
  const pointsAwardedPercentage = (pointsAwarded - currentRankThreshold) / (nextRankThreshold - currentRankThreshold);

  return {
    pointsAwarded,
    pointsAwardedPercentage,
    pointsRemaining,
    rank,
    nextRank,
  } satisfies RankCalculatorData;
}
