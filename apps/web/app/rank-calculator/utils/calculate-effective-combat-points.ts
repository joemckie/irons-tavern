import { calculateExpectedCombatDiaryBonus } from './calculate-expected-combat-diary-bonus';
import type { StandardRank } from '@/config/ranks';
import { calculateMaximumCombatPoints } from './calculators/calculate-maximum-combat-points';
import { calculateExpectedEHX } from './calculate-expected-ehx';

export function calculateEffectiveCombatPoints(
  currentRank: StandardRank,
): number {
  const maximumCombatPoints = calculateMaximumCombatPoints(1);
  const expectedCombatDiaryBonus =
    calculateExpectedCombatDiaryBonus(currentRank);
  const expectedEHB = calculateExpectedEHX(currentRank);
  const pointsPerEHB = 10;

  return (
    expectedCombatDiaryBonus *
    (maximumCombatPoints + expectedEHB * pointsPerEHB)
  );
}
