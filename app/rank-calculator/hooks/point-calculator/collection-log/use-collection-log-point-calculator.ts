import { CommonPointCalculatorData, FormData } from '@/types/rank-calculator';
import { useWatch } from 'react-hook-form';
import { useCalculatorScaling } from '../use-calculator-scaling';

function calculatePointsForLogSlots(
  collectionLogSlotCount: number,
  scaling: number,
) {
  const pointFactor = 5;
  const hundredsOfLogs = Math.floor(collectionLogSlotCount / 100);
  const remainder = collectionLogSlotCount % 100;
  const triangleNumber = (hundredsOfLogs * (hundredsOfLogs + 1)) / 2;
  const pointsFromHundreds = triangleNumber * (pointFactor * 100);
  const pointsFromRemainder = remainder * (hundredsOfLogs + 1) * pointFactor;
  const sumOfPoints = pointsFromHundreds + pointsFromRemainder;
  const scaledPoints = Math.floor(Number((sumOfPoints * scaling).toFixed(0)));

  return scaledPoints;
}

export interface CollectionLogPointCalculatorData
  extends CommonPointCalculatorData {
  collectionLogSlotPoints: number;
}

export function useCollectionLogPointCalculator() {
  const totalCollectionLogSlots = useWatch<FormData, 'collectionLogTotal'>({
    name: 'collectionLogTotal',
  });
  const scaling = useCalculatorScaling();
  const collectionLogSlotsAchieved = useWatch<FormData, 'collectionLogCount'>({
    name: 'collectionLogCount',
  });
  const collectionLogSlotPoints = calculatePointsForLogSlots(
    collectionLogSlotsAchieved,
    scaling,
  );
  const totalPointsAvailable = calculatePointsForLogSlots(
    totalCollectionLogSlots,
    scaling,
  );
  const pointsRemaining = totalPointsAvailable - collectionLogSlotPoints;
  const pointsAwardedPercentage =
    (collectionLogSlotPoints / totalPointsAvailable) * 100;

  return {
    pointsAwarded: collectionLogSlotPoints,
    pointsAwardedPercentage,
    pointsRemaining,
    collectionLogSlotPoints,
  } satisfies CollectionLogPointCalculatorData;
}
