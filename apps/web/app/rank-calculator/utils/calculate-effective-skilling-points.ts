import { calculateExpectedSkillingDiaryBonus } from './calculate-expected-skilling-diary-bonus';
import type { StandardRank } from '@/config/ranks';
import { calculateMaximumSkillingPoints } from './calculators/calculate-maximum-skilling-points';
import { calculateExpectedEHX } from './calculate-expected-ehx';

export function calculateEffectiveSkillingPoints(
  currentRank: StandardRank,
): number {
  const maximumSkillingPoints = calculateMaximumSkillingPoints(1);
  const expectedSkillingDiaryBonus =
    calculateExpectedSkillingDiaryBonus(currentRank);
  const expectedEHP = calculateExpectedEHX(currentRank);
  const pointsPerEHP = 10;

  return (
    expectedSkillingDiaryBonus *
    (maximumSkillingPoints + expectedEHP * pointsPerEHP)
  );
}
