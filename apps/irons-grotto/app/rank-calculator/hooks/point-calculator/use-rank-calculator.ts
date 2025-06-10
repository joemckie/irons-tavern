import { CommonPointCalculatorData } from '@/app/schemas/rank-calculator';
import { calculateRankThresholds } from '@/app/rank-calculator/utils/calculate-rank-thresholds';
import { useWatch } from 'react-hook-form';
import { useCollectionLogPointCalculator } from './collection-log/use-collection-log-point-calculator';
import { useNotableItemsPointCalculator } from './notable-items/use-notable-items-point-calculator';
import { useSkillingPointCalculator } from './skilling/use-skilling-point-calculator';
import { useCombatPointCalculator } from './combat/use-combat-point-calculator';
import { useRank } from '../use-rank';
import { RankCalculatorSchema } from '../../[player]/submit-rank-calculator-validation';
import { RankData } from '../../utils/calculators/calculate-rank';
import { calculateTotalPoints } from '../../utils/calculators/calculate-total-points';
import { useMaximumAvailablePoints } from './use-maximum-available-points';

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

  const pointsAwarded = calculateTotalPoints(
    totalCollectionLogPoints,
    totalNotableItemsPoints,
    totalSkillingPoints,
    totalCombatPoints,
  );

  const { rank, nextRank } = useRank(pointsAwarded);

  const maximumAvailablePoints = useMaximumAvailablePoints();

  const rankThresholds = calculateRankThresholds(maximumAvailablePoints);

  const currentRankThreshold = rankThresholds[rankStructure][rank]!;

  const nextRankThreshold = !nextRank
    ? pointsAwarded
    : rankThresholds[rankStructure][nextRank]!;

  const pointsRemaining = nextRankThreshold
    ? nextRankThreshold - pointsAwarded
    : pointsAwarded;

  const pointsAwardedPercentage = nextRankThreshold
    ? (pointsAwarded - currentRankThreshold) /
      (nextRankThreshold - currentRankThreshold)
    : pointsAwarded / nextRankThreshold;

  return {
    pointsAwarded,
    pointsAwardedPercentage,
    pointsRemaining,
    rank,
    nextRank,
  } satisfies RankCalculatorData;
}
