import type { StandardRank } from '@/config/ranks';
import { calculateCollectionLogSlotPoints } from './calculators/calculate-collection-log-slot-points';
import { calculateExpectedCollectionLogDiaryBonus } from './calculate-expected-collection-log-diary-bonus';

export const calculateEffectiveCollectionLogPoints = (
  totalCollectionLogSlots: number,
  currentRank: StandardRank,
): number => {
  const maximumCollectionLogPoints = calculateCollectionLogSlotPoints(
    totalCollectionLogSlots,
    1,
  );
  const expectedCollectionLogDiaryBonus =
    calculateExpectedCollectionLogDiaryBonus(currentRank);

  return expectedCollectionLogDiaryBonus * maximumCollectionLogPoints;
};
